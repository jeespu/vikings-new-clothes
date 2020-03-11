/* This state contains the part where the hunter is talking to Folke.
Cursor is set to pointer to indicate that you can click anywhere to advance.
The game comes back to this state twice, and the hunter will say different things. */
var dialogState = {
    create: function() {
        var style1 = {
            font: "30px norseRegular",
            fill: "#fff"
        }
        huntGame.add.text(0, 0, " ", style1);
        var bg = huntGame.add.sprite(0, 0, 'background');
        var hunter = huntGame.add.sprite(1400, 720, 'hunter');
        huntGame.add.tween(hunter).to({
            x: 1050
        }, 200, Phaser.Easing.Linear.None, true);
        var dialogBox = huntGame.add.sprite(huntGame.world.centerX, 540, 'blackBox');
        dialogBox.anchor.x = 0.5;
        dialogBox.anchor.y = 0;
        dialogBox.scale.x = 1.2;
        dialogBox.scale.y = 0.6;
        hunter.scale.x = 0.6;
        hunter.scale.y = 0.6;
        hunter.anchor.y = 1;
        hunter.anchor.x = 0.5;
        var hero = huntGame.add.sprite(250, 720, 'hero');
        hero.anchor.y = 0.5;
        hero.anchor.x = 0.5;
        hero.scale.x = 0.9;
        hero.scale.y = 0.9;
        hero.alpha = 0;
        var dialog = huntGame.add.text(dialogBox.x - 240, dialogBox.y + 20, "Halfbjorn: How did I lose my eye, you ask? I got \ninto a fight with my wi---a bear, and obviously \ncame out the winner!\n", style1);

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

        // Tooltip if the user gets stuck in the monologue
        var clickToContinue = new Phasetips(huntGame, {
            targetObject: bg,
            context: "Click anywhere to continue",
            animationDelay: 4000,
            x: huntGame.world.centerX - 70,
            y: 500,
            initialOn: false
        })

        if (currentLine === 5) {
            dialog.setText("Hold on, there's more coming!\nTake these 15 spare arrows I brought with me.");
        }

        if (currentLine === 6) {
            dialog.setText("Nice Work! You can have this bear pelt I hunted \nwhen I was a few years younger. An axe? I heard \na woodcutter forgot his in this certain place...")
        }

        huntGame.input.onDown.add(next);

        function next() {
            if (!muteButton.input.pointerOver() && !exitButton.input.pointerOver()) {
                if (currentLine === 1) {
                    currentLine = 2;
                    dialog.setText("I'm kind of having problems hitting those birds \nnow, and they're mocking me for it.");
                } else if (currentLine === 2) {
                    currentLine = 3;
                    dialog.setText("However my family is starving, and I can't \nreturn home unless I have something to bring.")
                } else if (currentLine === 3) {
                    currentLine = 4;
                    dialog.setText("Maybe you could help me?")
                } else if (currentLine === 4) {
                    huntGame.state.start('brief');
                } else if (currentLine === 5) {
                    currentLine = 6;
                    waveNumber = 2;
                    birdsNeeded = 1;
                    huntGame.state.start('play');
                } else if (currentLine === 6) {
                    // When the game is won, we load the next game and wipe this one.
                    currentLine = 7;
                    huntGame.destroy();
                    preyOfBirds.unload();
                    $('body').load("BearGame.html");
                }
            }
        }
    }
}
