/*
Document type: Javascript file
Document name: smithgame.js

<ATTENTION>
function to start the game: smithintro();
</ATTENTION>

info:
    Js-code of a smithing minigame in which player times buttonclick with the meter on screen.
    Code includes intro screen, game functions and element creation.
    Game is not scalable and requires at least 1280*720 px space 
story:
    Our hero folke stumbles inside the villages smithy in search for supplies.
    The blacksmith promises an object for some smithwork, so you must do as you are told.
    In the end blacksmith gives you the article and gives you direction foward, towards the forest.
requirements:
    css file with following text: 
        @font-face {
            font-family: 'Norse regular';
            src: url(Norse.otf);
        }
    html file with following script: jquery/jquery-3.3.1.min.js
        note: body can be empty
Author info:
    name: Leevi Kukkonen
    email: k8397@student.jamk.fi

*/

//  defining int variables
var i = 0,
    clickcount = 0,
    count = 0,
    HITcount = 0,
    score = 0,
    speed = 2,
    firsthit = 2,
    firstmiss = 2,
    mute = false;
//  defining interval-variable
var meterinterval,
    theme,
    direction = "+";
//  defining Id-variables for all objects and their children
var containerId = "smithcontainer",
    folkeId = "smithfolke",
    meterId = "smithmeter",
    metermarkerId = "smithmetermarker",
    buttonId = "smithbuttonId",
    popupId = "smithpopup",
    popupbuttonId = "smithpopupbutton",
    popupheadId = "smithpopuphead",
    popupcontId = "smithpopupcont",
    smithId = "smithguy",
    scoreId = "smithgamescore",
    scoretextId = "smithgamescoretext",
    shieldId = "smithshield",
    muteId = "smithmutebutton",
    menubuttonId = "smithmainmenubutton",
    exitcontainerId = "smithexitcontainer",
    exitheadId = "smithexitheader",
    exitapproveId = "smithexitapprove",
    exitdeclineId = "smithexitdecline";

