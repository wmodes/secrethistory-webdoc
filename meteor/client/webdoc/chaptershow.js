// Secret History of American River People
// Chapter Renderer

// Version 0.1

/*
* Copyright (c) 2015 Wes Modes (http://modes.io)
* This content is released under the GNU General Public License, 
* version 3 (GPL-3.0). More info at 
* http://opensource.org/licenses/GPL-3.0
* TODO: Relase under MIT
*/

/*
* Dependencies:
* 
* jQuery JavaScript Library v1.11.2 - all around awesome indispensible Swiss 
*       army knife for JavaScript + Web
*       (c) 2005, 2014 jQuery Foundation, Inc. and other contributors 
*       MIT License (http://jquery.org/license)
* Meteor v1.0.3.1 - a fullstack NodeJS framework. We used demeteorizer to allow it 
*       to run outside of its meteor context and deploy to vanilla PAAS server
*       (c) 2015 Meteor Group (http://meteor.com) MIT License
* Scrollmagic.js v1.3.0 - this is the latest scrollmagic packaged for meteor.
*       I was unsuccessful installing ScrollMagic 2.0.0 as client/lib js files.
*       Be aware that 2.0.0 has modified instantiation and updated features.
*       It would be good to upgrade when possible.
*       (c) 2015 Jan Paepke MIT License
* GreenSock Animation Platform v0.10.5 - used for animation and tweening
*       (c) 2008-2014, GreenSock. All rights reserved. 
*       License at http://www.greensock.com/terms_of_use.html "You may use the 
*       code at no charge in commercial or non-commercial apps, web sites, games, 
*       components, and other software as long as end users are not charged a fee
*       of any kind to use your product or gain access to any part of it."
* BigVideo.js  - for background video. Loaded as client/libjs file, modified to 
*       handle muliple instances. ScrollMagic is used to trigger video on and off
*       as it gets within range of the viewport
*       (c) 2012 John Polacek (https://github.com/dfcb/BigVideo.js) MIT License
* Video.js v4.10.2 - Video player used by BigVideo
*       (c) 2014 Brightcove, Inc. Apache License, Version 2.0
*       (https://github.com/videojs/video.js/blob/master/LICENSE)
* Howler.js 2.0.0 - for background audio player. Loaded as client/libjs file. The
*       player is in an javascript only library so it is not visible. ScrollMagic is
*       used to trigger audio according to design of chapter.
*       (c) 2010-2014, John Dyer (http://j.hn) MIT License
* FitText.js 1.2 - expands text to fit container used for titles.
*       (c) 2011, Dave Rupert (http://daverupert.com) 
*       License: WTFPL http://sam.zoy.org/wtfpl/
* Backstretch v2.0.4 - for full width background images. 
*       (c) 2013 Scott Robbin (http://srobbin.com/jquery-plugins/) MIT License
* Bootstrap.js v3.1.0 - HTML, CSS, and JavaScript framework for developing responsive, 
*       mobile web projects
*       (c) 2011-2014 Twitter, Inc. MIT License 
*       (https://github.com/twbs/bootstrap/blob/master/LICENSE) 
* Bootbox.js v4.3.0 - for interactive simple modals
*       (C) 2011-2015 by Nick Payne <nick@kurai.co.uk> MIT License
*       MIT License
* JSON Editor v0.5.12 - JSON Schema -> HTML Editor
*       (c) 2014 Jeremy Dorn (https://github.com/jdorn/json-editor/) MIT License
* Mousewheel.js v3.0.6 - to allow trapping vertical mouse wheel movements
*       (c) 2011 Brandon Aaron (http://brandonaaron.net) MIT License
* ffmpeg v2.5.4 - (masquerading on Ubuntu as libav-tools in the repoA complete, 
*       cross-platform solution to record, convert and stream audio and video. 
*       Installed with options --with-libvorbis --with-libvpx
*       --with-theora --with-tools. We use this to compress video.
*       (c) ffmper.org GNU Lesser General Public License version 2.1
* HandBrakeCLI - HandBrakeCLI is command-line driven interface to a collection 
*       of built-in libraries which enables the decoding, encoding and conversion 
*       of audio and video streams to MP4 (M4V) and MKV container formats with an 
*       emphasis on H.264/MPEG-4 AVC encoding through x264
*       GNU General Public v2 License with L)GPL or BSD licensed libraries
* ffmpegthumbnailer v2.0.9 - A lightweight video thumbnailer. Uses ffmpeg to generate 
*       thumbnails from video easily
*       (c) dirk.vdb@gmail.com GNU GPL v2 License
* ImageMagick vi6.9.0-9 - a software suite to create, edit, compose, or convert bitmap 
*       images. We use this to compress and resize and compress our images
*       (c) 1999-2015 ImageMagick Studio LLC (http://imagemagick.org) Apache 2.0 License
*/

