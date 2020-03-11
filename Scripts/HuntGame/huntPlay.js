/* This is the actual play-state, where all the gaming happens. */
var playState = {

    create: function() {
        var huntBG = huntGame.add.sprite(0, 0, 'background')
        // Collision groups for objects that need to be able to collide.
        birdCollisionGroup = huntGame.physics.p2.createCollisionGroup();
        arrowCollisionGroup = huntGame.physics.p2.createCollisionGroup();
        huntGame.physics.p2.updateBoundsCollisionGroup();

        var killAll = huntGame.input.keyboard.addKey(Phaser.Keyboard.K);
        killAll.onDown.add(killBirds, this);

        // Add sound effects to the game.
        drawBowSFX = huntGame.add.audio('bowDraw')
        fireBowSFX = huntGame.add.audio('bowFire')
        birdHit1SFX = huntGame.add.audio('birdHit1SFX')
        birdHit2SFX = huntGame.add.audio('birdHit2SFX')
        birdHit3SFX = huntGame.add.audio('birdHit3SFX')
        clickSFX = huntGame.add.audio('clickSFX');

        // Add sprites to the game.
        // No arrow or birds here, just the sprites that need to be on the canvas when the game starts.
        var birdFace = huntGame.add.sprite(220, 595, 'birdsLeft');
        birdFace.alpha = 0.8;
        birdFace.scale.x = 0.45;
        birdFace.scale.y = 0.45;
        birdsText = huntGame.add.text(340, 615, birdsNeeded);
        birdsText.font = 'norseRegular';
        birdsText.fill = '#ffffff';
        birdsText.stroke = '#000000';
        birdsText.strokeThickness = 5;
        birdsText.alpha = 0.7;
        var quiverImage = huntGame.add.sprite(400, 570, 'quiver');
        quiverImage.alpha = 0.8;
        quiverImage.scale.x = 0.5;
        quiverImage.scale.y = 0.5;
        quiverText = huntGame.add.text(480, 615, quiver);
        quiverText.font = 'norseRegular';
        quiverText.fill = '#ffffff';
        quiverText.stroke = '#000000';
        quiverText.strokeThickness = 5;
        quiverText.alpha = 0.7;
        archers = huntGame.add.group();
        var archer = archers.create(550, 450, 'archer', 'Archer_M.png');
        archer.scale.x = 0.5;
        archer.scale.y = 0.5;

        var birdsRemainingTooltip = new Phasetips(huntGame, {
            targetObject: birdFace,
            context: "Birds remaining"
        })

        var arrowsRemainingTooltip = new Phasetips(huntGame, {
            targetObject: quiverImage,
            context: "Arrows remaining"
        })

        // Add groups for objects that need multiple instances of the same sprite.
        aimArrows = huntGame.add.group();
        aimArrow = aimArrows.create(2000, 1000, 'aimArrow'); // Create a dummy arrow to sort out a (long-term) problem...
        arrows = huntGame.add.group();
        birdsLeft = huntGame.add.group();
        birdsRight = huntGame.add.group();
        readyIndicators = huntGame.add.group();

        readyIndicator = readyIndicators.create(-100, -100, 'redIndicator');
        readyIndicator.kill();

        // Bird spawning and defining.
        if (waveNumber === 1) {
            var j = 0;
            for (var i = 0; i < 5; i++) // Change to increase / decrease amount of birds.
            {
                j++; // To make every 2nd bird spawn from a different side.
                if (j % 2 == 0) {
                    createBirdFromLeft();
                } else {
                    createBirdFromRight();
                }
            }
        }

        if (waveNumber === 2) {
            var j = 0;
            for (var i = 0; i < 10; i++) // Change to increase / decrease amount of birds.
            {
                j++; // To make every 2nd bird spawn from a different side.
                if (j % 2 == 0) {
                    createBirdFromLeft();
                } else {
                    createBirdFromRight();
                }
            }
            birdsText.setText("10");
        }

        // Function calls for mouse up / down.
        huntGame.input.onDown.add(draw);
        huntGame.input.onUp.add(release);

        // Birds flying from left to right.
        function createBirdFromLeft() {
            var birdL = birdsLeft.create(huntGame.rnd.between(-1000, -150), huntGame.rnd.between(80, 300), 'crow');
            huntGame.physics.p2.enable(birdL, false);
            birdL.body.kinematic = true;
            birdL.body.clearShapes();
            birdL.body.loadPolygon('Crow_physics', 'Crow_animation');
            birdL.body.setCollisionGroup(birdCollisionGroup);
            birdL.body.collides(arrowCollisionGroup);
            birdL.animations.add('flapL', [0, 1], 5, true);
            birdL.animations.play('flapL');
            birdL.body.velocity.x = huntGame.rnd.between(120, 250);
        }

        // Birds flying from right to left.
        function createBirdFromRight() {
            var birdR = birdsRight.create(huntGame.rnd.between(2280, 1430), huntGame.rnd.between(80, 300), 'crowR');
            huntGame.physics.p2.enable(birdR, false);
            birdR.body.kinematic = true;
            // birdR.body.clearShapes();
            // birdR.body.loadPolygon('Crow_physics','Crow_animation');
            birdR.body.setCollisionGroup(birdCollisionGroup);
            birdR.body.collides(arrowCollisionGroup);
            birdR.animations.add('flapR', [0, 1], 5, true);
            birdR.animations.play('flapR');
            birdR.body.velocity.x = huntGame.rnd.between(-120, -250);
        }

        // Begin aiming with mouse down.
        function draw() {
            if (!muteButton.input.pointerOver() && !exitButton.input.pointerOver() && !infoButton.input.pointerOver() && briefingAgain === false && birdsNeeded > 0) {
                allowShoot = false;
                mouseYInitial = huntGame.input.activePointer.y;
                readyIndicator = readyIndicators.create(640, 640, 'redIndicator')
                readyIndicator.anchor.x = 0.5;
                readyIndicator.anchor.y = 3.5;
                readyIndicator.alpha = 0.6;
                drawBowSFX.play();
                drawBowSFX.onStop.addOnce(function() {
                    allowShoot = true;
                    readyIndicator.loadTexture('greenIndicator');
                    settingPower = true;
                    console.log(settingPower);
                });
                aimArrow = aimArrows.create(640, 120, 'aimArrow')
                aimArrow.scale.x = 0.7;
                aimArrow.scale.y = 0.7;
                aimArrow.anchor.x = 1.5;
                aimArrow.anchor.y = 0.5;
                aimArrow.alpha = 0.7;
            }
        }

        // For launching the arrow.
        function release() {
            readyIndicator.kill();
            aimArrow.kill();
            console.log(settingPower);
            // Check if pointer is within the game and you still have arrows left.
            if (huntGame.input.activePointer.withinGame && quiver > 0 && settingPower === true && allowShoot === true) {
                allowShoot = false;
                settingPower = false;
                console.log(settingPower);
                quiver--;
                quiverText.setText(quiver);
                fireBowSFX.play();

                // Create an arrow and set its properties.
                var arrow = arrows.create(640, 550, 'arrow');
                huntGame.physics.p2.enable(arrow, false);
                arrow.body.clearShapes();
                arrow.body.loadPolygon('Arrow_physics', 'Arrow');
                arrow.body.setCollisionGroup(arrowCollisionGroup);
                arrow.body.collideWorldBounds = false;
                arrow.body.data.gravityScale = 0.9;
                arrow.body.collides(birdCollisionGroup, hitBird, this);
                arrow.body.rotation = ((huntGame.input.activePointer.worldX - 180) / 320) - 80;
                arrow.body.thrust((-firePower * 145));
            }
        }

        function hitBird(body1, body2) {
            // Body1 = the arrow, body2 = the bird.
            // We clear collision from the arrow so it won't hit another bird on its way down.
            // Then we swap the arrow's sprite to a bird with an arrow sticking from its stomach (SO BR00TAL).
            // Lastly we destroy the bird's sprite along with its physics body.
            // As the "arrow" still maintains its physics, its rotation will stay the same.
            body1.clearCollision(true);
            body2.sprite.kill();
            body2.removeFromWorld();
            body1.sprite.loadTexture('birdHit');
            birdsNeeded = birdsLeft.countLiving() + birdsRight.countLiving();
            birdsText.setText(birdsNeeded);
            switch (huntGame.rnd.between(1, 3)) {
                case 1:
                    birdHit2SFX.stop();
                    birdHit3SFX.stop();
                    birdHit1SFX.play();
                    break;
                case 2:
                    birdHit1SFX.stop();
                    birdHit3SFX.stop();
                    birdHit2SFX.play();
                    break;
                case 3:
                    birdHit1SFX.stop();
                    birdHit2SFX.stop();
                    birdHit3SFX.play();
                    break;
            }
            // When the player hits a bird, the bird "emits" feathers.
            feathers = huntGame.add.emitter(body1.x, body1.y, 100);
            feathers.makeParticles('feather');
            feathers.minParticleSpeed.setTo(-30, 30);
            feathers.maxParticleSpeed.setTo(40, 110);
            feathers.minParticleScale = 0.3;
            feathers.maxParticleScale = 0.5;
            feathers.gravity = 2;
            feathers.flow(5000, 1, 1, 5)
        }



        function killBirds() {
            var splatter = huntGame.add.audio('splatter');
            splatter.play();
            birdCollisionGroup.collideWorldBounds = false;
            birdsLeft.forEach(kill, this);

            function kill(birdL) {
                birdL.kill();
                birdL.body.removeFromWorld();
                feathers = huntGame.add.emitter(birdL.body.x, birdL.body.y, 100);
                feathers.makeParticles('feather');
                feathers.minParticleSpeed.setTo(-30, 30);
                feathers.maxParticleSpeed.setTo(40, 110);
                feathers.minParticleScale = 0.3;
                feathers.maxParticleScale = 0.5;
                feathers.gravity = 2;
                feathers.flow(5000, 1, 1, 5)
            }
        }

        // Create mute button
        if (!muted) {
            muteButton = huntGame.add.button(1050, 45, 'mute', toggleMute, this, 0, 0, 0);
        } else {
            muteButton = huntGame.add.button(1050, 45, 'mute', toggleMute, this, 1, 1, 1);
        }
        muteButton.scale.y = 0.22;
        muteButton.scale.x = 0.22;
        muteButton.alpha = 0.7;

        function toggleMute() {
            if (!huntGame.sound.mute) {
                muted = true;
                preyOfBirds.mute(true);
                huntGame.sound.mute = true;
                muteButton.setFrames(1, 1, 1);
            } else {
                muted = false;
                preyOfBirds.mute(false);
                huntGame.sound.mute = false;
                muteButton.setFrames(0, 0, 0);
            }
        }
        // Tooltip for mute button
        var muteTooltip = new Phasetips(huntGame, {
            targetObject: muteButton,
            context: "Toggle sound on / off",
            animationDelay: 300
        })

        // Exit button aka page reload
        var exitButton = huntGame.add.button(1170, 50, 'cross', exitUp, this, 0, 1);
        exitButton.scale.y = 0.35;
        exitButton.scale.x = 0.35;

        function exitUp(button, pointer, isOver) {
            location.reload();
            if (isOver) {
                background.visible = !background.visible;
            }
        }
        var exitTooltip = new Phasetips(huntGame, {
            targetObject: exitButton,
            context: "Quit game",
            animationDelay: 300
        })

        var infoButton = huntGame.add.button(950, 43, 'info', briefAgain, this, 1, 0);
        infoButton.alpha = 0.7;
        infoButton.scale.y = 0.75;
        infoButton.scale.x = 0.75;

        function briefAgain() {
            if (!briefingAgain) {
                clickSFX.play();
                briefingAgain = true;
                blackBox = huntGame.add.sprite(huntGame.world.centerX, huntGame.world.centerY, 'blackBox')
                blackBox.anchor.x = 0.5;
                blackBox.anchor.y = 0.5;
                guideHeader = huntGame.add.text(blackBox.x, blackBox.y - 85, "Controls", {
                    font: '48px norseRegular',
                    fill: '#ffffff',
                    align: 'center'
                })
                guideHeader.anchor.x = 0.5;
                guideHeader.anchor.y = 0.5;
                guideText = huntGame.add.text(blackBox.x, blackBox.y - 5,
                    "Click and drag down to adjust power.\nMove the cursor sideways to aim.\nWhen the indicator is green, release to shoot.", {
                        font: '24px norseRegular',
                        fill: '#ffffff',
                        align: 'center'
                    })
                guideText.anchor.x = 0.5;
                guideText.anchor.y = 0.5;
                gotIt = huntGame.add.button(blackBox.x, guideText.y + 60, 'gotIt', closeBrief, this, 1, 0);
                gotIt.anchor.x = 0.5;
                gotIt.scale.x = 0.80;
                gotIt.scale.y = 0.80;
                blackBox.scale.y = 1.05;
            }
        }

        function closeBrief() {
            clickSFX.play();
            guideHeader.destroy();
            guideText.destroy();
            blackBox.destroy();
            gotIt.pendingDestroy = true;
            briefingAgain = false;
        }

        var infoTooltip = new Phasetips(huntGame, {
            targetObject: infoButton,
            context: "Help",
            animationDelay: 300
        })

    },

    update: function() {

        if (!huntGame.input.activePointer.isDown) {
            settingPower = false;
            allowShoot = false;
            drawBowSFX.stop();
        }

        // Character turning
        archers.forEach(turn, this);

        function turn(archer) {
            if (huntGame.input.activePointer.x < (1280 / 3) + 100) {
                arrowCreateX = 540;
                archer.frameName = 'Archer_L.png'
                archer.y = 435;
                archer.x = 565;
            } else if (huntGame.input.activePointer.x < (1280 / 3) - 100 + (1280 / 3)) {
                archer.frameName = 'Archer_M.png'
                archer.y = 420;
                archer.x = 565;
                arrowCreateX = 640;
            } else {
                archer.frameName = 'Archer_R.png'
                archer.y = 430;
                archer.x = 545;
                arrowCreateX = 740;
            }
        }

        // Crosshair placement
        if (huntGame.input.activePointer.isDown) {
            firePower = ((huntGame.input.activePointer.y - mouseYInitial) / 5) + 500;
            aimArrow.y = 550;
            aimArrow.rotation = ((huntGame.input.activePointer.worldX - 135) / 320);
            readyIndicator.x = (huntGame.input.activePointer.worldX / 10) + 575
            readyIndicator.y = 600 + (firePower / 8);
        }

        // X-axis check for both kinds of birds.
        // Randomize the bird's speed and y axis every time it has reached the other side
        // and return it to its starting side.
        birdsLeft.forEach(checkPosL, this);

        function checkPosL(birdL) {
            if (birdL.body.x > 1430) {
                birdL.body.x = huntGame.rnd.between(-350, -150);
                birdL.body.velocity.x = huntGame.rnd.between(150, 250);
            }
        }
        birdsRight.forEach(checkPosR, this);

        function checkPosR(birdR) {
            if (birdR.body.x < -150) {
                birdR.body.x = huntGame.rnd.between(1430, 1630);
                birdR.body.velocity.x = huntGame.rnd.between(-120, -250);
            }
        }

        // Update arrow angle to its flying direction.
        arrows.forEach(rotate, this);

        function rotate(arrow) {
            // Copied the .atan2 part from some forum.
            // Should honestly be a built-in method. It is for Arcade physics but not for P2.
            arrow.body.rotation = -Math.atan2(arrow.body.velocity.x, arrow.body.velocity.y) - 80;
        }

        // Arrow kill condition.
        // Also applies to the "arrow" when you've hit a bird, just like rotation.
        arrows.forEach(checkIfOut, this);

        function checkIfOut(arrow) {
            if (arrow.body.y > 720 || arrow.body.x < 0 || arrow.body.x > 1280) {
                console.log("Arrow dead");
                arrow.body.removeFromWorld();
                arrow.kill();
            }
        }
        
        // Win/lose conditions and transitions
        if (birdsNeeded === 0 && waveNumber === 1 && arrows.countLiving() == 0) {
            console.log("Wave 2!");
            quiver = quiver + 15;
            quiverText.setText(quiver);
            birdsText.setText("10");
            huntGame.state.start('dialog');
        }

        if (birdsNeeded === 0 && waveNumber === 2 && arrows.countLiving() == 0) {
            waveNumber = 3;
            huntGame.state.start('dialog');
        }

        if (quiver == 0 && birdsNeeded > 0 && arrows.countLiving() == 0) {

            huntGame.state.start('gameOver');
        }
    }
}
