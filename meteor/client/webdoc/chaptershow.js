// Secret History of American River People
// Chapter Renderer

// Copyright (c) 2015 Wes Modes (http://modes.io)
// This content is released under the GNU General Public License, 
// version 3 (GPL-3.0). More info at 
// http://opensource.org/licenses/GPL-3.0

// Useful constants 
// TODO: Is there a better place to put these?
debug = true;
stickyLength = 2;

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
imageDir = "image/";
videoDir = "video/";
audioDir = "audio/";

Template.chaptershow.rendered = function(){

    // Some helpful things to keep track of
    totalLength = 100;  // in vw's
    shotLengths = {};
    var winWidth;
    var winHeight;
    var winUnit;

    // Remove scrollbar
    $("body").css("overflow-y", "hidden");

    //Scroll page horizonally with mouse wheel
    mouseSpeed = 30;
    $(function() {
        $("body").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * mouseSpeed);
            // ensures page won't scroll down
            event.preventDefault();
        });
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
        winWidth = $(window).width();
        winHeight = $(window).height();
        winUnit = winWidth;
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

            // HTML FRAMEWORK

            var thisShot = shots[ishot];
            var shotNumber = thisShot.shotNumber;
            var IDnum = sceneNumber.toString()
                +"-"+shotNumber.toString();

            // create the shot div
            var myShotID = "shot-"+IDnum;
            var myShotWrapper=shotWrapper.replace("%id", myShotID);
            $('#'+innerWrapperID).append(myShotWrapper);

            // create the content div
            var myContentID = "content-"+IDnum;
            var myContentWrapper=contentWrapper.replace("%id", myContentID);
            $('#'+myShotID).append(myContentWrapper);

            // set up for a really long horizontal table
            $('#'+myShotID).wrap(tdWrapper);

            // SIZING

            // TODO: Add db fields: advanced > height, width, and sticky length
            // for now, we will assume that each shot fills the viewport
            var contentHeight = "100vh"
            var contentWidth = "100vw"
            $('#'+myContentID).height(contentHeight);
            $('#'+myContentID).width(contentWidth);
            // if not sticky, shot and content are the same size
            // if sticky, shot is longer than content
            var shotHeight = "100vh"
            $('#'+myShotID).height(shotHeight);
            if (! thisShot.sticky) {
                var myWidth = 100;
            } else {
                var myWidth = 100 * stickyLength;
            }
            var shotWidth = myWidth.toString()+"vw"
            $('#'+myShotID).width(shotWidth);
            // Add width to total and resize entire doc-canvas
            totalLength += myWidth;
            $('#'+docCanvasID).width(totalLength.toString()+"vw");

            // CONTENT

            // just for kicks, we throw in a little content
            var myContent = "<h1>Shot "+IDnum+"</h1>"
                + "<p>Content: "+thisShot.shotContent+"</p>"
                + "<p>Type: "+thisShot.shotType+"</p>"
                + "<p>Sticky: "+thisShot.sticky+"</p>";
            $('#'+myContentID).append(myContent);

            // Fullscreen background images
            if (thisShot.shotType == "image") {
                $('#'+myContentID).backstretch(imageDir+thisShot.shotContent);
                $('#'+myContentID).css({color: "white"})
            }


        }
    }


};
