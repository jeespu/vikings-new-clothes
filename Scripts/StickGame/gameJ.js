$('#stickContainer').hide();
$('#loadImage').show();
$(document).ready(function () {
    $('#loadImage').hide();
    $('#stickContainer').show();
})

function init() {
    document.getElementById('background_game').style.display = 'block';
};

var stick12 = 0;
var stick17 = 0;
var stick39 = 0;

function back2(number) {
    $('#instruction-' + (number+1)).hide();
    $('#instruction-' + number).show();
}

function next2(number) {
    $('#instruction-' + (number-1)).hide();
    $('#instruction-' + number).show();
}

function game() {
    $('#game_instructions').hide();
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 39: // right arrow
            $('#background_game').remove();
            $('<link>').appendTo('head').attr({
                type: 'text/css', 
                rel: 'stylesheet',
                href: 'smithgame.css'
            });
            Howler.unload();
            smithintro();
            }});

var rotation = 0;


$(document).ready(function () {
    $(".draggable").draggable({
        stack:".draggable",
        containment: "parent"
    });
    
    $('.draggable').click(function() {
    rotation += 90;
    $(this).css({'-webkit-transform' : 'rotate('+ rotation +'deg)',
                 '-moz-transform' : 'rotate('+ rotation +'deg)',
                 '-ms-transform' : 'rotate('+ rotation +'deg)',
                 'transform' : 'rotate('+ rotation +'deg)'});
});
    
    
    $(".stickTarget").droppable({
        accept: ".draggable" 
    });
    
    $("#stickTarget12").droppable({
        drop:function(event, ui){
           var stick12 = 1;
        }
   });
    
    $("#stickTarget17").droppable({
        drop:function(event, ui){
           var stick17 = 1; 
        }
   });
    
     $("#stickTarget39").droppable({
        drop:function(event, ui){
           var stick39 = 1;
        }
   });
    
   if (stick12 + stick17 + stick39 == 3) {
           alert("you won");
           }; 
});

function reload() {
    location.reload();
}

function NextGame() {
    Howler.unload();
    $('#background_game').remove();
    smithintro();
}