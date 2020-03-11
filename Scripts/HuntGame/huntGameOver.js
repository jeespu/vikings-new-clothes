var gameOverState = {
  create: function(){
    var bg = huntGame.add.sprite(0, 0, 'background');
    var blackBox = huntGame.add.sprite(huntGame.world.centerX, huntGame.world.centerY, 'blackBox');
    blackBox.anchor.x = 0.5;
    blackBox.anchor.y = 0.5;
    blackBox.scale.y = 1.2;
    var style1 = {
        font: "48px norseRegular",
        fill: "#fff",
        align: "center"
    }
    var tryAgainText = huntGame.add.text(blackBox.x, blackBox.y - 50, "You ran out of arrows!\nTry again?", style1);
    tryAgainText.anchor.x = 0.5;
    tryAgainText.anchor.y = 0.5;
    var yeahButton = huntGame.add.button(blackBox.x - 100, tryAgainText.y + 118, 'yeah', yeah, this, 0, 1);
    yeahButton.anchor.x = 0.5;
    yeahButton.anchor.y = 0.5;
    var nahButton = huntGame.add.button(blackBox.x + 100, tryAgainText.y + 118, 'nah', nah, this, 0, 1);
    nahButton.anchor.x = 0.5;
    nahButton.anchor.y = 0.5;
    function yeah() {
      // Basically reset all the variables and start the game again
      quiver = 10;
      waveNumber = 1;
      birdsNeeded = 5;
      currentScreen = 1;
      currentLine = 1;
      huntGame.state.start('dialog');
    }
    function nah() {
      location.reload();
    }
    var nahTip = new Phasetips(huntGame, {
      targetObject: nahButton,
      context: "This will return you to the main menu."
    });

    // Create mute button
    if (!muted) {
      muteButton = huntGame.add.button(1050, 45, 'mute', toggleMute, this, 0, 0, 0);
    }
    else {
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
      }
      else {
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
      if (isOver) { background.visible =! background.visible; }
    }
    var exitTooltip = new Phasetips(huntGame, {
      targetObject: exitButton,
      context: "Quit game",
      animationDelay: 300
    })
  }
}
