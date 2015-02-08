// init controller
//var controller = new ScrollMagic();

sectionTotal = 5;
var controller;

//$(document).ready(function($) {
//Template.data_table.rendered = function () {
Meteor.startup(function () {
//$(document).ready(function(){

    var winWidth;
    var winHeight;
    var winUnit;
    fullDelay = 2;

    // Initialize ScrollMagic Controller
    controller = new ScrollMagic({
        triggerHook: "onCenter",
        vertical: false,
    });

    // Table-based horizontal scrolling
    $(function(){
		$("#wrap-outer").wrapInner("<table cellspacing='30'><tr>");
		$(".section").wrap("<td>");
	});

    //Scroll page horizonally with mouse wheel
    mouseSpeed = 30;
    $(function() {
        $("body").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * mouseSpeed);
            // ensures page won't scroll down
            event.preventDefault();
        });
    });

    // Initial set and callback
    setScreenSizes();
    $(window).resize(function() {
        setScreenSizes();
    });

    // Determining size of screen for fullscreen functions
    function setScreenSizes () {
        winWidth = $(window).width();
        winHeight = $(window).height();
        winUnit = winWidth;

        $(".content").width(winWidth);
        $(".content").height(winHeight);

        for (i = 1; i <= sectionTotal; i++) { 
            $("#section"+String(i)).width(winWidth * fullDelay);
            $("#section"+String(i)).height(winHeight);
        }
    }

    jQuery.fn.centerVert = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                    $(window).scrollTop()) + "px");
        return this;
    }

    jQuery.fn.centerHorz = function () {
        this.css("position","absolute");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                    $(window).scrollLeft()) + "px");
        return this;
    }

    // Section 1

    // Pin section
    // For the first section, we pin it shortly
    var scene = new ScrollScene({
        offset: winUnit/2,
        triggerElement: "#content1",
        duration: winUnit,
        //duration: winUnit*(fullDelay-1),
        //pushFollowers: false,
    })
        .setPin('#content1')
        .addTo(controller)
        .addIndicators({suffix: '1a'});

    // Fullscreen background image
    $(function() {
        $('#content1').backstretch('/images/p10-st-shantyboat-windows.jpg');
    });

    // Place image
    $(function() {
        $('#content1').append("<img id='image1-1' src='/images/Scroll-Right-200.png'/>");
        $('#image1-1').css({
            position: 'absolute',
            right: 10,
        });
        $('#image1-1').centerVert();
    });

    // Section 2

    // Pin section
    var scene = new ScrollScene({
        offset: winUnit/2,
        triggerElement: "#content2",
        duration: winUnit*(fullDelay-1),
        //pushFollowers: false,
    })
      .setPin('#content2')
      .addTo(controller)
      .addIndicators({suffix: '2a'});

    // Fullscreen background video
    var BV = new $.BigVideo();
    $(function() {
        isTouch = Modernizr.touch;
        var bigvideoDefaults = {
            useFlashForFirefox:false,
            forceAutoplay:false,
            controls:false,
            doLoop:true,
            shrinkable:false,
        }
        var bigvideoSettings = $.extend({}, bigvideoDefaults, {
            container:$('#content2')
        });
        BV = new $.BigVideo(bigvideoSettings);

        BV.init();
        BV.show([
            { type: "video/mp4",  
                src: "/video/p00-sunny-window-loop.mp4"},
            { type: "video/webm", 
                src: "/video/p00-sunny-window-loop.webm"},
            { type: "video/ogg",  
                src: "/video/p00-sunny-window-loop.ogv"}
        ]);
        BV.getPlayer().pause();
    });

    // Trigger background video start and end
    var scene = new ScrollScene({
        offset: -winUnit/2,
        triggerElement: "#content2",
        duration: winUnit*(fullDelay*2),
        //pushFollowers: false,
    })
        .on("start end", function (e) {
            BV.getPlayer().play()
        })
        .on("enter leave", function (e) {
            BV.getPlayer().pause()
        })
        .addTo(controller)
        .addIndicators({suffix: '2b'});

    // Section 3

    // Pin section
    var scene = new ScrollScene({
        offset: winUnit/2,
        triggerElement: "#content3",
        duration: winUnit*(fullDelay-1),
        //pushFollowers: false,
    })
      .setPin('#content3')
      .addTo(controller)
      .addIndicators({suffix: '3a'});

    // Fullscreen background image
    $(function() {
        $('#content3').backstretch('/images/p10-st-shantyboat-library.jpg');
    });

    // Section 4

    // Pin section
    var scene = new ScrollScene({
        offset: winUnit/2,
        triggerElement: "#content4",
        duration: winUnit*(fullDelay-1),
        //pushFollowers: false,
    })
      .setPin('#content4')
      .addTo(controller)
      .addIndicators({suffix: '4a'});

    // Fullscreen background image
    $(function() {
        $('#content4').backstretch('/images/p10-st-shantyboat-table.jpg');
    });

    // Background audio player
    $(function() {
        $('#content4').append(
            "<div class='audio offstage'><video id='audio4-1'></video></div>");
        audioPlayer1 = new MediaElementPlayer('#audio4-1', {
            type: 'audio/mp4',
            loop: true,
            success: function (mediaElement, domObject) {
                var sources = [
                    { src: "/audio/Stay A Little Longer Bob Wills.mp4", type: 'audio/mp4' },
                ];
                mediaElement.setSrc(sources);
                mediaElement.load();
                mediaElement.pause();
            }
        });

        // Trigger background audio start and end
        new ScrollScene({
            offset: -winUnit,
            triggerElement: "#content4",
            duration: winUnit*(fullDelay*2),
            //pushFollowers: false,
        })
            .on("start end", function (e) {
                audioPlayer1.play();
            })
            .on("enter leave", function (e) {
                audioPlayer1.pause();
            })
            .addTo(controller)
            .addIndicators({suffix: '4b-1'});
    });

    // Background audio player
    $(function() {
        $('#content4').append(
            "<div class='audio offstage'><video id='audio4-2'></video></div>");
        audioPlayer2 = new MediaElementPlayer('#audio4-2', {
            type: 'audio/wav',
            loop: true,
            success: function (mediaElement, domObject) {
                var sources = [
                    { src: "/audio/sfx-paper-jam-radio-band.wav", type: 'audio/wav' },
                ];
                mediaElement.setSrc(sources);
                mediaElement.load();
                mediaElement.pause();
            }
        });

        // Trigger background audio start and end
        new ScrollScene({
            offset: -winUnit-100,
            triggerElement: "#content4",
            duration: 100,
            //pushFollowers: false,
        })
            .on("start end", function (e) {
                audioPlayer2.play();
            })
            .on("enter leave", function (e) {
                audioPlayer2.pause();
            })
            .addTo(controller)
            .addIndicators({suffix: '4b-2'});
    });

    // Background audio player
    $(function() {
        $('#content4').append(
            "<div class='audio offstage'><video id='audio4-3'></video></div>");
        audioPlayer3 = new MediaElementPlayer('#audio4-3', {
            type: 'audio/wav',
            loop: true,
            success: function (mediaElement, domObject) {
                var sources = [
                    { src: "/audio/sfx-paper-jam-radio-band.wav", type: 'audio/wav' },
                ];
                mediaElement.setSrc(sources);
                mediaElement.load();
                mediaElement.pause();
            }
        });

        // Trigger background audio start and end
        new ScrollScene({
            offset: winUnit*(fullDelay*2-1),
            triggerElement: "#content4",
            duration: 100,
            //pushFollowers: false,
        })
            .on("start end", function (e) {
                audioPlayer3.play();
            })
            .on("enter leave", function (e) {
                audioPlayer3.pause();
            })
            .addTo(controller)
            .addIndicators({suffix: '4b-3'});
    });

    // Section 5

    // Pin section
    var scene = new ScrollScene({
        offset: winUnit/2,
        triggerElement: "#content5",
        duration: winUnit*(fullDelay-1),
        //pushFollowers: false,
    })
      .setPin('#content5')
      .addTo(controller)
      .addIndicators({suffix: '5a'});

    // Fullscreen background image
    $(function() {
        $('#content5').backstretch('/images/p10-st-shantyboat-galley.jpg');
    });

});
