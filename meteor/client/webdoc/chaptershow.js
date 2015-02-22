// Secret History of American River People
// Chapter Renderer

// Copyright (c) 2015 Wes Modes (http://modes.io)
// This content is released under the GNU General Public License, 
// version 3 (GPL-3.0). More info at 
// http://opensource.org/licenses/GPL-3.0

// Useful constants 
// TODO: Is there a better place to put these?
debug = true;
stickyLength = 0.5;
mouseSpeed = 30;

// ids and html for jquery insertions
docCanvasID = "doc-canvas";
outerWrapperID = "outer-wrapper";
innerWrapperID = "inner-wrapper";
tableWrapperID = "table-wrapper";
innerWrapper = "<div id='inner-wrapper'>";
tableWrapper = "<table id='table-wrapper'><tr>";
tdWrapper = "<td class='td-wrap'>";
shotWrapper = "<div id='%id' class='shot full'>";
contentWrapper = "<div id='%id' class='content full'>";

// file locations
imageDir = "/images/";
videoDir = "/video/";
audioDir = "/audio/";

// Some plugin defaults
bigVideoDefaults = {
    useFlashForFirefox:false,
    forceAutoplay:false,
    controls:false,
    shrinkable:false,
}
vidDefault = ".mp4";

Template.chaptershow.rendered = function(){

    // Some helpful things to keep track of
    var totalLength = 0;
    var shotLengths = {};
    var vw = 0;          // width of viewport
    var vh = 0;          // height of viewport
    var vUnit = "";

    // Remove scrollbar
    $("body").css("overflow-y", "hidden");

    //Scroll page horizonally with mouse wheel
    $(function() {
        $("body").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * mouseSpeed);
            // ensures page won't scroll down
            event.preventDefault();
        });
    });
    
    // Initialize ScrollMagic Controller
    controller = new ScrollMagic({
        triggerHook: "onCenter",
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
    function setScreenSizes () {
        vw = $(window).width();
        vh = $(window).height();
        vUnit = "px";
    }


    // Okay, now we start reading data and generating content
    
    // get an array of posts
    chapterArray = ChapterCollection.find().fetch();
    // use the first element returned from the array
    var chapter = chapterArray[0];
    if (debug) {
        console.log(chapter);
    }
    //alert(JSON.stringify(chapterArray, null, 2));
    if (debug) {
    console.log("We are rendering the following chapter:\n\tp"
        +chapter.pathNumber+" "+chapter.pathName+"\n\t\tc"
        +chapter.chapterNumber+" "+chapter.chapterName);
    }

    // Prepare the canvas
    $('#'+outerWrapperID).wrapInner(innerWrapper);
    $('#'+outerWrapperID).wrapInner(tableWrapper);

    //for each scene, and
    //  for each shot
    //    create a canvas
    // each canvas should look something like:
    // <div id="shot-10-05" class="shot">
    // <div id="content1" class="content">
    // </div>
    // </div>
    var scenes = chapter.scenes;
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
            var myShotID = "shot-"+myIDnum;
            var myContentID = "content-"+myIDnum;

            // HTML FRAMEWORK
            // create the shot div
            var myShotWrapper=shotWrapper.replace("%id", myShotID);
            $('#'+innerWrapperID).append(myShotWrapper);
            // create the content div
            var myContentWrapper=contentWrapper.replace("%id", myContentID);
            $('#'+myShotID).append(myContentWrapper);
            // set up for a really long horizontal table
            $('#'+myShotID).wrap(tdWrapper);

            // SIZING
            var myWidth = setSizing(thisShot);

            // PINING
            if (thisShot.sticky) {
                pinShot(controller, thisShot, myWidth, myShotID, myIDnum);
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
                fullscreenVideo(thisShot, myContentID, myIDnum);
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
            //pushFollowers: false,
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

    function fullscreenVideo(thisShot, myContentID, myIDnum) {
        var myVideoBase = thisShot.shotContent.replace(vidDefault, "");
        // defaults are set above
        myVideoSettings = $.extend({}, bigVideoDefaults, {
            container: $('#'+myContentID),
            doLoop: thisShot.videoLoop,
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
            // TODO: Use thisShot.startTrigger when it is adjusted correctly
            offset: -vw,
            // TODO: Use thisShot.duration when it is adjusted correctly
            duration: vw * 2,
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

};
