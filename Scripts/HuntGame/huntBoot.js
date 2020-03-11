var bootState = {
    create: function () {
        // Start the physics engine and setup some stuff related to Phaser's collision and gravity.
        huntGame.physics.startSystem(Phaser.Physics.P2JS);
        huntGame.physics.p2.setImpactEvents(true);
        huntGame.physics.p2.gravity.y = 1500;
        huntGame.state.start('load');
    }
}