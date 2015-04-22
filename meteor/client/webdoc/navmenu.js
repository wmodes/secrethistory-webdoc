
// Secret History of American River People
//
//

Template.navmenu.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe('ChapterCollection');
});


//Template.navmenu.rendered = function() {


Template.navmenu.onRendered(function () {

  var debug = true;

  // Constants
  //
  var titleID = '#navmenu-title';
  var keyID = '#navmenu-key';
  var waypointWrapperID = '#navmenu-waypoints';
  var realRadius = 22;
  var roomyRadius = 33;
  var cardMargin = 10;
  var cardHeight = 300;

  // Globals
  var circleList = [];
  var newChapterArray = [];

  // Render modal but hide it
  $('#navmenu').modal('hide');

  // Hide nav elements until revealaed
  $('#mapburger').on("click", function() {
    //renderNavmenu();
  //}
  //
  //function renderNavmenu() {
    $('#navmenu').modal('show');
    //
    // We only want to do this once, so if it's already been done. skip
    if (!circleList.length) {
      // Load all chapters from collections
      //
      chapterArray = ChapterCollection.find().fetch();
      if (debug) console.log(chapterArray);
      //
      // Go through each of the chapters
      // * Filter out incomplete or testing ones
      // * Clasify them
      var chapterCount = 0;
      for (var chapterIndex = 0; chapterIndex < chapterArray.length; chapterIndex++) {
        var thisChapter = chapterArray[chapterIndex];
        if (debug) console.log(thisChapter);
        if (debug) console.log("Navmap:chapter:"+thisChapter.pathNumber+","+
                               thisChapter.chapterNumber);
        // If "testing" or incomplete, ignore this chapter
        if (thisChapter.testing || incompleteChapter(thisChapter)) {
          if (debug) console.log("\ttesting or incomplete");
          continue;
        } else if (thisChapter.release) {
          // if released, have we been there?
          if (chapterVisited(thisChapter.pathNum, thisChapter.chapterNum)) {
            var thisType = "visited";
          } else {
            var thisType = "ready";
          }
        } else {
          // or is this chapter not released yet (but also not testing)
          var thisType = "future";
        }
        thisChapter.type = thisType;
        newChapterArray.push(thisChapter);
      }
      //
      // Update count on page
      $('#navmenu-title #numberofchapters').html(newChapterArray.length);

      setTimeout(function() {
        var navBox = {x: 0,
                      y: 0,
                      w: $(waypointWrapperID).width(),
                      h: $(waypointWrapperID).height()
        }
        if (debug) {
          console.log("navBox, as seen right now:");
          console.log(navBox);
        }
        var titleBox = {x: $(titleID).position().left,
                        y: $(titleID).position().top,
                        w: $(titleID).width(),
                        h: $(titleID).height()
        }
        if (debug) {
          console.log("titleBox, as seen right now:");
          console.log(titleBox);
        }
        var keyBox = {x: $(keyID).position().left,
                      y: $(keyID).position().top,
                      w: $(keyID).width(),
                      h: $(keyID).height()
        }
        if (debug) {
          console.log("keyBox, as seen right now:");
          console.log(keyBox);
        }

        // Go through each of the chapters
        // * Pick a random location for their icon
        // TODO: Save these random locations to user storage for consistency
        for (var chapterIndex = 0; chapterIndex < newChapterArray.length; chapterIndex++) {
          var thisChapter = newChapterArray[chapterIndex];
          // Pick coordinates
          var thisCircle = pickCoordinate(navBox.w, navBox.h, roomyRadius, 
                                          circleList, [titleBox, keyBox], navBox);
          if (debug) console.log(thisCircle);
          // save the coordinates
          circleList.push(thisCircle);
          if (debug) console.log("\tCoordinates:"+thisCircle.x+","+
                                 thisCircle.y+" (r="+thisCircle.r+")");
          createWaypoint(thisCircle.x, thisCircle.y, thisCircle.r, 
                         chapterIndex, newChapterArray[chapterIndex], navBox);
        }
        console.log(circleList);

      }, 1000);

    }

  });

  function createWaypoint(x, y, r, index, myChapter, navBox) {
    // construct ID
    waypointID = "#waypoint-"+index;
    cardID = "#card-"+index;
    // add div to navmenu
    $(waypointWrapperID).append("<div id='waypoint-"+index+"' "+
                                "class='waypoint "+myChapter.type+"'>"+
                                "<div id='card-"+index+"' "+
                                "class='card "+myChapter.type+"'>");
    // apply position css
    $(waypointID).css({position: "absolute",
                           left: x - r, 
                           top: y - r});
    if (x <= navBox.w/2) {
      $(cardID).css({position: "absolute",
                             left: r*2 + cardMargin, 
                             top: r*2 - cardHeight/2});
    } else {
      $(cardID).css({position: "absolute",
                             right: r*2 + cardMargin, 
                             top: r*2 - cardHeight/2});
    }
    // Get thumbnail
    if (myChapter.featureContent) {
      // if we have a feature image, use its thumbnail
      var chapterThumb = '/thumbs/'+myChapter.featureContent+'.jpg';
    } else if (myChapter.scenes[0].shots[0].shotContent) {
      // otherwise, use the thumbnail of the first shot
      var chapterThumb = '/thumbs/'+myChapter.scenes[0].shots[0].shotContent+'.jpg';
    } else {
      var chapterThumb = null;
    }
    if (chapterThumb) {
      cardImage =
        "<div class='image-wrap'>\n"+
        "<img src='"+chapterThumb+"' />\n"+
        "</div>";
    } else {
      cardImage = "";
    }

    console.log(myChapter);
    // Depending on type, the cards are formatted differently
    if (myChapter.type == "future") {
      // put content in card
      $(cardID).append( 
        "<h4>"+myChapter.pathName+"</h4>\n"+
          cardImage+
        "<h3>"+myChapter.chapterName+"</h3>\n"+
        "</a>"+
        "<p>" +myChapter.description+"</p>\n"+
        "<p><i>(Coming soon)</i></p>"
      );
    } else {
      // put content in card
      $(cardID).append( 
        "<a href='/chapter/"+myChapter.slug+"'>"+
        "<h4>"+myChapter.pathName+"</h4>\n"+
          cardImage+
        "<h3>"+myChapter.chapterName+"</h3>\n"+
        "</a>"+
        "<p>" +myChapter.description+"</p>\n"+
        "<p><a class='link' href='/chapter/"+myChapter.slug+"'>link</a></p>"
      );
    }
  }

  function hitsBorder(box, x, y, r) {
    return (x - r <= box.x || x + r >= box.x + box.w ||
            y - r <= box.y || y + r >= box.y + box.h)
  }

  function hitsBox(box, x, y, r) {
    var xCollide = false;
    var yCollide = false;
    // if the x coord is within the x boundaries
    if (x >= box.x && x <= box.x + box.w) {
      xCollide = true;
    // if we are edging into the right side
    } else if (x < box.x && x + r >= box.x) {
      xCollide = true;
    // if we are edging into the left side
    } else if (x > box.x + box.w && x - r <= box.x + box.w) {
      xCollide = true;
    } 
    // if the y coord is within the y boundaries
    if (y >= box.y && y <= box.y + box.h) {
      yCollide = true;
    // if we are edging into the top side
    } else if (y < box.y && y + r >= box.y) {
      yCollide = true;
    // if we are edging into the bottom side
    } else if (y > box.y + box.h && y - r <= box.y + box.h) {
      yCollide = true;
    } 
    // if both are true we have a collision
    return xCollide && yCollide;
  }

  function hitsCircle(circleList, x, y, r) {
    for (var circleIndex = 0; circleIndex < circleList.length; circleIndex++) {
      dist = Math.sqrt(Math.pow(x - circleList[circleIndex].x, 2) +
                       Math.pow(y - circleList[circleIndex].y, 2));
      return (dist <= r + circleList[circleIndex].r);
    }
  }

  function pickCoordinate(w, h, r, circleList, boxList, navBox) {
    // keep a count just because theoretically we could look for a coordinate forever
    for (count=0; count < 50; count++) {
      x = Math.round(Math.random() * w);
      y = Math.round(Math.random() * h);
      if (debug) console.log("Try "+count+": "+x+","+y);
      // check for box collisions
      var boxCollide = false;
      for (i = 0;i < boxList.length; i++) {
        if (debug) {
          console.log("Checking for box collision");
          console.log(boxList[i]);
        }
        if (hitsBox(boxList[i], x, y, r)) {
          boxCollide = true;
          break;
        }
      }
      if (boxCollide) {
        continue;
      }
      // check for border collisions
      if (hitsBorder(navBox, x, y, r)) {
        continue;
      }
      // check for circle collisions
      if (hitsCircle(circleList, x, y, r)) {
        continue;
      }
      break;
    }
    return {x: x, y: y, r: r};
  }

  function incompleteChapter(myChapter) {
    return (!myChapter.pathName || 
            !myChapter.chapterName ||
            !myChapter.slug ||
            !myChapter.description)
  }

  function chapterVisited(pathNum, chapterNum) {
    // TODO: Save and check for visited chapters
    return false;
  }


});
