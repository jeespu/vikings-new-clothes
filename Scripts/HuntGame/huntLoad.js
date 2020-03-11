// Create a "howl" for howler.js. This enables seamless music looping among other things.
var preyOfBirds = new Howl({
    src: ['Music/PreyOfBirds.mp3'],
    loop: true,
    volume: 0.5,
    sprite: {
        main: [0, 100000]
    }
});

var loadState = {
    // Load all the assets used in the game.
    preload: function() {
        huntGame.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        huntGame.load.atlasJSONHash('crow', 'Graphics/HuntGame/Crow_animation.png', 'Graphics/HuntGame/Crow_animation.json');
        huntGame.load.physics('Crow_physics', 'Graphics/HuntGame/Crow_physics.json')
        huntGame.load.atlasJSONHash('crowR', 'Graphics/HuntGame/Crow_animation_right.png', 'Graphics/HuntGame/Crow_animation_right.json');
        huntGame.load.physics('Arrow_physics', 'Graphics/HuntGame/Arrow_physics.json');
        huntGame.load.image('background', 'Graphics/HuntGame/HuntBG.png');
        huntGame.load.image('arrow', 'Graphics/HuntGame/Arrow.png');
        huntGame.load.image('archerPlaceholder', 'Graphics/HuntGame/ArcherPlaceholder.png');
        huntGame.load.image('crosshair', 'Graphics/HuntGame/Crosshair.png')
        huntGame.load.audio('bowDraw', 'Sounds/HuntGame/BowDraw.ogg')
        huntGame.load.audio('bowFire', 'Sounds/HuntGame/BowFire.ogg')
        huntGame.load.image('birdHit', 'Graphics/HuntGame/BirdHit.png')
        huntGame.load.image('feather', 'Graphics/HuntGame/Feather.png')
        huntGame.load.image('quiver', 'Graphics/HuntGame/Quiver.png')
        huntGame.load.image('birdsLeft', 'Graphics/HuntGame/BirdsLeft.png')
        huntGame.load.atlasJSONHash('archer', 'Graphics/HuntGame/Archer_directions.png', 'Graphics/HuntGame/Archer_directions.json');
        huntGame.load.audio('birdHit1SFX', 'Sounds/HuntGame/BirdHit1.ogg')
        huntGame.load.audio('birdHit2SFX', 'Sounds/HuntGame/BirdHit2.ogg');
        huntGame.load.audio('birdHit3SFX', 'Sounds/HuntGame/BirdHit3.ogg');
        huntGame.load.image('greenIndicator', 'Graphics/HuntGame/BowReadyGreen.png')
        huntGame.load.image('redIndicator', 'Graphics/HuntGame/BowReadyRed.png')
        huntGame.load.image('aimArrow', 'Graphics/HuntGame/AimArrow.png');
        huntGame.load.image('blackBox', 'Graphics/HuntGame/BlackBox.png');
        huntGame.load.image('V_Left', 'Graphics/HuntGame/V_Left.png');
        huntGame.load.image('V_Right', 'Graphics/HuntGame/V_Right.png');
        huntGame.load.video('huntIntro', 'Animations/HuntAnimation.mp4');
        huntGame.load.image('skipButton', 'Graphics/HuntGame/SkipButton.png');
        huntGame.load.audio('clickSFX', 'Sounds/HuntGame/Click.ogg');
        huntGame.load.audio('splatter', 'Sounds/HuntGame/Splatter.ogg');
        huntGame.load.image('hunter', 'Graphics/HuntGame/Hunter.png');
        huntGame.load.image('hero', 'Graphics/HuntGame/DialogHero.png');
        huntGame.load.spritesheet('cross', 'Graphics/HuntGame/X.png', 180, 181);
        huntGame.load.spritesheet('mute', 'Graphics/HuntGame/Mute.png', 428, 324);
        huntGame.load.spritesheet('info', 'Graphics/HuntGame/i.png', 100, 100);
        huntGame.load.spritesheet('gotIt', 'Graphics/HuntGame/GotItButton.png', 126, 70);
        huntGame.load.spritesheet('yeah', 'Graphics/HuntGame/Yeah.png', 133, 74);
        huntGame.load.spritesheet('nah', 'Graphics/HuntGame/Nah.png', 132, 75);
    },

    create: function() {
        huntGame.state.start('intro');
    }
}
