// Create a "howl" for howler.js. This enables seamless music looping among other things.
var preyOfBirds = new Howl({
    src: ['Music/PreyOfBirds.mp3'],
    loop: true,
    volume: 0.5,
    sprite: {
        main: [0, 100000]
    }
});

var introState = {
    create: function() {
        // Setting up the intro-animation screen along with the skip button.
        video = huntGame.add.video('huntIntro');
        huntIntro = video.addToWorld(huntGame.world.centerX, huntGame.world.centerY, 0.5, 0.5);
        skipButton = huntGame.add.button(1200, 650, 'skipButton', skipVideo, this);
        skipButton.onInputOver.add(over, this);
        skipButton.onInputOut.add(out, this);
        skipButton.alpha = 0.05;
        skipButton.anchor.x = 0.5;
        skipButton.anchor.y = 0.5;
        video.play();
        video.onComplete.addOnce(function() {
            preyOfBirds.play('main');
            huntGame.state.start('dialog');
        })

        function over() {
            huntGame.add.tween(skipButton).to({
                alpha: 0.5
            }, 100, Phaser.Easing.Linear.None, true);
        }

        function out() {
            huntGame.add.tween(skipButton).to({
                alpha: 0.05
            }, 100, Phaser.Easing.Linear.None, true);
        }

        function skipVideo() {
            preyOfBirds.play('main');
            video.destroy();
            huntGame.state.start('dialog');
        }
    }
}
