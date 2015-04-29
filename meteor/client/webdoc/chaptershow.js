// Secret History of American River People
// Chapter Renderer

// Version 0.9

/*
 
   Copyright (c) 2015 Wes Modes (http://modes.io)
   This content is released under the GNU General Public License, 
   version 3 (GPL-3.0). More info at 
   http://opensource.org/licenses/GPL-3.0

   See package license information in license.js

*/



Template.chaptershow.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe('ChapterCollection');
});


Template.chaptershow.rendered = function() {

  routerQuery = Router.current().params.query;
  var queryParams = UI._globalHelpers.obj2query(routerQuery);

  if (/(exhibit|kiosk)/.test(routerQuery.mode)) {

    console.log("setting idle timer in exhibit mode");

    idleTimer = null;
    idleState = false;
    idleWait = 1 * 60 * 1000;
    startURL = "/"

    $('*').bind('mousemove keydown scroll', function () {
    
      clearTimeout(idleTimer);
          
      if (idleState == true) { 
        // Reactivated event
        console.log("Reset timer: not idle");
      }
      idleState = false;
      
      idleTimer = setTimeout(function () { 
        // Idle Event
        document.location = startURL + queryParams;
        idleState = true; 
      }, idleWait);
    });
    
    $("body").trigger("mousemove");

  }
}



