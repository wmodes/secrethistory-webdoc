// Secret History of American River People
// Chapter Renderer

// Copyright (c) 2015 Wes Modes (http://modes.io)
// This content is released under the GNU General Public License, 
// version 3 (GPL-3.0). More info at 
// http://opensource.org/licenses/GPL-3.0

// Useful constants 
// TODO: Is there a better place to put these?
debug = true;
stickyLength = 0.33;
mouseSpeed = 30;

// ids and html for jquery insertions
docCanvasID = "doc-canvas";
outerWrapperID = "outer-wrapper";

innerWrapper = "<div id='inner-wrapper'>";
innerWrapperID = "inner-wrapper";

tableWrapper = "<div id='table-%id' class='table-wrap'>";
tableWrapperClass = "table-wrap";

shotWrapper = "<div id='shot-%id' class='shot-wrap shot full'>";
shotWrapperClass = "shot-wrap";

contentWrapper = "<div id='content-%id' class='content full'>";
ambientWrapper = "<div id='ambient-wrapper' class='audio offstage'>";

titleWrapper = "<div id='title-wrapper' class='chapter-title'>";
titleBox = "<div id='title-box' class='chapter-title-box'>";
titleWrapperID = "title-wrapper";
titleBoxID = "title-box";

scrollieBox = "<div id='scroll-box' class='chapter-scroll-box'>";
scrollieBoxID = "scroll-box";

// file locations
imageDir = "/images/";
videoDir = "/video/";
audioDir = "/audio/";
scrollieImage = "/images/scrolldown.png";

// Some plugin defaults
bigVideoDefaults = {
    useFlashForFirefox:false,
    forceAutoplay:false,
    controls:false,
    shrinkable:false,
}
vidDefault = ".mp4";

