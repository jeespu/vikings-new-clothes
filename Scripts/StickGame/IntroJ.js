mainTheme.unload();
var video = document.getElementById('viD');
var skip = document.getElementById('stick_skip_button');
var wrap = document.getElementById('stickwrap');

skip.addEventListener('click', function () {
    video.onended();
}, false);
video.onended = function() {
    wrap.remove();
    var fire = new Howl({
        src: ['Sounds/StickGame/Fireplace.ogg'],
        preload: true,
        autoplay: true,
        loop: true,
    });
    fire.play();
    document.getElementById('background_intro').style.display = 'block';
    document.getElementById('charecter1').style.display = 'inline-block';
    document.getElementById('charecter2').style.display = 'inline-block';
    
};

function back(number) {
    $('#dialog-' + (number+1)).hide();
    $('#dialog-' + number).show();
}

function next(number) {
    $('#dialog-' + (number-1)).hide();
    $('#dialog-' + number).show();
}

function start() {
    $('#background_intro').hide();
    $('#intro').hide();
    init();
}