Template.chaptershow.helpers({

  isExhibit: function() {
    return (/(exhibit|kiosk)/.test(Router.current().params.query.mode));
  },

  renderChapter: function() {

    // Paremeters and query
    routerParams = Router.current().params;
    var slug = routerParams.pathSlug+'/'+routerParams.chapterSlug;
    routerQuery = Router.current().params.query;
    var queryParams = UI._globalHelpers.obj2query(routerQuery);

    // Useful constants 
    // TODO: Make all these user-servicable parts in the database, modifible through admin
    //
    var debug = false;
    var release = false;
    var placeholders = false;
    var stickyLength = 0.33;
    var dissolveLength = 0.5;
    var mouseSpeed = 100;
    var audioOn = true;
    var ambientSound = {};
    var ambientSoundID = {};
    var ambientVolume = 0.5;
    var ambientFadeTime = 3000; // in ms
    var soundFadeTime = 1000; // in ms
    var keyAdvanceSpeed = 500;
    var keyAdvance = 1920/4;

    // file locations
    var imageDir = "/images/";
    var videoDir = "/video/";
    var audioDir = "/audio/";

    var clickOnSource =  "/audio/link-rustyclick1.wav";
    var clickOffSource =  "/audio/link-rustyclick2.wav";
    var clickVolume = 0.25;

    var scrollImage = "/images/scroll-instructions-by-hand.png";
    var spacerImage = "/images/spacer.png";

    var placeImage = "placeholder-title.jpg";
    var placeVideo = "placeholder-title.mp4";

    // ids and html for jquery insertions
    var docCanvasID = "#doc-canvas";
    var outerWrapperID = "#outer-wrapper";

    var innerWrapperDiv = "<div id='inner-wrapper'>";
    var innerWrapperID = "#inner-wrapper";

    var tableWrapperDiv = "<div id='table-%id' class='table-wrap'>";

    var shotWrapperDiv = "<div id='shot-%id' class='shot-wrap shot full'>";

    var contentWrapperDiv = "<div id='content-%id' class='content full'>";

    var imageDiv = "<img id='image-%id' class='image-cover' />";

    var ambientWrapperDiv = "<div id='ambient-wrapper' class='audio offstage'>";

    var titleWrapperDiv = "<div id='title-wrapper' class='chapter-title'>";
    var titleBoxDiv = "<div id='title-box' class='chapter-title-box'>";
    var titleWrapperID = "#title-wrapper";
    var titleBoxID = "#title-box";

    var scrollBoxDiv = "<div id='scroll-box' class='chapter-scroll-box'>";
    var scrollBoxID = "#scroll-box";

    var audioWrapperDiv = "<div class='audio offstage'><video id='audio-%id'></video></div>";
    var visualWrapperDiv = "<div id='visual-%id' class='visual-element'></div>";
    var linkWrapperDiv = "<div id='link-wrapper' class='link-wrapper'></div>";
    var linkWrapperID = "#link-wrapper";
    var linkElementDiv = "<div id='link-%id' class='link-element'></div>";
    var linkElementID = "#link-";
    var linkElementClass = ".link-element";
    var linkTextDiv = "<div id='link-text' class='link-text'></div>";
    var linkTextID = "#link-text";

    var ambientToggleID = "#ambient-toggle";
    var burgerClass = ".burger";

    // Useful globals
    var fancyTransFlag = false;

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

    // Some helpful things to keep track of
    var totalLength = 0;
    var shotLengths = {};
    var vw = 0;      // width of viewport
    var vh = 0;      // height of viewport
    var vUnit = "";

    // Remove scrollbar
    $("body").css("overflow-y", "hidden");
    $("body").css("overflow-x", "scroll");
    //$(docCanvasID).css("overflow-y", "hidden");
    //$(docCanvasID).css("overflow-x", "scroll");
    $("html").addClass("fancyscroll");
    $("body").addClass("fancyscroll");

    // WINDOW SIZING
    //
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

    // DATA
    // 
    // get a chapter from the database
    chapter = ChapterCollection.findOne({
      slug: slug
    });
    //TODO: If we don't get it at first now what?
    debug = chapter.debug;
    placeholders = chapter.placeholders;

    // SETUP STUFFS
    //
    // Initialize ScrollMagic Controller
    scrollControl = new ScrollMagic({
      vertical: false,
    });

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
    $(outerWrapperID).wrapInner(innerWrapperDiv);
    $(innerWrapperID).before(ambientWrapperDiv);

    // Start ambient audio
    setAmbientAudio(chapter.ambientAudio);

    // KEY & MOUSE CONTROLS
    //
    //Scroll page horizonally with mouse wheel
    $(function() {
      $("body").mousewheel(function(event, delta) {
        this.scrollLeft -= (delta * mouseSpeed);
        // ensures page won't scroll down
        event.preventDefault();
      });
    });

    // Capture arrow keys and scroll
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 38:      // up
        case 37:      // left
          event.preventDefault();
          // get current x position on page
          var x = window.scrollX;
          $('html, body').animate({scrollLeft: x - keyAdvance}, keyAdvanceSpeed);
          //$('html, body').scrollLeft(x - keyAdvance);
          break;
        case 40:      // down
        case 39:      // right
        case 32:      // space
          event.preventDefault();
          // get current x position on page
          var x = window.scrollX;
          $('html, body').animate({scrollLeft: x + keyAdvance}, keyAdvanceSpeed);
          //$('html, body').scrollLeft(x + keyAdvance);
          break;
      }
    };

    // FIRST PASS - create all containers and major DOM elements
    //
    //for each scene, and
    //  for each shot
    //  create a canvas
    var allShotIndex = 0;
    var scenes = chapter.scenes;
    if (debug) console.log("FIRST PASS: "+scenes.length+" scenes.");
    for (sceneIndex = 0; sceneIndex < scenes.length; sceneIndex++) { 
      var thisScene = scenes[sceneIndex];
      var shots = thisScene.shots;
      if (debug) {
        console.log(">This is scene s"
          +thisScene.sceneNumber+" "
          +thisScene.sceneName+"\n\t"
          +"Which has "+shots.length+" shot(s)");
      }
      for (shotIndex = 0; shotIndex < shots.length; shotIndex++, allShotIndex++) { 
        var thisShot = shots[shotIndex];
        var IDnum = allShotIndex;
        //
        // HTML FRAMEWORK
        //
        // create the div that serves as a table cell
        var tableID = "#table-"+IDnum;
        var tableWrapper=tableWrapperDiv.replace("%id", IDnum);
        $(innerWrapperID).append(tableWrapper);
        // create the shot div
        var thisShotID = "#shot-"+IDnum;
        var shotWrapper=shotWrapperDiv.replace("%id", IDnum);
        $(tableID).append(shotWrapper);
        // create the content div
        var thisContentID = "#content-"+IDnum;
        var contentWrapper=contentWrapperDiv.replace("%id", IDnum);
        $(thisShotID).append(contentWrapper);
      }
    }

    // SECOND PASS - fill the containers
    //
    //for each scene, and
    //  for each shot
    //  create a canvas
    var allShotIndex = 0;
    if (debug) console.log("SECOND PASS: "+scenes.length+" scenes.");
    for (sceneIndex = 0; sceneIndex < scenes.length; sceneIndex++) { 
      var thisScene = scenes[sceneIndex];
      var shots = thisScene.shots;
      if (debug) console.log(">This is scene s" + thisScene.sceneNumber + " "
                             + thisScene.sceneName + "\n\t"
                             + "Which has " + shots.length + " shot(s)");
      for (shotIndex = 0; shotIndex < shots.length; shotIndex++, allShotIndex++) { 
        var thisShot = shots[shotIndex];
        // Placeholders
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
        //
        // HTML Framework created above in first pass
        //
        // but we still need the ID nums
        var IDnum = allShotIndex;
        var tableID = "#table-"+IDnum;
        var thisShotID = "#shot-"+IDnum;
        var thisContentID = "#content-"+IDnum;
        // next up...
        var nextIDnum = parseInt(IDnum)+1;
        var nextContentID = "#content-"+nextIDnum;
        var nextShotID = "#shot-"+nextIDnum;
        
        // Add title to first content div
        if (! titleDone) {
          var titleDone = true;
          setTitle(scrollControl, thisShotID, thisContentID);
          setScrollText(scrollControl, thisShotID, thisContentID);
        }

        // SIZING
        //
        var width = setSizing(thisShot, thisShotID, thisContentID);

        // TRANSITIONS
        //
        var transType = thisShot.transitionType;
        // if duration is not set, take default
        if (!thisShot.shotDuration) thisShot.shotDuration = stickyLength;
        // if last shot was fancy
        if (fancyTransFlag) {
          // clear flag
          fancyTransFlag = false;
          // make sure this shot is not pinned
          thisShot.sticky = false;
          // no fancy stuff this time
          transType = "push";
          // Adjust negative offset for faux pinned frames
          var negOffset = thisShot.shotDuration;
        } else {
          var negOffset = 0;
        }

        // Test for fancy transition
        var fancyTrans = ["cut", "dissolve", "fade", "flare", "focus"];
        if (fancyTrans.indexOf(transType) >= 0) {
          // if fancy, extend shot duration and make sure we pin
          thisShot.sticky = true;
          // shotDuration for 2 shots + transition
          // Instead of duration*2, instead add next shot's duration
          console.log(nextShot(scenes, sceneIndex, shots, shotIndex));
          var pinDuration = thisShot.shotDuration 
                            + nextShot(scenes, sceneIndex, 
                                       shots, shotIndex).shotDuration;
          var pinPushFollowers = true;
        } else {
          var pinDuration = thisShot.shotDuration;
          var pinPushFollowers = true;
        }
        // PIN SHOT, if needed
        //
        if (thisShot.sticky) {
          pinShot(scrollControl, width, thisShotID, pinDuration, pinPushFollowers);
        }
        // Test again for fancy transition
        if (fancyTrans.indexOf(transType) >= 0) {
          if (debug) console.log("Setting up fancy transition:"+transType);
          // make sure next frame is pinned
          fancyTransFlag = true;

          // FAUX PIN DISSOLVING SHOTS
          //
          // get full width of scrollmagic element
          fauxPin(scrollControl, thisShotID, thisContentID, nextShotID, nextContentID);
        }

        // FANCY TRANSITIONS
        //
        switch (transType) {
          case 'dissolve':
            dissolve(scrollControl, thisShotID, thisContentID, thisShot.shotDuration);
            break;
          case 'fade':
            fade(scrollControl, thisShotID, thisContentID, nextShotID, nextContentID, 
                 thisShot.shotDuration);
            break;
          case 'flare':
            flare(scrollControl, thisShotID, thisContentID, nextShotID, nextContentID, 
                 thisShot.shotDuration);
            break;
        }

        // CONTENT
        //
        // we throw in a little content
        if (!chapter.release && debug) {
          var content = "<div class='debug'>"
            + "Shot "+IDnum+"<br/>"
            + thisShot.shotContent+"<br/>"
            + "Type: "+thisShot.shotType+"<br/>"
            + "Sticky: "+thisShot.sticky+"<br/>"
            + "Loop: "+thisShot.videoOptions.videoLoop+"<br/>"
            + "Audio elements: " + thisShot.audioElements.length+"<br/>"
            + "Visual elements: " + thisShot.visualElements.length+"<br/>"
            + "</div>";
          $(thisContentID).append(content);
        }

        // Background for this shot, stills or video
        if (thisShot.shotType == "still") {
          setFullscreenImage(thisShot, thisContentID, IDnum);
        } else if (thisShot.shotType == "video") {
          setFullscreenVideo(scrollControl, thisShot, thisContentID, IDnum);
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
            var audioID = "#audio-"+audioIDnum;
            // create the audio div
            var audioWrapper = audioWrapperDiv.replace("%id", audioIDnum);
            $(thisContentID).append(audioWrapper);
            // set up audio elment
            setAudioElement(scrollControl, thisAudio, audioID, 
                            thisShotID, negOffset);
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
            var visualID = "#visual-"+visualIDnum;
            // create the visual div
            var visualWrapper = visualWrapperDiv.replace("%id", visualIDnum);
            $(thisContentID).append(visualWrapper);
            // set up visual elment
            setVisualElement(scrollControl, thisVisual, visualID, 
                             thisShotID, negOffset);
          }
        }
      }
    }

    // SET TOTAL WIDTH
    //
    //TODO: Add this to setSizing and call it from here
    totalWidth = 0;
    for (shotIndex = 0; shotIndex < allShotIndex; shotIndex++) { 
      totalWidth += $('#table-'+shotIndex).width() 
    };
    $(docCanvasID).css({width: totalWidth+'px'});

    // ADD LINKS
    //
    //TODO: If it is not already in links add "next" released chapter
    var linkWrapper = linkWrapperDiv.replace("%id", IDnum);
    $(thisContentID).append(linkWrapper);
    for (linkIndex = chapter.links.length - 1; linkIndex >= 0; linkIndex--) {
      createLink(chapter.links[linkIndex], linkWrapperID, linkIndex);
    }
    $(linkWrapperID).append(linkTextDiv);
    // attach audio to hover over the links
    onClick = createAudioPlayer(clickOnSource, false, clickVolume);
    offClick = createAudioPlayer(clickOffSource, false, clickVolume);
    $(linkElementClass).on({
      mouseover: function() {
        onClick.play();
      },
      mouseout: function() {
        offClick.play();
      }
    });

    //mouseover(function(){
      //myClick.play();
    //});

    // BUTTONS AND CLICKY THINGS

    $(ambientToggleID).click(function() {
      toggleAmbientAudio()
    });

    // TRANSITIONS
    //
    // Faux Pin
    function fauxPin(scrollControl, thisShotID, thisContentID, 
                     nextShotID, nextContentID) {
      pinnedWidth = parseInt($(thisShotID).parent().css("padding-left")) 
                    + parseInt($(thisShotID).parent().css("padding-right"))
                    + $(thisShotID).parent().width();
      var myScrollScene = new ScrollScene({
        triggerHook: 0,
        // faux pin starts as soon as we see this shot
        triggerElement: thisShotID,
        offset: 0,
        // faux pin long enough to include this shot's duration
        // plus transition + next shot's duration
        duration: pinnedWidth + 'px'
        // the faux pin doesn't actually expand the container the way 
        // SM does so the results are a little strange
      });
      // We do this convoluted function declaration because we our 
      // event handler needs to capture the current value of 
      // thisContentID and nextContentID 
      (function(thisShotID, thisContentID, nextShotID, nextContentID) {
          myScrollScene.on("start end", function (e) {
            // we want next shot to slide behind current shot
            $(thisShotID).css({zIndex: 2});
            $(thisContentID).css({left: 0, position:'fixed', zIndex: 2});
            $(nextShotID).css({zIndex: 1});
            $(nextContentID).css({left: 0, position:'fixed', zIndex: 1});
          });
      })(thisShotID, thisContentID, nextShotID, nextContentID);
      (function(thisShotID, thisContentID, nextShotID, nextContentID) {
          myScrollScene.on("enter leave", function (e) {
            // back to your regularly scheduled programming
            $(thisShotID).css({zIndex: 0});
            $(thisContentID).css({position:'relative', zIndex: 0});
            $(nextShotID).css({zIndex: 0});
            $(nextContentID).css({position:'relative', zIndex: 0});
          });
      })(thisShotID, thisContentID, nextShotID, nextContentID);
      myScrollScene.addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({
          zindex: 100, 
          suffix: 'faux-pin', 
          indent: 100
        });          
      }
    }

    // Dissolve
    function dissolve(scrollControl, thisShotID, thisContentID, duration) {
      if (debug) console.log("Dissolving:"+thisContentID
                   +" Trigger:"+nextShotID+" Offset:"+duration);
      // set Tween
      var myTween = TweenMax.to($(thisContentID), 1, {autoAlpha: 0});
      // dissolve this frame into next frame
      var myScrollScene = new ScrollScene({
        triggerElement: thisShotID,
        triggerHook: 0,
        // we don't start the dissolve until the duration of this 
        // shot expires
        offset: (duration * vw) + 'px',
        // This sets the rapidity of the dissolve
        duration: dissolveLength * vw + 'px'
        //duration: 1 * vw + 'px'
      })
        .setTween(myTween)
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({
          zindex: 100, 
          suffix: "dissolve",
          indent: 140
        });          
      }
    }

    // Fade
    function fade(scrollControl, thisShotID, thisContentID, nextShotID, 
                  nextContentID, duration) {
      if (debug) console.log("Fade:"+thisContentID+" & "+nextContentID
                   +" Trigger:"+nextShotID+" Offset:"+duration);
      // set Tween for fade to black from first element
      var myTween = TweenMax.to($(thisContentID), 1, {autoAlpha: 0});
      // dissolve this frame into next frame
      var myScrollScene = new ScrollScene({
        triggerElement: thisShotID,
        triggerHook: 0,
        // we don't start the dissolve until the duration of this 
        // shot expires
        offset: (duration * vw) + 'px',
        // This sets the rapidity of the dissolve
        duration: (dissolveLength/2) * vw + 'px'
      })
        .on("start end", function (e) {
          // set backgrounds
          //$(thisShotID).css({backgroundColor: 'black'});
          console.log("fade.on:thisShotID:"+thisShotID+" nextShotID:"+nextShotID);
          // this frame
          $(thisShotID).css({backgroundColor: 'black'});
          $(thisShotID).css({visibility: 'inherit'});
          // next frame
          $(nextShotID).css({backgroundColor: 'black'});
          $(nextContentID).css({opacity:0});
        })
        .setTween(myTween)
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({
          zindex: 100, 
          suffix: "fade1/2",
          indent: 140
        });          
      }
      // set Tween for fade from black to second element
      var myTween = TweenMax.to($(nextContentID), 1, {opacity: 1});
      // dissolve this frame into next frame
      var myScrollScene = new ScrollScene({
        triggerElement: thisShotID,
        triggerHook: 0,
        // we don't start the dissolve until the duration of this 
        // shot expires
        offset: ((duration + (dissolveLength/2)) * vw) + 'px',
        // This sets the rapidity of the dissolve
        duration: (dissolveLength/2) * vw + 'px'
      })
        .on("start end", function (e) {
          // set backgrounds
          //$(thisShotID).css({zIndex: 0});
          $(thisShotID).css({visibility: 'hidden'});
        })
        .setTween(myTween)
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({
          zindex: 100, 
          suffix: "fade2/2",
          indent: 180
        });          
      }
    }

    // Flare
    function flare(scrollControl, thisShotID, thisContentID, nextShotID, 
                  nextContentID, duration) {
      if (debug) console.log("Flare:"+thisContentID+" & "+nextContentID
                   +" Trigger:"+nextShotID+" Offset:"+duration);
      // set Tween for fade to white from first element
      //var myTween = TweenMax.to($(thisContentID), 1, {autoAlpha: 0});
      var myTween = TweenMax.to($(thisContentID), 1, {opacity: 0});
      // dissolve this frame into next frame
      var myScrollScene = new ScrollScene({
        triggerElement: thisShotID,
        triggerHook: 0,
        // we don't start the dissolve until the duration of this 
        // shot expires
        offset: (duration * vw) + 'px',
        // This sets the rapidity of the dissolve
        duration: (dissolveLength/2) * vw + 'px'
      });
      myScrollScene.on("start end", function (e) {
          // this frame
          $(thisShotID).css({backgroundColor: 'white'});
          $(thisShotID).css({visibility: 'inherit'});
          // next frame
          $(nextShotID).css({backgroundColor: 'white'});
          $(nextContentID).css({opacity:0});
        })
        .setTween(myTween)
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({
          zindex: 100, 
          suffix: "flare1/2",
          indent: 140
        });          
      }
      // set Tween for fade from white to second element
      var myTween = TweenMax.to($(nextContentID), 1, {opacity: 1});
      // dissolve this frame into next frame
      var myScrollScene = new ScrollScene({
        triggerElement: thisShotID,
        triggerHook: 0,
        // we don't start the dissolve until the duration of this 
        // shot expires
        offset: ((duration + (dissolveLength/2)) * vw) + 'px',
        // This sets the rapidity of the dissolve
        duration: (dissolveLength/2) * vw + 'px'
      })
        .on("start end", function (e) {
          // set backgrounds
          //$(thisShotID).css({zIndex: 0});
          $(thisShotID).css({visibility: 'hidden'});
        })
        .setTween(myTween)
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({
          zindex: 100, 
          suffix: "flare2/2",
          indent: 180
        });          
      }
    }

    // AUDIO
    //
    function toggleAmbientAudio() {
      if (audioOn) {
        $(ambientToggleID).removeClass('audio-on');
        audioOn = false;
        ambientSound.fade(ambientSound.volume(ambientSoundID), 0, ambientFadeTime, ambientSoundID);
      } else {
        $(ambientToggleID).addClass('audio-on');
        audioOn = true;
        //  we've given up pausing and just let it run at zero volume
        // we've given up pausing and just let it run at zero volume
        //ambientSound.volume(0);
        //ambientSound.play(ambientSoundID);
        ambientSound.fade(ambientSound.volume(ambientSoundID), ambientVolume, ambientFadeTime, ambientSoundID);
      }
    }

    function setSizing(thisShot, myShotID, myContentID) {
      // TODO: Add db fields: advanced > height, width, and sticky length
      // for now, we will assume that each shot fills the viewport
      //var contentHeight = "100vh"
      //var contentWidth = "100vw"
      $(myContentID).width(vw+vUnit);
      $(myContentID).height(vh+vUnit);
      // if not sticky, shot and content are the same size
      // if sticky, shot is longer than content
      $(myShotID).height(vh+vUnit);
      // this is unnecessary since scrollMagic magically takes care of this
      if (! thisShot.sticky) {
        var myWidth = vw;
      } else {
        //var myWidth = vw * stickyLength;
        var myWidth = vw;
      }
      //$(myShotID).width(myWidth+vUnit);
      $(myShotID).width(vw+vUnit);
      // Add width to total and resize entire doc-canvas
      // Note: While ScrollMagic takes care of adding duration/stickyLength
      // to the shot div, we need to add the stickyLength to the total
      // doc-canvas or it will be too short and act weird
      totalLength += myWidth * (stickyLength+1);
      $(docCanvasID).width(totalLength+vUnit);
      return(myWidth);
    }

    // CREATE SCROLL TRIGGERS

    function pinShot(controller, myWidth, myShotID, duration, pushFollowers) {
      // Pin section
      // For the first section, we pin it shortly
      var myScrollScene = new ScrollScene({
        triggerElement: myShotID,
        triggerHook: 0,
        offset: 0,
        //First shot needs to be pinned differently
        //duration: vw,
        //duration: myWidth+"vw",
        duration: vw * duration,
        //pushFollowers: true
      })
        .setPin(myShotID, {
          pushFollowers: pushFollowers
        })
        .addTo(controller);
      if (debug) {
        myScrollScene.addIndicators({suffix: myShotID});
      }
    }

    // CREATE IMAGE AND VIDEO

    function setFullscreenImage(thisShot, myContentID, myIDnum) {

      var myImageDiv = imageDiv.replace("%id", myIDnum);
      var myImageID = "#image-" + myIDnum;
      $(myContentID).append(myImageDiv);
      $(myImageID).attr('src', imageDir+thisShot.shotContent);

      // Replace backstretch for something simpler
      //$(myContentID).backstretch(imageDir+thisShot.shotContent);
    }

    function setFullscreenVideo(controller, thisShot, myContentID, myIDnum) {
      var myContent = thisShot.shotContent;
      var myOffset = thisShot.videoOptions.startTrigger;
      var myDuration = thisShot.videoOptions.duration;
      var myLoop = thisShot.videoOptions.videoLoop;
      var myVolume = thisShot.videoOptions.volume;
      var myVideoBase = myContent.replace(vidDefault, "");
      if (debug) {
        console.log("full screen video: "
          + " offset:"+myOffset + " duration:"+myDuration
          + " loop:"+myLoop + " source:"+myContent);
      }
      // defaults are set above
      myVideoSettings = $.extend({}, bigVideoDefaults, {
        container: $(myContentID),
        controls: false,
        doLoop: false,
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
      myBigVideo.getPlayer().volume(myVolume);
      // Trigger background video start and end (loop default)
      var myScrollScene = new ScrollScene({
        triggerHook: 0,
        triggerElement: myContentID,
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
      $(myContentID+" .vjs-text-track-display").remove();
      $(myContentID+" .vjs-big-play-button").remove();
      $(myContentID+" .vjs-control-bar").remove();
      $(myContentID+" .vjs-error-display").remove();
      $(myContentID+" .vjs-caption-settings").remove();
      if (myLoop) {
        $(myContentID+" .vjs-tech").attr('loop', 'loop');
      }
    }

    // CREATE AUDIO ELEMENTS

    function setAmbientAudio(ambientAudio) {
      // Background audio player
      var mySource = audioDir+ambientAudio.audioContent;
      // set a var usable elsewhere
      ambientVolume = ambientAudio.volume;
      // we are using howler.js for audio and set a var used elsewhere
      ambientSound = new Howl({
        src: [mySource],
        preload: true,
        autoplay: false,
        loop: true,
        volume: ambientVolume
      })
      // the first time we play the sound, we collect the ID returned
      ambientSoundID = ambientSound.play();
      // Sound event Handlers
      //
      // set a handler for the faded callback which is called when a fade completes
      // we only want to pause when we are fading *down* not up
      /*
      ambientSound.on("faded", function() { 
        if (!ambientSound.volume(ambientSoundID)) {
          ambientSound.pause(ambientSoundID) 
        } else {
          ambientSound.play(ambientSoundID) 
        }
      });
      */
      // the following is a loop workaround for a bug in chrome 
      // allegedly accounted for in howler 2.0.0-beta, the vers we are now using
      //ambientSound.on("end", function() {
        //this.play();
      //});
    }

    function setAudioElement(scrollControl, myAudio, myContentID, 
                             myTriggerID, negOffset) {
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
      // create sound player and sound, saving the ID for later
      var mySound = createAudioPlayer(mySource, myLoop, 0);
      // We play() because we need to get the ID number from HowlerJS
      // (since play() is assyncroness, we pause and reseek below)
      var mySoundID = mySound.play();
      //
      // Trigger background audio start and end
      indent = parseInt(myContentID.replace(/^.*\-/i, ""))+1;
      var myScrollScene = new ScrollScene({
        triggerElement: myTriggerID,
        triggerHook: 0,
        offset: vw * (myOffset - negOffset),
        duration: vw * myDuration,
      })
        .on("start end", function (e) {
          if (myFadein) {
            mySound.play(mySoundID);
            mySound.fade(mySound.volume(mySoundID), myVolume, soundFadeTime, mySoundID);
          } else {
            mySound.play(mySoundID);
          }
          //if (debug) {
            //console.log(myContentID+": Playing "+mySource+"   Hear it?");
          //}
        })
        .on("enter leave", function (e) {
          //mySound.pause();
          if (myFadein) {
            mySound.fade(mySound.volume(mySoundID), 0, soundFadeTime, mySoundID);
          } else {
            mySound.pause(mySoundID);
          }
          //mySound.pause();
          //if (debug) {
            //console.log(myContentID+": No longer playing "+mySource);
          //}
        })
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({suffix: myContentID, indent: 60 * indent});
      }
      // We pause and reseek to wait for the trigger
      mySound.pause(mySoundID);
      mySound.seek(0, mySoundID);
      // Sound event Handlers
      //
      // set a handler for the faded callback which is called when a fade completes
      // we only want to pause when we are fading *down* not up
      mySound.on("faded", function() { 
        if (!mySound.volume(mySoundID)) {
          mySound.pause(mySoundID) 
        } else {
          mySound.play(mySoundID);
        }
      });
      mySound.on("end", function() {
          if (!myLoop) {
            myScrollScene.destroy();
            mySound.volume(mySoundID);
            mySound.unload();
          }
          // the following is a loop workaround for a bug in chrome 
          // allegedly accounted for in howler 2.0.0-beta, the vers we are now using
          //else {
            //this.play();
          //}
      });
    }

    function createAudioPlayer(mySource, myLoop, myVolume) {
      return new Howl({
        src: [mySource],
        preload: true,
        autoplay: false,
        loop: myLoop,
        volume: myVolume
      });
    }

    // VISUAL ELEMENTS

    function setVisualElement(scrollControl, myVisual, myVisualDivID, 
                              myTriggerID, negOffset) {
      var myContent = myVisual.visualContent;
      var myType = myVisual.visualType;
      var myFullscreen = myVisual.fullscreen;
      var myZindex = myVisual.zIndex;
      var myCSSbase = myVisual.cssBase;
      myTarget = $(myVisualDivID)
      if (debug) {
        console.log("content:"+myContent
          +" type:"+myType+" z-index:"+myZindex
          +" css base:"+myCSSbase);
      }
      if (myType == "still") {
        myContent = imageDir+myContent;
        // Instead of putting image in div, replace div with image and give same id
        myTarget.replaceWith("<img id='"+myVisualDivID.replace('#','')
                             +"' src='"+myContent+"' />");
        // we do this again because it just changed
        myTarget = $(myVisualDivID)
      } else {
        myTarget.html(myContent);
      }
      if (myFullscreen) {
        myTarget.addClass("image-cover");
        // replace backstretch with something simpler
        //var parentID = myTarget.parent().attr('id');
        //var backgroundStyle = $('#'+parentID+" .backstretch").attr("style");
        //myTarget.attr("style", myTarget.attr("style") + "; " + backgroundStyle);
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
          setVisualTrans(scrollControl, thisTrans, visualID, 
                         thisShotID, negOffset);
        }
      }

    }

    function setVisualTrans(scrollControl, myTrans, myContentID, 
                            myTriggerID, negOffset) {
      // Trigger background visual start and end
      myOffset = myTrans.startTrigger;
      myDuration = myTrans.duration;
      myCSSend = CSSJSON.toJSON(myTrans.cssEnd).attributes;
      var myTween = TweenMax.to($(myContentID), 1, myCSSend);
      if (debug) {
        console.log("Trans "+myContentID+" offset: "+myOffset+" duration: "+myDuration);
      }
      myScrollScene = new ScrollScene({
        triggerElement: myTriggerID,
        triggerHook: 0,
        offset: vw * (myOffset - negOffset),
        duration: vw * myDuration,
        tweenChanges: true
      })
        .setTween(myTween)
        .addTo(scrollControl);
      if (debug) {
        myScrollScene.addIndicators({suffix: myContentID, indent: 60 * 8});
      }
    }

    // CREATE LINKS

    function createLink(link, linkWrapperID, linkIndex) {
      // Get link chapter from database
      var myPathNum = link.pathNumber;
      var myChapterNum = link.chapterNumber;
      if (myPathNum && myChapterNum) {
        var linkChapter = getChapterCollection(myPathNum, myChapterNum);
        if (linkChapter && linkChapter.release && !linkChapter.testing) {
          var linkPathName = linkChapter.pathName;
          var linkChapterName = linkChapter.chapterName;
          var linkDescription = linkChapter.description;
          var linkSlug = linkChapter.slug;
          var linkFeature = linkChapter.featureContent;
          //TODO: allow videos as features
          if (linkFeature) {
            // if we have a feature image, use its thumbnail
            var linkThumb = '/thumbs/'+linkFeature+'.jpg';
          } else {
            // otherwise, use the thumbnail of the first shot
            var linkThumb = '/thumbs/'+linkChapter.scenes[0].shots[0].shotContent+'.jpg';
          }
          // create the link div
          var myLinkElement = linkElementDiv.replace("%id", linkIndex);
          var linkID = linkElementID + linkIndex;
          $(linkWrapperID).append(myLinkElement);
          $(linkID).css('background-image', 'url('+linkThumb+')');
          $(linkID).on({
            click: function() {
              document.location = "/chapter/" + linkSlug + queryParams;
            },
            mouseover: function() {
              linkText = "<h2>" + linkPathName + "</h2>" +
                  "<h1>" + linkChapterName + "</h1>" +
                  "<p>" + linkDescription + "</p>";
              $(linkTextID).html(linkText);
              $(linkTextID).addClass("visible");
            },
            mouseout: function() {
              $(linkTextID).removeClass("visible");
            }
          });
        }
      }
    }

    // CREATE TITLES

    // create title and trigger for fade
    function setTitle(controller, myTriggerID, myContentID) {
      $(myContentID).append(titleWrapperDiv);
      $(titleWrapperID).append(titleBoxDiv);
      $(titleBoxID).html(chapter.chapterName);
      $(titleBoxID).fitText(0.7);
      var myTween = TweenMax.to($(titleWrapperID), 1, {opacity: -0.5, bottom: -vh/3});
      var myScrollScene = new ScrollScene({
        triggerElement: myTriggerID,
        triggerHook: 0,
        offset: 0,
        duration: vw * stickyLength,
        tweenChanges: true
      })
        .setTween(myTween)
        .addTo(controller)
    }

    // create scroll text and trigger for fade
    function setScrollText(controller, myTriggerID, myContentID) {
      $(myContentID).append(scrollBoxDiv);
      $(scrollBoxID).html("<img src='"+scrollImage+"' />");
      //$(scrollBoxID).addClass("fade");
      var myScrollScene = new ScrollScene({
        triggerElement: myTriggerID,
        triggerHook: 0,
        offset: -1,
        duration: 10
      })
        .on("leave end",function(){
          $(scrollBoxID).addClass("scroll-box-fade");
          // as a bonus we will also un-highlight
          $(ambientToggleID).removeClass("highlighted");
          $(burgerClass).removeClass("highlighted");
        })
        .addTo(controller);
      if (debug) {
        myScrollScene.addIndicators({suffix: "scrollBox", indent: 20});
      }
    }

    // COLLECTIONS

    function getChapterCollection(pathNum, chapterNum) {
      pathNum = parseInt(pathNum);
      chapterNum = parseInt(chapterNum);
      var item = ChapterCollection.findOne({
        pathNumber: pathNum,
        chapterNumber: chapterNum
      });
      if(typeof item == 'undefined'){
        return null;
      }
      else{
        return item;
      }
    };

    // KINDA HACKY THINGS

    function nextShot(scenes, sceneIndex, shots, shotIndex) {
      if (shotIndex + 1 < shots.length) {
        return shots[shotIndex + 1];
      }
      return scenes[sceneIndex + 1].shots[0];
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
