if (mainTheme == null) {
    var mainTheme = new Howl({
src: ['Music/MainTheme.mp3'],
preload: true,
autoplay: true,
loop: true,
volume:0.5,
sprite: {
    main: [0, 57600, true]
}
});
}
if (mainTheme.playing('main') === false) {
    mainTheme.play('main');
}

function startGame() {
    // Load the css file
    $('<link>').appendTo('head').attr({
        type: 'text/css', 
        rel: 'stylesheet',
        href: 'StickGame.css'
    });
    // Delete the menu screen and end the music
    container.remove();
    mainTheme.unload();
    // Call the function to start the first game
    $('body').load('StickGame.html');
}

function credits() {
    $('body').load('credits.html');
}