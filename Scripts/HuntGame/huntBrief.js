/* This state displays the instructions-box.
Might add an "i"-button to come back to this state if it doesn't screw up the game. */
var briefState = {

    create: function() {

        currentLine = 5;

        var clickSFX = huntGame.add.audio('clickSFX');
        var huntBG = huntGame.add.sprite(0, 0, 'background')
        var blackBox = huntGame.add.sprite(huntGame.world.centerX, huntGame.world.centerY, 'blackBox')
        blackBox.anchor.x = 0.5;
        blackBox.anchor.y = 0.5;

        var leftV = huntGame.add.button(blackBox.x - 140, blackBox.y + 90, 'V_Left', clickLeft, this);
        var rightV = huntGame.add.button(blackBox.x + 140, blackBox.y + 90, 'V_Right', clickRight, this);
        leftV.onInputOver.add(overL, this);
        leftV.onInputOut.add(outL, this);
        leftV.anchor.x = 0.5;
        leftV.anchor.y = 0.5;
        leftV.alpha = 0;
        rightV.anchor.x = 0.5;
        rightV.anchor.y = 0.5;
        rightV.onInputOver.add(overR, this);
        rightV.onInputOut.add(outR, this);

        var guideHeader = huntGame.add.text(blackBox.x, blackBox.y - 70, "Prey of Birds", {
            font: '48px norseRegular',
            fill: '#ffffff',
            align: 'center'
        })
        guideHeader.anchor.x = 0.5;
        guideHeader.anchor.y = 0.5;
        var guideText = huntGame.add.text(blackBox.x, blackBox.y + 15,
            "Hunter Halfbjorn is getting mocked by those \npesky birds. Your task is to help him get revenge \nand hunt food for his family.", {
                font: '24px norseRegular',
                fill: '#ffffff',
                align: 'center'
            })
        guideText.anchor.x = 0.5;
        guideText.anchor.y = 0.5;

        function clickLeft() {
            if (currentScreen === 2) { // Controls -screen
                clickSFX.play();
                guideHeader.y = blackBox.y - 70;
                guideHeader.setText("Prey of Birds");
                guideText.setText("Hunter Halfbjorn is getting mocked by those \npesky birds. Your task is to help him get revenge \nand restore his reputation as the master hunter.");
                leftV.alpha = 0;
                currentScreen -= 1;
                console.log(currentScreen);
            } else if (currentScreen === 3) { // Good luck -screen
                clickSFX.play();
                guideHeader.y = blackBox.y - 70;
                guideHeader.setText("Controls");
                guideText.setText("Click and drag down to adjust power.\nMove the cursor sideways to aim.\nWhen the indicator is green, release to shoot.");
                leftV.alpha = 1;
                currentScreen -= 1;
                console.log(currentScreen);
            } else if (currentScreen === 1) {
                currentScreen = 1;
            }
        }

        function clickRight() {
            if (currentScreen === 1) {
                clickSFX.play();
                guideHeader.y = blackBox.y - 70;
                guideHeader.setText("Controls");
                guideText.setText("Click and drag down to adjust power.\nMove the cursor sideways to aim.\nWhen the indicator is green, release to shoot.");
                currentScreen += 1;
                console.log(currentScreen);
                leftV.alpha = 1;
            } else if (currentScreen === 2) {
                clickSFX.play();
                guideHeader.y = blackBox.y - 20;
                guideHeader.setText("Good luck!\nSkadi's blessings\nbe upon you.");
                guideText.setText("");
                currentScreen += 1;
                console.log(currentScreen);
            } else if (currentScreen === 3) {
                clickSFX.play();
                huntGame.state.start('play');
            }
        }

        function overL() {
            huntGame.add.tween(leftV.scale).to({
                x: 1.2,
                y: 1.2
            }, 100, Phaser.Easing.Linear.None, true);
        }

        function outL() {
            huntGame.add.tween(leftV.scale).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Linear.None, true);
        }

        function overR() {
            huntGame.add.tween(rightV.scale).to({
                x: 1.2,
                y: 1.2
            }, 100, Phaser.Easing.Linear.None, true);
        }

        function outR() {
            huntGame.add.tween(rightV.scale).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Linear.None, true);
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
    }
}