//  Adding game container (div)
function addcontainer() {
    "use strict";
    var smithcontainer = document.createElement("div");
    smithcontainer.setAttribute("id", containerId);
    //  defining style for the container
    $(smithcontainer).css({
        backgroundColor: "lightgray",
        backgroundImage: "url(Graphics/SmithGame/smithy.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        height: "720px",
        width: "1280px",
        margin: "5% auto",
        display: "block",
        position: "relative",
        overflow: "hidden"
    });
    //  insert into container
    document.body.insertBefore(smithcontainer, document.body.childNodes[0]);
}
//  Adding a button to add Exit-window. Does not function if Exit-window is open.
function addMenu() {
    "use strict";
    var menubutton = document.createElement("input");
    menubutton.setAttribute("id", menubuttonId);
    menubutton.setAttribute("type", "image");
    menubutton.setAttribute("src", "Graphics/HuntGame/CrossNoHighlight.png");
    menubutton.setAttribute("alt", "exit()");
    menubutton.setAttribute("onclick", "addExit()");
    $(menubutton).click(function() {
        menubutton.setAttribute("onclick", null);
    });
    $(menubutton).css({
        fontFamily: "Norse Regular",
        fontSize: "3em",
        border: "none",
        width: "50px",
        position: "absolute",
        top: "5px",
        left: "1200px",
        padding: "10px",
        color: "white"
    });
    $(menubutton).mouseenter(function(){
       menubutton.setAttribute("src","Graphics/HuntGame/CrossHightlight.png");
    });
    $(menubutton).mouseleave(function () {
       menubutton.setAttribute("src", "Graphics/HuntGame/CrossNoHighlight.png");
    });
    document.getElementById(containerId).appendChild(menubutton);
}
//  Function to handle game exit screen
function addExit() {
    var excont = document.createElement("div"),
        exhead = document.createElement("h2"),
        exapprove = document.createElement("button"),
        exdecline = document.createElement("button");
    excont.setAttribute("id", exitcontainerId);
    $(excont).css({
        padding: "40px",
        width: "500px",
        position: "absolute",
        left: "300px",
        top: "200px",
        backgroundColor: "rgb(0,0,0)",
        border: "1px solid rgb(10,10,10)",
        opacity: "0.85"
    });
     exhead.setAttribute("id", exitheadId);
    $(exhead).text("Do you want to exit?");
    $(exhead).css({
        fontSize: "4em",
        position: "relative",
        fontFamily: "Norse Regular",
        color: "white",
    });
    $(exapprove).css({
        fontSize: "3em",
        position: "relative",
        fontFamily: "Norse Regular",
        color: "white",
        backgroundColor: "black",
        padding: "20px",
        marginLeft: "120px",
    });
    exapprove.setAttribute("onclick", "window.location.reload(false);");
    $(exdecline).click(function(){
        $(excont).remove();
        document.getElementById(menubuttonId).setAttribute("onclick", "addExit()");
    });
    $(exdecline).css({
        fontSize: "3em",
        position: "relative",
        fontFamily: "Norse Regular",
        color: "white",
        backgroundColor: "black",
        padding: "20px",
        marginLeft: "40px"
    });
    $(exapprove).text("Yes");
    $(exdecline).text("No");
    document.getElementById(containerId).appendChild(excont);
    document.getElementById(exitcontainerId).appendChild(exhead);
    document.getElementById(exitcontainerId).appendChild(exapprove);
    document.getElementById(exitcontainerId).appendChild(exdecline);
}
//  Mute button to negate/enable all music
function addMute() {
    "use strict";
    var mutebutton = document.createElement("input");
    mutebutton.setAttribute("id", muteId);
    mutebutton.setAttribute("src", "Graphics/SmithGame/sounds_active.svg");
    mutebutton.setAttribute("type", "image");
    mutebutton.setAttribute("onclick", "muteclick()");
    $(mutebutton).css({
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: "70px",
        left: "1200px",
        width: "70px"
    });
    document.getElementById(containerId).appendChild(mutebutton);
}
//  function while mute is clicked: pauses all sound
function muteclick() {
    if (mute === false) {
        document.getElementById(muteId).setAttribute("src", "Graphics/SmithGame/sounds_mute.svg");
        mute = true;
        theme.pause();
    } else {
        document.getElementById(muteId).setAttribute("src", "Graphics/SmithGame/sounds_active.svg");
        mute = false;
        theme.play();
    }
}
// Adding div where meter image will be added
function addMeterbottom() {
    "use strict";
    var meterbottom = document.createElement("div");
    meterbottom.setAttribute("id", meterId);
    //  defining style
    $(meterbottom).css({
        height: "150px",
        width: "720px",
        backgroundImage: "url(Graphics/SmithGame/meter_bottom.png)",
        backgroundRepeat: "no-repeat",
        paddingTop: "20px",
        margin: "0px",
        position: "absolute"
    });
    document.getElementById(containerId).appendChild(meterbottom);
}
//  Adding meter image to move inside the container
function addMeterMarker() {
    "use strict";
    var metermarker;
    metermarker = document.createElement("img");
    metermarker.setAttribute("id", metermarkerId);
    metermarker.setAttribute("src", "Graphics/SmithGame/meter.png");
    metermarker.setAttribute("alt", "metermarker");
    metermarker.setAttribute("box-sizing", "border-box");
    //  defining style for the image
    $(metermarker).css({
        position: "absolute",
        left: "0px",
        top: "15px",
        padding: "0px",
        paddingLeft: "0px"
    });
    document.getElementById(meterId).appendChild(metermarker);
}
// Adding button element which  activates metermovement
function addButton() {
    "use strict";
    var button = document.createElement("input");
    button.setAttribute("id", buttonId);
    button.setAttribute("src", "Graphics/SmithGame/button.png");
    button.setAttribute("type", "image");
    button.setAttribute("onclick", "activate()");
    $(button).css({
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: "25.6px",
        left: "900px",
        width: "256px"
    });
     $(button).mouseenter(function () {
        $(button).attr("src", "Graphics/SmithGame/button_active.png");
    });
    $(button).mouseleave(function () {
        $(button).attr("src", "Graphics/SmithGame/button.png");
    });
    document.getElementById(containerId).appendChild(button);
}