// Useful constants 
// TODO: Is there a better place to put these?
//
debug = false;
placeholders = false;
stickyLength = 0.33;
mouseSpeed = 100;
audioOn = true;
ambientSound = {};
ambientVolume = 0.5;

// ids and html for jquery insertions
docCanvasID = "doc-canvas";
outerWrapperID = "outer-wrapper";

innerWrapperDiv = "<div id='inner-wrapper'>";
innerWrapperID = "inner-wrapper";

tableWrapperDiv = "<div id='table-%id' class='table-wrap'>";
tableWrapperClass = "table-wrap";

shotWrapperDiv = "<div id='shot-%id' class='shot-wrap shot full'>";
shotWrapperClass = "shot-wrap";

contentWrapperDiv = "<div id='content-%id' class='content full'>";
ambientWrapperDiv = "<div id='ambient-wrapper' class='audio offstage'>";

titleWrapperDiv = "<div id='title-wrapper' class='chapter-title'>";
titleBoxDiv = "<div id='title-box' class='chapter-title-box'>";
titleWrapperID = "title-wrapper";
titleBoxID = "title-box";

scrollBoxDiv = "<div id='scroll-box' class='chapter-scroll-box'>";
scrollBoxID = "scroll-box";

audioWrapperDiv = "<div class='audio offstage'><video id='audio-%id'></video></div>";
visualWrapperDiv = "<div id='visual-%id' class='visual-element'></div>";

ambientToggleID = "ambient-toggle";
burgerID = "burger";

// file locations
imageDir = "/images/";
videoDir = "/video/";
audioDir = "/audio/";
scrollImage = "/images/scrolldown.png";
spacerImage = "/images/spacer.png";

placeImage = "placeholder-title.jpg";
placeVideo = "placeholder-title.mp4";

$('img').error(function(){
    $(this).attr('src', spacerImage);
});

// Some plugin defaults
bigVideoDefaults = {
    useFlashForFirefox:false,
    forceAutoplay:false,
    controls:false,
    shrinkable:false,
}
vidDefault = ".mp4";

Template.chaptershow.rendered = function() {

    routerParams = Router.current().params;
    var slug = routerParams.pathSlug+'/'+routerParams.chapterSlug;
    Session.set("slug", slug);
    console.log("Rendering Path (from template): "+slug);

}

