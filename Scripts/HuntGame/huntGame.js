// Create a "howl" for howler.js. This enables seamless music looping among other things.
var preyOfBirds = new Howl({
    src: ['Music/PreyOfBirds.mp3'],
    loop: true,
    volume: 0.5,
    sprite: {
        main: [0, 100000]
    }
});

// Declaring some variables.
    var arrow;
    var firePower = 1200;
    var mouseYInitial;
    var drawBowSFX;
    var fireBowSFX;
    var birdHit1SFX;
    var birdHit2SFX;
    var birdHit3SFX;
    var arrows;
    var quiver = 10;
    var birdsNeeded = 5;
    var quiverText;
    var birdsText;
    var crosshair;
    var settingPower = false;
    var arrowCreateX;
    var waveNumber = 1;
    var birdSound;
    var readyIndicator;
    var aimArrow;
    var quiverImage;
    var allowShoot = false;
    var currentScreen = 1;
    var huntIntro;
    var video;
    var skipButton;
    var currentLine = 1;
    var muteButton;
    var muted;
    var briefingAgain = false;
    var gotIt;

    // Initialize the playing field and the gamestates.
    var huntGame = new Phaser.Game(1280, 720, Phaser.AUTO, 'huntGame');
    huntGame.state.add('boot', bootState);
    huntGame.state.add('load', loadState);
    huntGame.state.add('intro', introState);
    huntGame.state.add('dialog', dialogState);
    huntGame.state.add('brief', briefState);
    huntGame.state.add('play', playState);
    huntGame.state.add('gameOver', gameOverState);
    huntGame.state.start('boot');
