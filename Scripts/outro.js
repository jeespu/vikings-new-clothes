$('#loadImage').css({display:"none"})
$('#wrapper').css({display:"block", margin:"5% auto", 'text-align':"center"});
$("#outro")[0].play();
$('#outro').on('ended',function(e){
    window.location = "index.html";
});