Template.chaptershow.helpers({
    isReady: function () {
        return Session.get("dataReady");
    },

    renderChapter: function () {
        var slug = Session.get("slug");
        console.log("Rendering Path (from renderChapter): "+slug);

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
        chapter = ChapterCollection.findOne({
            slug: slug
        });
        //TODO: If we don't get it at first now what?
        debug = chapter.debug;
        placeholders = chapter.placeholders;

        // set window title
        document.title = "Secret History - " + chapter.pathName + " - " + chapter.chapterName;

        //alert(JSON.stringify(chapterArray, null, 2));
        if (debug) {
            console.log("We are rendering the following chapter:\n\tp"
                +chapter.pathNumber+" "+chapter.pathName+"\n\t\tc"
                +chapter.chapterNumber+" "+chapter.chapterName);
            console.log("Here it is:");
            console.log(chapter);
        }

        // Prepare the canvas
        $('#'+outerWrapperID).wrapInner(innerWrapperDiv);
        $('#'+innerWrapperID).before(ambientWrapperDiv);

        // Start ambient audio
        setAmbientAudio(chapter.ambientAudio);

        //for each scene, and
        //  for each shot
        //    create a canvas
        var scenes = chapter.scenes;
        var firstContent;
        if (debug) {
            console.log("There are "+scenes.length+" scenes.");
        };
        for (sceneIndex = 0; sceneIndex < scenes.length; sceneIndex++) { 
            var thisScene = scenes[sceneIndex];
            var shots = thisScene.shots;
            if (debug) {
                console.log(">This is scene s"
                    +thisScene.sceneNumber+" "
                    +thisScene.sceneName+"\n\t"
                    +"Which has "+shots.length+" shot(s)");
            }
            for (shotIndex = 0; shotIndex < shots.length; shotIndex++) { 

                var thisShot = shots[shotIndex];
                // if there is no content for the shot and we are not using placeholders, skip
                if (! thisShot.shotContent) {
                    if (! placeholders) {
                        continue;
                    } else {
                        if (thisShot.shotType == "still") {
                            thisShot.shotContent = placeImage;
                        } else {
                            thisShot.shotContent = placeVideo;
                            thisShot.videoOptions.videoLoop = true;
                        }
                    }
                }

                var IDnum = sceneIndex.toString()
                    +"-"+shotIndex.toString();

                // HTML FRAMEWORK
                //
                // create the div that serves as a table cell
                var tableID = "table-"+IDnum;
                var tableWrapper=tableWrapperDiv.replace("%id", IDnum);
                $('#'+innerWrapperID).append(tableWrapper);
                // create the shot div
                var shotID = "shot-"+IDnum;
                var shotWrapper=shotWrapperDiv.replace("%id", IDnum);
                $('#'+tableID).append(shotWrapper);
                // create the content div
                var contentID = "content-"+IDnum;
                var contentWrapper=contentWrapperDiv.replace("%id", IDnum);
                $('#'+shotID).append(contentWrapper);
                
                // Add title to first content div
                if (! titleDone) {
                    var titleDone = true;
                    setTitle(scrollControl, shotID, contentID);
                    setScrollText(scrollControl, shotID, contentID);
                }

                // SIZING
                //
                var width = setSizing(thisShot, shotID, contentID);

                // PINING
                //
                if (thisShot.sticky) {
                    pinShot(scrollControl, thisShot, width, shotID, IDnum);
                }

                // CONTENT
                //
                // just for kicks, we throw in a little content
                if (debug) {
                    var content = "<div class='debug'>"
                        + "Shot "+IDnum+"<br/>"
                        + thisShot.shotContent+"<br/>"
                        + "Type: "+thisShot.shotType+"<br/>"
                        + "Sticky: "+thisShot.sticky+"<br/>"
                        + "Loop: "+thisShot.videoOptions.videoLoop+"<br/>"
                        + "Audio elements: " + thisShot.audioElements.length+"<br/>"
                        + "Visual elements: " + thisShot.visualElements.length+"<br/>"
                        + "</div>";
                    $('#'+contentID).append(content);
                }

                // Background for this shot, stills or video
                if (thisShot.shotType == "still") {
                    setFullscreenImage(thisShot, contentID);
                } else if (thisShot.shotType == "video") {
                    setFullscreenVideo(scrollControl, thisShot, contentID, IDnum);
                }

                // AUDIO ELEMENTS
                //
                var audioElements = thisShot.audioElements;
                if (debug) {
                    console.log(">>There are "+audioElements.length+" audio elements.");
                };
                for (iaudio = 0; iaudio < audioElements.length; iaudio++) { 
                    var thisAudio = audioElements[iaudio];
                    if (thisAudio.audioContent) {
                        var audioIDnum = IDnum+"-"+iaudio;
                        var audioID = "audio-"+audioIDnum;
                        // create the audio div
                        var audioWrapper = audioWrapperDiv.replace("%id", audioIDnum);
                        $('#'+contentID).append(audioWrapper);
                        // set up audio elment
                        setAudioElement(scrollControl, thisAudio, audioID, shotID);
                    }
                }

                // VISUAL ELEMENTS
                //
                var visualElements = thisShot.visualElements;
                if (debug) {
                    console.log(">>There are "+visualElements.length+" visual elements.");
                };
                for (ivisual = 0; ivisual < visualElements.length; ivisual++) { 
                    var thisVisual = visualElements[ivisual];
                    if (thisVisual.visualContent) {
                        var visualIDnum = IDnum+"-"+ivisual;
                        var visualID = "visual-"+visualIDnum;
                        // create the visual div
                        var visualWrapper = visualWrapperDiv.replace("%id", visualIDnum);
                        $('#'+contentID).append(visualWrapper);
                        // set up visual elment
                        setVisualElement(scrollControl, thisVisual, visualID, shotID);
                    }
                }

            }
        }


        // BUTTONS AND CLICKY THINGS

        $('#'+ambientToggleID).click(function() {
            toggleAudio()
        });

        // AUDIO
        //
        function toggleAudio() {
            if (audioOn) {
                $('#'+ambientToggleID).removeClass('audio-on');
                audioOn = false;
                ambientSound.fade(ambientVolume,0,3000,function() { ambientSound.pause() });
            } else {
                $('#'+ambientToggleID).addClass('audio-on');
                audioOn = true;
                ambientSound.volume(0);
                ambientSound.play();
                ambientSound.fade(0,ambientVolume,3000);
            }
        }

        //TODO: pass myContentID to this func
        function setSizing(thisShot, myShotID, myContentID) {
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

        // CREATE SCROLL TRIGGERS

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
                pushFollowers: false
            })
                .setPin('#'+myShotID)
                .addTo(controller);
            if (debug) {
                myScrollScene.addIndicators({suffix: myIDnum});
            }
        }

        // CREATE IMAGE AND VIDEO

        function setFullscreenImage(thisShot, myContentID) {
            $('#'+myContentID).backstretch(imageDir+thisShot.shotContent);
            //TODO:Next line is just a test
            //$('#'+myContentID).css("color", "white")
        }

        function setFullscreenVideo(controller, thisShot, myContentID, myIDnum) {
            var myContent = thisShot.shotContent;
            var myOffset = thisShot.videoOptions.startTrigger;
            var myDuration = thisShot.videoOptions.duration;
            var myLoop = thisShot.videoOptions.videoLoop;
            var myVideoBase = myContent.replace(vidDefault, "");
            if (debug) {
                console.log("full screen video: "
                    + " offset:"+myOffset + " duration:"+myDuration
                    + " loop:"+myLoop + " source:"+myContent);
            }
            // defaults are set above
            myVideoSettings = $.extend({}, bigVideoDefaults, {
                container: $('#'+myContentID),
                doLoop: myLoop,
                loop: myLoop,
                id: "bigvideo-"+myIDnum
            });
            var myBigVideo = new $.BigVideo(myVideoSettings);
            myBigVideo.init();
            if (debug) {
                console.log("Loading video: "+videoDir+myVideoBase+".mp4");
            }
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
                offset: myOffset * vw,
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

        // CREATE AUDIO ELEMENTS

        function setAmbientAudio(ambientAudio) {
            // Background audio player
            var mySource = audioDir+ambientAudio.audioContent;
            var myVolume = ambientAudio.volume;
            // set a var usable elsewhere
            ambientVolume = myVolume;
            // we are using howler.js for audio and set a var used elsewhere
            ambientSound = new Howl({
                urls: [mySource],
                preload: true,
                autoplay: false,
                loop: true,
                volume: myVolume
            })
            ambientSound.play();
        }

        function setAudioElement(scrollControl, myAudio, myContentID, myTriggerID) {
            var mySource = audioDir+myAudio.audioContent;
            var myLoop = myAudio.audioLoop;
            var myOffset = myAudio.startTrigger;
            var myDuration = myAudio.duration;
            var myVolume = myAudio.volume;
            var myFadein = myAudio.fadeIn;
            if (debug) {
                console.log("trigger:"+myTriggerID
                    +" offset:"+myOffset+" duration:"+myDuration
                    +" volume:"+myVolume+" fade:"+myFadein+" loop:"+myLoop
                    +" source:"+mySource);
            }
            var mySound = new Howl({
                urls: [mySource],
                preload: true,
                autoplay: false,
                loop: myLoop,
                volume: myVolume
            });
            // Trigger background audio start and end
            indent = parseInt(myContentID.replace(/^.*\-/i, ""))+1;
            var myScrollScene = new ScrollScene({
                triggerHook: 0,
                triggerElement: '#'+myTriggerID,
                offset: vw * myOffset,
                duration: vw * myDuration,
            })
                .on("start end", function (e) {
                    mySound.play();
                    if (myFadein) {
                        mySound.volume(0);
                        mySound.play();
                        mySound.fade(0,myVolume,1000);
                    } else {
                        mySound.play();
                    }
                    if (debug) {
                        console.log(myContentID+": Playing "+mySource+"     Hear it?");
                    }
                })
                .on("enter leave", function (e) {
                    //mySound.pause();
                    if (myFadein) {
                        mySound.fade(myVolume,0,1000,function() { mySound.pause() });
                    } else {
                        mySound.pause();
                    }
                    mySound.pause();
                    if (debug) {
                        console.log(myContentID+": No longer playing "+mySource);
                    }
                })
                .addTo(scrollControl);
            if (debug) {
                myScrollScene.addIndicators({suffix: myContentID, indent: 60 * indent});
            }
        }

        // VISUAL ELEMENTS

        function setVisualElement(scrollControl, myVisual, myVisualDivID, myTriggerID) {
            var myContent = myVisual.visualContent;
            var myType = myVisual.visualType;
            var myFullscreen = myVisual.fullscreen;
            var myZindex = myVisual.zIndex;
            var myCSSbase = myVisual.cssBase;
            myTarget = $('#'+myVisualDivID)
            if (debug) {
                console.log("content:"+myContent
                    +" type:"+myType+" z-index:"+myZindex
                    +" css base:"+myCSSbase);
            }
            if (myType == "still") {
                myContent = imageDir+myContent;
                // Instead of putting image in div, replace div with image and give same id
                myTarget.replaceWith("<img id='"+myVisualDivID+"' src='"+myContent+"' />");
                // we do this again because it just changed
                myTarget = $('#'+myVisualDivID)
            } else {
                myTarget.html(myContent);
            }
            if (myFullscreen) {
                var parentID = myTarget.parent().attr('id');
                var backgroundStyle = $('#'+parentID+" .backstretch").attr("style");
                myTarget.attr("style", myTarget.attr("style") + "; " + backgroundStyle);
            }
            myTarget.css("z-index", myZindex);
            // Add cssBase css to existing element style
            myTarget.attr("style", myTarget.attr("style") + "; " + myCSSbase);

            //TODO: Process transitions
            var transitions = myVisual.transitions;
            if (debug) {
                console.log(">>>There are "+transitions.length+" transitions.");
            };
            for (itrans = 0; itrans < transitions.length; itrans++) { 
                var thisTrans = transitions[itrans];
                // we only do this if we have something to do
                if (thisTrans.cssEnd) {
                    // set up visual elment
                    setVisualTrans(scrollControl, thisTrans, visualID, shotID);
                }
            }

        }

        function setVisualTrans(scrollControl, myTrans, myContentID, myTriggerID) {
            // Trigger background visual start and end
            myOffset = myTrans.startTrigger;
            myDuration = myTrans.duration;
            myCSSend = CSSJSON.toJSON(myTrans.cssEnd).attributes;
            var myTween = TweenMax.to($('#'+myContentID), 1, myCSSend);
            if (debug) {
                console.log("Trans "+myContentID+" offset: "+myOffset+" duration: "+myDuration);
            }
            myScrollScene = new ScrollScene({
                triggerHook: 0,
                triggerElement: '#'+myTriggerID,
                offset: vw * myOffset,
                duration: vw * myDuration,
                tweenChanges: true
            })
                .setTween(myTween)
                .addTo(scrollControl);
            if (debug) {
                myScrollScene.addIndicators({suffix: myContentID, indent: 60 * 8});
            }
        }

        // CREATE TITLES

        function setTitle(controller, myTriggerID, myContentID) {
            $('#'+myContentID).append(titleWrapperDiv);
            $('#'+titleWrapperID).append(titleBoxDiv);
            $('#'+titleBoxID).html(chapter.chapterName);
            $('#'+titleBoxID).fitText(0.7);
            var myTween = TweenMax.to($('#'+titleWrapperID), 1, {opacity: -0.5, bottom: -vh/3});
            var myScrollScene = new ScrollScene({
                triggerElement: '#'+myTriggerID,
                triggerHook: 0,
                offset: 0,
                duration: vw * stickyLength,
                tweenChanges: true
            })
                .setTween(myTween)
                .addTo(controller)
        }

        function setScrollText(controller, myTriggerID, myContentID) {
            $('#'+myContentID).append(scrollBoxDiv);
            $('#'+scrollBoxID).html("<img src='"+scrollImage+"' />");
            //$('#'+scrollBoxID).addClass("fade");
            var myScrollScene = new ScrollScene({
                triggerElement: '#'+myTriggerID,
                triggerHook: 0,
                offset: -1,
                duration: 10
            })
                .on("leave end",function(){
                    $('#'+scrollBoxID).addClass("scroll-box-fade");
                    // as a bonus we will also un-highlight
                    $('#'+ambientToggleID).removeClass("highlighted");
                    $('.'+burgerID).removeClass("highlighted");
                })
                .addTo(controller);
            if (debug) {
                myScrollScene.addIndicators({suffix: "scrollBox", indent: 20});
            }
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
