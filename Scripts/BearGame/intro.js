var chaseTheme = new Howl({
                src: ['Music/BearChase.mp3'],
                preload: true,
                autoplay: true,
                loop: true,
                volume:0.5,
                sprite: {
                    main: [0, 131265]
                }
            });
// intro.js - javascript file related to the loading of animation and menu before starting the game
// script execution after page load
    var wrap = document.getElementById('wrap');
    var video = document.getElementById('animation');
    // ability to cancel viewing video and go to function "video.onended"
    $('#skip_button').click(function(){
        video.onended();
    });
    // go to the game menu
    
video.onended = function(e) {
    console.log("Video ended!");
    chaseTheme.play('main');
    wrap.remove();
    document.getElementById('background_intro').style.display = 'block';
}
    
// scrolling menu to the left
function back(number) {
    $('#instruction-' + (number+1)).hide();
    $('#instruction-' + number).show();
}
// scrolling menu to the right
function next(number) {
    $('#instruction-' + (number-1)).hide();
    $('#instruction-' + number).show();
}
// starting function "init" in "game.js" - start of the game
function start() {
    $('#background_intro').hide();
    $('#intro').hide();
    init();
}