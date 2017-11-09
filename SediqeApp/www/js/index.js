$(document).ready(function() {
    setTimeout(function(){
        $('.splash').fadeOut(1000);
    },2000);

    $('a.link').click(function() {
        var target = $(this).data('location');
        var topMenu = $(this).closest('.page').get(0).id;
        $('.page').hide();
        $('.page#' + target).fadeIn(200);

        $('.backbutton:not(.toplevel)').click(function() {
            $('.page').hide();
            $('.page#' + topMenu).stop().fadeIn(200);
        });

        $('.backbutton.toplevel').click(function() {
            $('.page').hide();
            $('.page#page-main').stop().fadeIn(200);
        });

    });



});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
        $('.backbutton').click();
    }, false);
}