// Adding animatable Hero-object
function addHero() {
    "use strict";
    var folke = document.createElement("img");
    folke.setAttribute("id", folkeId);
    folke.setAttribute("alt", "hero")
    folke.setAttribute("src", "Graphics/SmithGame/smith_hit1.png");
    $(folke).css({
        position: "absolute",
        top: "200px",
        left: "128px"
    });
    document.getElementById(containerId).appendChild(folke);
}

//  Adding animatable Smith-Object
function addSmith() {
    "use strict";
    var smith = document.createElement("img");
    smith.setAttribute("id", smithId);
    smith.setAttribute("src", "Graphics/SmithGame/smith_neutral.png");
    smith.setAttribute("alt", "smith")
    $(smith).css({
        position: "absolute",
        top: "200px",
        left: "640px"
        // height: "1024px"
    });
    document.getElementById(containerId).appendChild(smith);
}
//  Adding a textblock 
function addBlock(head, content) {
    "use strict";
    var vblock = document.createElement("div"),
        vhead = document.createElement("h2"),
        vcont = document.createElement("p"),
        button = document.createElement("button");
    vblock.setAttribute("id", popupId);
    $(vblock).css({
        padding: "40px",
        width: "500px",
        height: "450px",
        position: "relative",
        opacity: "0.8",
        left: "20px",
        top: "20px",
        backgroundColor: "rgb(0,0,0)",
        border: "1px solid rgb(10,10,10)"
    });
    vhead.setAttribute("id", popupheadId);
    $(vhead).text(head);
    $(vhead).css({
        fontSize: "3em",
        fontFamily: "norseRegular",
        color: "white"
    });
    vcont.setAttribute("id", popupcontId);
    $(vcont).text(content);
    $(vcont).css({
        fontSize: "2em",
        fontFamily: "norseRegular",
        color: "white"
    });
    button.setAttribute("id", popupbuttonId);
    button.setAttribute("onclick", "startgame()");
    $(button).text("Begin");
    $(button).css({
        fontFamily: "norseRegular",
        fontSize: "3em",
        border: "none",
        position: "absolute", // this may have to be relative
        left: "225px",  // this may have to be removed
        padding: "10px",
        margin: "10px",
        backgroundColor: "black",
        color: "white"
    });
    $(button).mouseenter(function () {
        $(button).css({border: "2px solid white",
                       cursor: "pointer",
                       margin: "8px"});
    });
    $(button).mouseleave(function () {
        $(button).css({
            border: "none",
            margin: "10px"
        });
    });
    document.getElementById(containerId).appendChild(vblock);
    vblock.appendChild(vhead);
    vblock.appendChild(vcont);
    vblock.appendChild(button);
}
function addScore() {
    "use strict";
    var scoreboard = document.createElement("div"),
        text = document.createElement("h1");
    scoreboard.setAttribute("id", scoreId);
    $(scoreboard).css({
        padding: "40px",
        width: "256px",
        position: "absolute",
        opacity: "0.8",
        left: "384px",
        top: "200px",
        backgroundColor: "rgb(0,0,0)",
        border: "1px solid rgb(10,10,10)"
    });
    text.setAttribute("id", scoretextId);
    $(text).text("Push HIT-button to start!");
    $(text).css({
        fontSize: "2em",
        fontFamily: "norseRegular",
        color: "white"
    });
    document.getElementById(containerId).appendChild(scoreboard);
    scoreboard.appendChild(text);
}
//  Function to play the sound of hitting
function hammerhit() {
    if (mute === false) {
        var sound = new Howl({
            src: ['Sounds/SmithGame/hammerhit.mp3']
        });
        sound.play();
    }
}
//  function to animate hero movements
function animate_hero() {
    "use strict";
    var hero = document.getElementById(folkeId),
        interval = setInterval(function () {
            if (hero.getAttribute("src") === "Graphics/SmithGame/smith_hit1.png") {
                hero.setAttribute("src", "Graphics/SmithGame/smith_hit2.png");
            } else if (hero.getAttribute("src") === "Graphics/SmithGame/smith_hit2.png") {
                hero.setAttribute("src", "Graphics/SmithGame/smith_hit3.png");
                hammerhit();
            } else {
                hero.setAttribute("src", "Graphics/SmithGame/smith_hit1.png");
                clearInterval(interval);
                if (firsthit === 1) {
                    $("#" + scoretextId).text("Good job! That was a hit. Get 8 hits to get your shield!");
                    firsthit = 0;
                } else if (firstmiss === 1) {
                    $("#" + scoretextId).text("Seems like you missed. If you miss 3 times in a row, you have to start over again! Try again...");
                    clickcount = clickcount - 1;
                    firstmiss = 0;
                }
            }
        }, 200);
}
// function to start  intervals and animation
function activate() {
    "use strict";
    clickcount = clickcount + 1;
    if (clickcount === 1) {
        $("#" + scoretextId).text("Now try to stop the meter at green by clicking again!");
    }
    // defining required local variables
    var doc = document.getElementById(metermarkerId);
    // getting metermarker elements left-attribute 
    var pad = $(doc).css("left");
    pad = pad.replace("px", "");
    pad = Number(pad);
    meterinterval = setInterval(function () {
        if (pad > 660) {
            direction = "-";
        } else if (pad <= 0) {
            direction = "+";
        }
        if (direction === "+") {
            pad += speed;
        } else if (direction === "-") {
            pad -= speed;
        }
        //doc.setAttribute("left", pad + "px");
        $(("#" + metermarkerId).toString()).css("left", pad + "px");
        $(("#" + buttonId).toString()).attr("onclick", "stop()");
    }, 5);
}
//  Pysäyttää mittarin ja ottaa sen arvon ja tutkii onko kyseessä osuma ja jos on lisää hits-mittarin arvoa. firsthit ja firstmiss käyvät läpi enimmäiset kerrat ja muuttavat tekstiä sen mukaan.
function stop() {
    "use strict";
    clearInterval(meterinterval);
    //  sankari lyö
    animate_hero();
    //paikalliset muuttujat
    var tmp = document.getElementById(metermarkerId),
        score = $(tmp).css("left");
    score = score.replace("px", "");
    score = Number(score);
    //  tutkii onko kyseessä osuma
    if (score > 250 && score < 430) {
        //  firsthit-arvo vähenee (ei voi olla alle 0)
        if (firsthit > 0) {
            firsthit = firsthit - 1;
        }
        HITcount = HITcount + 1;
        speed = speed + 1;
        //  Smith-hahmon kasvot muuttuvat iloisemmaksi
        if ($("#" + smithId).attr("src") === "Graphics/SmithGame/smith_angry.png") {
            $("#" + smithId).attr("src", "Graphics/SmithGame/smith_neutral.png");
        } else {
            $("#" + smithId).attr("src", "Graphics/SmithGame/smith.png");
        }
    } else {
        //  firstmiss-arvo vähenee (ei voi olla negatiivinen)
        if (firstmiss > 0) {
            firstmiss = firstmiss - 1;
        }
        //  HITcount-arvo vähenee (ei voi olla negatiivinen)
        if (HITcount > 0) {
            HITcount = HITcount - 1;
        }
        //  speed ei voi olla alle 2
        if (speed > 2) {
            speed = speed - 1;
        }
        //  Smith-hahmon kasvot muuttuvat vihaisemmaksi
        if ($("#" + smithId).attr("src") === "Graphics/SmithGame/smith.png") {
            $("#" + smithId).attr("src", "Graphics/SmithGame/smith_neutral.png");
        } else {
            $("#" + smithId).attr("src", "Graphics/SmithGame/smith_angry.png");
        }
    }
    //  tutkitaan onko voitto ja hit-button aktivoidaan sen mukaan
    if (HITcount > 7) {
        $("#" + scoretextId).text("Well done! click hit to continue...");
        document.getElementById(buttonId).setAttribute("onclick", "endGame()");
    }
    else {
        $("#" + scoretextId).text("HITs:" + HITcount + "/8");
        activate();
    }
}
// >>>>>>>    TÄMÄ FUNKTIO ALOITTAA PELIN!    <<<<<<
function smithintro() {
    "use strict";
    addcontainer();
    addMenu();
    addMute();
    addSmith();
    addBlock("Smithing Minigame!", "After asking many households, Our hero finds Himself at the door of Blacksmith Andersson. He has an extra shield laying around, but you'll have to do some smithwork to get it for yourself... Remember: Timing is key to smithing!");
    theme = new Howl({
        src: ['Music/TheForge.mp3'],
        loop: true,
        volume: "0.5",
        sprite: {
                main: [0, 40975]
        }
    });
    theme.play('main');
} /// >>>>>>        EDELTÄVÄ FUNKTIO ALOITTAA PELIN        <<<<<<<<<<
//  Peliruudun objektit lisätään ja peli alkaa
function startgame() {
    "use strict";
    $("#" + popupId).remove();
    $("#" + menubuttonId).remove();
    addMeterbottom();
    addMeterMarker();
    addHero();
    addButton();
    addScore();
    addMenu();
}
//  Pelin lopetusnäyttö
function endGame() {
    "use strict";
    //  tyhjennetään näyttö
    $("#" + containerId).empty();
    //  lisätään elementit ja muokataan niiden ulkonäkö
    addMute();
    addSmith();
    addHero();
    addBlock();
    addMenu();
    $("#" + folkeId).attr("src", "Graphics/SmithGame/hero_neutral.png");
    $("#" + folkeId).css({      
        top: "250px",
        left: "64px"
    });
    $("#" + popupId).css({      
        top: "10px",
        left: "300px",
        width: "420px",
        height: "600px"
    });
    //  uusi shield-kuvaelementti
    var shield = document.createElement("img");
    $(shield).attr("id", shieldId);
    $(shield).attr("src", "Graphics/SmithGame/shield.png");
    $(shield).attr("alt", "shield")
    $(shield).css({
        position: "absolute",
        width: "230px",
        height: "auto",
        left: "300px",
        top: "420px"
    });
    $("#" + containerId).append(shield);
    $("#" + smithId).attr("src", "Graphics/SmithGame/smith.png");
    $("#" + smithId).css({
        left: "768px"
    });
    $("#" + popupheadId).text("You got a Shield");
    $("#" + popupcontId).text("Great job young man, surely you have the arms of an excellent craftsman. Now this shield is rightfully yours! If I remember correctly, that old hunter at the forest might have the rest of the items you crave. You should likely go ask him about them...");
    
///      ####    LUE SURAAVA   ####
    
///      Seuraavan osan starnextgame-funktio aloittaa seuraavan pelin     
    
///      ===>      ASETTAKAA SEURAAVAN PELIN ALOITTAJA SEN TILALLE <====
    document.getElementById(popupbuttonId).setAttribute("onclick", "huntGameStart()");
    
    $("#" + popupbuttonId).text("Thank and Leave");
    $("#" + scoreId).css({
        height: "512px",
        width: "384px",
        top: "64px"
    });
}
//  Tämän voi poistaa Yhdistäessä!
// $(document).ready(function () {
//    "use strict";
//    smithintro();
// })

function huntGameStart() {
    $('#smithcontainer').remove();
    theme.unload();
    $.getScript( "Scripts/HuntGame/huntGame.js", function( textStatus ) {
      console.log( textStatus ); // Success
      console.log( "Load was performed." );
});
}