Template.chaptershow.helpers({
    isReady: function () {
        return Session.get("dataReady");
    },

    renderChapter: function () {

        //TODO: Move setup stuff to approp function

        // Some helpful things to keep track of
        var totalLength = 0;
        var shotLengths = {};
        var vw = 0;          // width of viewport
        var vh = 0;          // height of viewport
        var vUnit = "";

        // Remove scrollbar
        $("body").css("overflow-y", "hidden");
        $("body").css("overflow-x", "scroll");
        //$('#'+docCanvasID).css("overflow-y", "hidden");
        //$('#'+docCanvasID).css("overflow-x", "scroll");
        $("html").addClass("fancyscroll");
        $("body").addClass("fancyscroll");

        //Scroll page horizonally with mouse wheel
        $(function() {
            $("body").mousewheel(function(event, delta) {
                this.scrollLeft -= (delta * mouseSpeed);
                // ensures page won't scroll down
                event.preventDefault();
            });
        });
        
        // Initialize ScrollMagic Controller
        scrollControl = new ScrollMagic({
            vertical: false,
        });

        // dynamic page sizing
        // TODO: Move into separate file?

        // Initial set and callback
        setScreenSizes();
        $(window).resize(function() {
            setScreenSizes();
        });

        // Determining size of screen for fullscreen functions
        //TODO: Make this a callback that resizes everything
        function setScreenSizes () {
            vw = $(window).width();
            vh = $(window).height();
            vUnit = "px";
        }

        // Okay, now we start reading data and generating content

        // get a chapter from the database
        chapter = ChapterCollection.findOne();
        //alert(JSON.stringify(chapterArray, null, 2));
        if (debug) {
        console.log("We are rendering the following chapter:\n\tp"
            +chapter.pathNumber+" "+chapter.pathName+"\n\t\tc"
            +chapter.chapterNumber+" "+chapter.chapterName);
        }

        // Prepare the canvas
        $('#'+outerWrapperID).wrapInner(innerWrapper);
        $('#'+innerWrapperID).before(ambientWrapper);

        // Start ambient audio
        setAmbientAudio();

        //for each scene, and
        //  for each shot
        //    create a canvas
        var scenes = chapter.scenes;
        var firstContent;
        if (debug) {
            console.log("There are "+scenes.length+" scenes.");
        };
        for (iscene = 0; iscene < scenes.length; iscene++) { 
            var thisScene = scenes[iscene];
            var shots = thisScene.shots;
            var sceneNumber = thisScene.sceneNumber;
            if (debug) {
                console.log(">This is scene s"
                    +thisScene.sceneNumber+" "
                    +thisScene.sceneName+"\n\t"
                    +"Which has "+shots.length+" shot(s)");
            }
            for (ishot = 0; ishot < shots.length; ishot++) { 

                var thisShot = shots[ishot];
                var shotNumber = thisShot.shotNumber;
                var myIDnum = sceneNumber.toString()
                    +"-"+shotNumber.toString();

                // HTML FRAMEWORK
                // create the div that serves as a table cell
                var myTableID = "table-"+myIDnum;
                var myTableWrapper=tableWrapper.replace("%id", myIDnum);
                $('#'+innerWrapperID).append(myTableWrapper);
                // create the shot div
                var myShotID = "shot-"+myIDnum;
                var myShotWrapper=shotWrapper.replace("%id", myIDnum);
                $('#'+myTableID).append(myShotWrapper);
                // create the content div
                var myContentID = "content-"+myIDnum;
                var myContentWrapper=contentWrapper.replace("%id", myIDnum);
                $('#'+myShotID).append(myContentWrapper);
                
                // Add title to first content div
                if (! titleDone) {
                    var titleDone = true;
                    setTitle(scrollControl, myShotID, myContentID);
                    setScrollText(scrollControl, myShotID, myContentID);
                }

                // SIZING
                var myWidth = setSizing(thisShot);

                // PINING
                if (thisShot.sticky) {
                    pinShot(scrollControl, thisShot, myWidth, myShotID, myIDnum);
                }

                // CONTENT

                // just for kicks, we throw in a little content
                var myContent = "<h1>Shot "+myIDnum+"</h1>"
                    + "<p>Content: "+thisShot.shotContent+"</p>"
                    + "<p>Type: "+thisShot.shotType+"</p>"
                    + "<p>Sticky: "+thisShot.sticky+"</p>";
                $('#'+myContentID).append(myContent);

                if (thisShot.shotType == "still") {
                    fullscreenImage(thisShot, myContentID);
                } else if (thisShot.shotType == "video") {
                    fullscreenVideo(scrollControl, thisShot, myContentID, myIDnum);
                }
            }
        }


        function setSizing(thisShot) {
            // TODO: Add db fields: advanced > height, width, and sticky length
            // for now, we will assume that each shot fills the viewport
            //var contentHeight = "100vh"
            //var contentWidth = "100vw"
            $('#'+myContentID).width(vw.toString()+vUnit);
            $('#'+myContentID).height(vh.toString()+vUnit);
            // if not sticky, shot and content are the same size
            // if sticky, shot is longer than content
            $('#'+myShotID).height(vh.toString()+vUnit);
            // this is unnecessary since scrollMagic magically takes care of this
            if (! thisShot.sticky) {
                var myWidth = vw;
            } else {
                //var myWidth = vw * stickyLength;
                var myWidth = vw;
            }
            //$('#'+myShotID).width(myWidth.toString()+vUnit);
            $('#'+myShotID).width(vw.toString()+vUnit);
            // Add width to total and resize entire doc-canvas
            // Note: While ScrollMagic takes care of adding duration/stickyLength
            // to the shot div, we need to add the stickyLength to the total
            // doc-canvas or it will be too short and act weird
            totalLength += myWidth * (stickyLength+1);
            $('#'+docCanvasID).width(totalLength.toString()+vUnit);
            return(myWidth);
        }

        function pinShot(controller, myShot, myWidth, myShotID, myIDnum) {
            // Pin section
            // For the first section, we pin it shortly
            var myScrollScene = new ScrollScene({
                triggerHook: 0,
                offset: 0,
                triggerElement: '#'+myShotID,
                //First shot needs to be pinned differently
                //duration: vw,
                //duration: myWidth.toString()+"vw",
                duration: vw * stickyLength,
                //pushFollowers: true
            })
                .setPin('#'+myShotID)
                .addTo(controller);
            if (debug) {
                myScrollScene.addIndicators({suffix: myIDnum});
            }
        }

        function fullscreenImage(thisShot, myContentID) {
            $('#'+myContentID).backstretch(imageDir+thisShot.shotContent);
            //TODO:Next line is just a test
            $('#'+myContentID).css("color", "white")
        }

        function fullscreenVideo(controller, thisShot, myContentID, myIDnum) {
            var myContent = thisShot.shotContent;
            var myTrigger = thisShot.videoOptions.startTrigger;
            var myDuration = thisShot.videoOptions.duration;
            var myLoop = thisShot.videoOptions.videoLoop;
            var myVideoBase = myContent.replace(vidDefault, "");
            // defaults are set above
            myVideoSettings = $.extend({}, bigVideoDefaults, {
                container: $('#'+myContentID),
                doLoop: myLoop,
                id: "bigvideo-"+myIDnum
            });
            var myBigVideo = new $.BigVideo(myVideoSettings);
            myBigVideo.init();
            console.log("Loading video: "+videoDir+myVideoBase+".mp4");
            myBigVideo.show([
                { type: "video/mp4",  
                    src: videoDir+myVideoBase+".mp4"},
                //{ type: "video/webm", 
                    //src: videoDir+myVideoBase+".webm"},
                //{ type: "video/ogg",  
                    //src: videoDir+myVideoBase+".ogv"}
            ]);
            myBigVideo.getPlayer().pause();

            // Trigger background video start and end (loop default)
            var myScrollScene = new ScrollScene({
                triggerHook: 0,
                triggerElement: '#'+myContentID,
                // Use thisShot.startTrigger
                offset: myTrigger * vw,
                // Use thisShot.duration 
                //duration: vw * 2,
                duration: myDuration * vw
                //pushFollowers: false,
            })
                .on("start end", function (e) {
                    myBigVideo.getPlayer().play()
                })
                .on("enter leave", function (e) {
                    myBigVideo.getPlayer().pause()
                })
                .addTo(controller);
            if (debug) {
                myScrollScene.addIndicators({suffix: myIDnum});
            }
        }

        function setAmbientAudio() {
            // Background audio player
            var source = audioDir+chapter.ambientAudio.audioContent;
            var volume = chapter.ambientAudio.volume;
            $('#ambient-wrapper').append(
                "<video id='audioplayer-ambient'></video>");
            var audioPlayer0 = new MediaElementPlayer('#audioplayer-ambient', {
                type: 'audio/mp3',
                loop: true,
                success: function (mediaElement, domObject) {
                    mediaElement.setSrc(source);
                    mediaElement.load();
                }
            });
            audioPlayer0.setVolume(volume);
            audioPlayer0.play();

            // Trigger background audio start and end
            // TODO: Make ambientAudio button
                //.on("start end", function (e) {
                    //audioPlayer1.play();
                //})
                //.on("enter leave", function (e) {
                    //audioPlayer1.pause();
                //})
        }

        function setTitle(controller, triggerID, contentID) {
            $('#'+contentID).append(titleWrapper);
            $('#'+titleWrapperID).append(titleBox);
            $('#'+titleBoxID).html(chapter.chapterName);
            $('#'+titleBoxID).fitText(0.7);
            var myTween = TweenMax.to($('#'+titleWrapperID), 1, {opacity: -0.5, bottom: -vh/3});
            var myScrollScene = new ScrollScene({
                triggerElement: '#'+triggerID,
                triggerHook: 0,
                offset: 0,
                duration: vw * stickyLength,
                tweenChanges: true
            })
                .setTween(myTween)
                .addTo(controller)
        }

        function setScrollText(controller, triggerID, contentID) {
            $('#'+contentID).append(scrollieBox);
            $('#'+scrollieBoxID).html("<img src='"+scrollieImage+"' />");
            //TODO: instead make this a more efficient css animation w class toggle
            var myTween = TweenMax.to($('#'+scrollieBoxID), 0.25, {opacity: 0});
            var myScrollScene = new ScrollScene({
                triggerElement: '#'+triggerID,
                triggerHook: 0,
                offset: 0,
                duration: vw * stickyLength / 2,
                tweenChanges: true
            })
                .setTween(myTween)
                .addTo(controller)
        }

        // RANDOM HELPERS

        jQuery.fn.centerVert = function () {
            this.css("position","absolute");
            this.css("top", Math.max(0, (($(window).height() 
                - $(this).outerHeight()) / 2) 
                + $(window).scrollTop()) + "px");
            return this;
        }

        jQuery.fn.centerHorz = function () {
            this.css("position","absolute");
            this.css("left", Math.max(0, (($(window).width() 
                - $(this).outerWidth()) / 2) 
                + $(window).scrollLeft()) + "px");
            return this;
        }
    }
});
