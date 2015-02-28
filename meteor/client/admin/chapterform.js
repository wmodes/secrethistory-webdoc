debug = 1;


Template.chapterform.rendered = function(){

    // Initialize the editor with a JSON schema
    jsonEditor = new JSONEditor(document.getElementById('editor_holder'),{
        "theme": "bootstrap3",
        "iconlib": "fontawesome4",
        "required_by_default": true,

        "schema": {
          "id": "chapter",
          "type": "object",
          "title": "Chapter",
          "description": "This defines a single chapter",
          "name": "chapter",
          "format": "grid",
          "options": {
            "grid_columns": 2
          },
          "properties": {
            "pathNumber": {
              "id": "pathNumber",
              "type": "integer",
              "minimum": 0,
              "title": "Path Number",
              "description": "Path ID number",
              "name": "path Number"
            },
            "pathName": {
              "id": "pathName",
              "type": "string",
              "minLength": 0,
              "title": "Path Name",
              "description": "Name for this path",
              "name": "path Name"
            },
            "chapterNumber": {
              "id": "chapterNumber",
              "type": "integer",
              "minimum": 0,
              "title": "Chapter Number",
              "description": "Chapter ID number",
              "name": "chapter Number"
            },
            "chapterName": {
              "id": "chapterName",
              "type": "string",
              "minLength": 0,
              "title": "Chapter Name",
              "description": "Name for this chapter",
              "name": "chapter Name"
            },
            "ambientAudio": {
              "type": "object",
              "title": "Ambient Audio",
              "description": "(Optional) Ambient audio loop that will play during the entire chapter",
              "format": "grid",
              "options": {
                "collapsed": true,
                "disable_edit_json": true,
                "disable_properties": true,
                "grid_columns": 2
              },
              "properties": {
                "audioContent": {
                  "id": "audioContent",
                  "type": "string",
                  "title": "Audio Content",
                  "description": "Filename of audio file",
                  "name": "audio Content"
                },
                "volume": {
                  "id": "volume",
                  "type": "number",
                  "maximum": 1,
                  "minimum": 0,
                  "title": "Volume",
                  "description": "Volume of this audio element [0-1]",
                  "name": "start Volume",
                  "default": 1
                }
              }
            },
            "scenes": {
              "id": "scenes",
              "type": "array",
              "minItems": 1,
              "uniqueItems": false,
              "additionalItems": true,
              "title": "Scenes",
              "description": "Here are the scenes within this chapter",
              "name": "scenes",
              "items": {
                "id": "0",
                "type": "object",
                "additionalProperties": true,
                "title": "Scene",
                "name": "0",
                "format": "grid",
                "options": {
                  "disable_edit_json": true,
                  "disable_properties": true,
                  "grid_columns": 2
                },
                "properties": {
                  "sceneNumber": {
                    "id": "sceneNumber",
                    "type": "integer",
                    "multipleOf": 1,
                    "minimum": 0,
                    "title": "Scene Number",
                    "description": "Unique scene id number",
                    "name": "scene Number"
                  },
                  "sceneName": {
                    "id": "sceneName",
                    "type": "string",
                    "minLength": 0,
                    "title": "Scene Name",
                    "description": "Unique scene name",
                    "name": "scene Name"
                  },

                  "shots": {
                    "id": "shots",
                    "type": "array",
                    "minItems": 1,
                    "additionalItems": true,
                    "title": "Shots",
                    "description": "Here are the shots within this scene",
                    "name": "shots",
                    "items": {
                      "id": "0",
                      "type": "object",
                      "additionalProperties": true,
                      "title": "Shot",
                      "name": "0",
                      "format": "grid",
                      "options": {
                        "grid_columns": 2
                      },
                      "properties": {

                        "shotNumber": {
                          "id": "shotNumber",
                          "type": "integer",
                          "multipleOf": 1,
                          "minimum": 0,
                          "title": "Shot Number",
                          "description": "Unique shot id number",
                          "name": "shot Number"
                        },
                        "shotContent": {
                          "id": "shotContent",
                          "type": "string",
                          "minLength": 0,
                          "title": "Shot Content",
                          "description": "Filename of shot",
                          "name": "Shot Content"
                        },
                        "shotType": {
                          "id": "shotType",
                          "type": "string",
                          "minLength": 0,
                          "title": "Shot Type",
                          "description": "What type of visual element is this? [still, video]",
                          "enum": [
                            "still",
                            "video"
                          ],
                          "name": "shot Type"
                        },
                        "sticky": {
                          "id": "sticky",
                          "type": "boolean",
                          "format": "checkbox",
                          "title": "Sticky",
                          "description": "Stays visible when page scrolls?",
                          "name": "Sticky",
                          "default": true,
                        },
                        "transitionType": {
                          "id": "transitionType",
                          "type": "string",
                          "minLength": 0,
                          "title": "Transition Type",
                          "description": "What type of transition is this? [cut, fade, flare, push, wipe, cut, pan, split, focus, animate",
                          "enum": [
                            "push",
                            "cut",
                            "fade",
                            "flare",
                            "wipe",
                            "cut",
                            "pan",
                            "split",
                            "focus",
                            "animate"
                          ],
                          "name": "transition Type"
                        },
                        
                        "videoOptions": {
                          "type": "object",
                          "title": "Video Options",
                          "description": "Set these video options for type 'video' (Click the expand arrow above)",
                          "format": "grid",
                          "options": {
                            "collapsed": true,
                            "grid_columns": 2
                          },
                          "properties": {
                            "videoLoop": {
                              "id": "videoLoop",
                              "type": "string",
                              "minLength": 0,
                              "title": "Loop (Video Only)",
                              "description": "Loop or played once?",
                              "name": "Video Loop",
                              "enum": [
                                "once",
                                "loop"
                              ]
                            },
                            "startTrigger": {
                              "id": "startTrigger",
                              "type": "number",
                              "title": "Start Trigger (Video Only)",
                              "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                              "name": "start Trigger",
                              "default": 0
                            },
                            "duration": {
                              "id": "duration",
                              "type": "number",
                              "title": "Duration (Video Only)",
                              "description": "Duration of shot (winUnits. 0.5=half, 2=two screens)",
                              "name": "Duration",
                              "minimum": 0,
                              "default": 1
                            }
                          }
                        },

                        "audioElements": {
                          "id": "audioElements",
                          "type": "array",
                          "minItems": 0,
                          "title": "Audio Elements",
                          "description": "Audio elements for this shot (Click +Audio Element button below to add)",
                          "name": "audio Elements",
                          "items": {
                            "id": "0",
                            "type": "object",
                            "title": "Audio Element",
                            "name": "0",
                            "format": "grid",
                            "options": {
                              "grid_columns": 2
                            },
                            "properties": {
                              "audioContent": {
                                "id": "audioContent",
                                "type": "string",
                                "title": "Audio Content",
                                "description": "Filename of audio file",
                                "name": "audio Content"
                              },
                              "audioType": {
                                "id": "audioType",
                                "type": "string",
                                "minLength": 0,
                                "title": "Audio Type",
                                "description": "Loop or played once?",
                                "name": "audio Type",
                                "enum": [
                                  "once",
                                  "loop"
                                ]
                              },
                              "startTrigger": {
                                "id": "startTrigger",
                                "type": "number",
                                "title": "Start Trigger",
                                "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                                "name": "start Trigger",
                                "default": 0
                              },
                              "duration": {
                                "id": "duration",
                                "type": "number",
                                "title": "Duration",
                                "description": "Duration of shot (winUnits. 0.5=half, 2=two screens)",
                                "name": "Duration",
                                "minimum": 0,
                                "default": 1
                              },
                              "volume": {
                                "id": "volume",
                                "type": "number",
                                "maximum": 1,
                                "minimum": 0,
                                "title": "Volume",
                                "description": "Volume of this audio element [0-1]",
                                "name": "start Volume",
                                "default": 1
                              },
                              "fadeIn": {
                                "id": "fadeIn",
                                "type": "boolean",
                                "title": "Fade In/Out",
                                "description": "Should this audio element fade in/out?",
                                "name": "fade In/Out",
                                "default": true
                              }
                            },
                            "required": [
                              "audioContent",
                              "audioType",
                              "startTrigger",
                              "duration",
                              "volume",
                              "fadeIn"
                            ]
                          }
                        },

                        "visualElements": {
                          "id": "visualElements",
                          "type": "array",
                          "minItems": 0,
                          "title": "Visual Elements",
                          "description": "Visual elements for this shot (Click +Add Visual Element button below to add)",
                          "name": "visual Elements",
                          "items": {
                            "id": "0",
                            "type": "object",
                            "title": "Visual Element",
                            "name": "0",
                            "format": "grid",
                            "options": {
                              "grid_columns": 2
                            },
                            "properties": {
                              "visualContent": {
                                "id": "visualContent",
                                "type": "string",
                                "format": "textarea",
                                "options": {
                                  "expand_height": true,
                                  "input_height": "24pt"
                                },
                                "minLength": 0,
                                "title": "Visual Content",
                                "description": "Filename or HTML",
                                "name": "visual Content"
                              },
                              "visualType": {
                                "id": "visualType",
                                "type": "string",
                                "minLength": 0,
                                "title": "Visual Type",
                                "description": "What type of visual element is this? [still, html]",
                                "enum": [
                                  "still",
                                  "html"
                                ],
                                "name": "element Type"
                              },
                              "zIndex": {
                                "id": "zIndex",
                                "type": "number",
                                "title": "Z-Index",
                                "description": "Depth level - pos numbers move forward, neg move back",
                                "name": "Z-Index",
                                "default": 0
                              },
                              "cssBase": {
                                "id": "cssBase",
                                "type": "string",
                                "format": "textarea",
                                "options": {
                                  "expand_height": true
                                },
                                "title": "css Base",
                                "description": "Base css of element (for position, size, scale, opacity, etc.)",
                                "name": "css Base"
                              },
                              "transitions": {
                                "id": "transitions",
                                "type": "array",
                                "minItems": 0,
                                "title": "Transitions",
                                "description": "Transitions for this element (Click +Transition button below to add)",
                                "name": "transitions",
                                "items": {
                                  "id": "0",
                                  "type": "object",
                                  "title": "Transition",
                                  "description": "Transion for this visual element",
                                  "name": "0",
                                  "format": "grid",
                                  "options": {
                                    "grid_columns": 2
                                  },
                                  "properties": {
                                    "transitionType": {
                                      "id": "transitionType",
                                      "type": "string",
                                      "minLength": 0,
                                      "title": "Transition Type",
                                      "description": "What type of transition is this?",
                                      "enum": [
                                        "push",
                                        "cut",
                                        "fade",
                                        "flare",
                                        "wipe",
                                        "cut",
                                        "pan",
                                        "split",
                                        "focus",
                                        "animate"
                                      ],
                                      "name": "transition Type"
                                    },
                                    "startTrigger": {
                                      "id": "startTrigger",
                                      "type": "number",
                                      "title": "Start Trigger",
                                      "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                                      "name": "start Trigger",
                                      "default": 0
                                    },
                                    "duration": {
                                      "id": "duration",
                                      "type": "number",
                                      "title": "Duration",
                                      "description": "Duration of transition (winUnits. 0.5=half, 2=two screens)",
                                      "name": "Duration",
                                      "minimum": 0,
                                      "default": 1
                                    },
                                    "cssStart": {
                                      "id": "cssStart",
                                      "type": "string",
                                      "format": "textarea",
                                      "options": {
                                        "expand_height": true
                                      },
                                      "expand_height": true,
                                      "title": "css Start",
                                      "description": "Start css of element (for position, size, scale, opacity, etc.)",
                                      "name": "css Start"
                                    },
                                    "cssEnd": {
                                      "id": "cssEnd",
                                      "type": "string",
                                      "format": "textarea",
                                      "options": {
                                        "expand_height": true
                                      },
                                      "expand_height": true,
                                      "title": "css End",
                                      "description": "End css of element (for position, size, scale, opacity, etc.)",
                                      "name": "css End"
                                    }
                                  },
                                  "required": [
                                    "transitionType",
                                    "startTrigger",
                                    "duration",
                                    "cssStart",
                                    "cssEnd"
                                  ]
                                }
                              }
                            },
                            "required": [
                              "visualContent",
                              "visualType",
                              "zIndex",
                              "cssBase",
                              "transitions"
                            ]
                          }
                        }

                      },
                      "required": [
                        "shotNumber",
                        "shotContent",
                        "shotType",
                        "sticky",
                        "transitionType",
                        "videoOptions",
                        "audioElements",
                        "visualElements"
                      ]

                    }
                  }
                },
                "required": [
                  "sceneNumber",
                  "sceneName",
                  "shots"
                ]
              }
            }
          },
          "required": [
            "pathNumber",
            "pathName",
            "chapterNumber",
            "chapterName",
            "ambientAudio",
            "scenes"
          ]
        }

    });

    // Watch fields

    $("div[data-schemaid='pathNumber'] input").change(function(){
        var pathNum = parseInt($(this).val());
        var chapterNum = parseInt($("div[data-schemaid='chapterNumber'] input").val());
        checkConflict(pathNum, chapterNum);
    });

    $("div[data-schemaid='chapterNumber'] input").change(function(){
        var chapterNum = parseInt($(this).val());
        var pathNum = parseInt($("div[data-schemaid='pathNumber'] input").val());
        checkConflict(pathNum, chapterNum);
    });

    function checkConflict(pathNum, chapterNum) {
        // First, we wouldn't be here if either pathNumber of chapterNumber weren't changed
        // If we don't have both, then we can't do anything, so return
        if (pathNum && chapterNum) {
            var chapter = getChapter(pathNum, chapterNum);
            if (chapter) {
                reportConflict(pathNum, chapter.pathName, chapterNum, chapter.chapterName);
            }
        }
    }

    function reportConflict(pathNum, pathName, chapterNum, chapterName){
        bootbox.alert({
          title: "Conflict",
          message:
              "<span class='error'>"+
              "<h3>Chapter already exists</h3><br>"+
              "Path Number: "+pathNum+" "+pathName+"<br>"+
              "Chapter Number: "+chapterNum+" "+chapterName+"<br><br>"+
              "Cannot save. Search for this chapter instead."+
              "</span>"
        });
    }

    // if we select shot type video, uncollapse video options
    $("div[data-schemaid='shotType'] select").change(function(){
    //$("div[data-schemaid='shotType'] div select").on("change", function(){
        schemapath = $("div[data-schemapath$='shotType'] select")
            .parent().parent("div[data-schemapath$='shotType']")
            .attr('data-schemapath');
        schemapath=schemapath.replace("shotType","");
        console.log("changed. schemapath: "+schemapath);
        if(this.value === 'video') { 
            console.log("changed to video. schemapath: "+schemapath);
            $("div [data-schemapath='"+schemapath+"videoOptions'] div.well")
                .css("display", "block");
        }
        else { 
            console.log("changed to still. schemapath: "+schemapath);
            $("div [data-schemapath='"+schemapath+"videoOptions'] div.well")
                .css("display", "none");
        }
    });

    // Search Button
    //
    $(".search-button").click(function() {
        // Get the value from the editor
        pathNum = parseInt($("#path-num").val());
        chapterNum = parseInt($("#chapter-num").val());
        if (debug) {
            console.log("PathNumber: "+pathNum+" ChapterNumber: "+chapterNum);
        }
        // Get chapter from collection
        var myChapter = getChapter(pathNum, chapterNum);
        // if search results are positive
        if (myChapter) {
            // get the document id assigned by mongo
            var id = myChapter._id;
            // if the id is an object, the id string is _id._str. Why? Not sure.
            if (typeof id == "object") {
                if (typeof id._str == "string") {
                    id = id._str;
                }
            }
            // separate the id from the document, otherwise we can't update
            delete myChapter._id;
            $("#search-results").html("<span class='info'>Chapter retreived: "+id+"</span>");
            // make the pathNum and chapterNum readonly
            protectIndexNumbers();
            // write the object to the json editor
            jsonEditor.setValue(myChapter);
            // write id to the session
            Session.set('current_id', id);
        } else {
            $("#search-results").html("<span class='error'>Chapter not found.</span>");
        }
    });

    function protectIndexNumbers() {
        // make fields readonly
        $("div [data-schemapath='root.pathNumber'] input").attr("readonly", true);
        $("div [data-schemapath='root.chapterNumber'] input").attr("readonly", true);
    }

    // Submit Button
    //
    $(".submit-button").click(function() {
        saveChapter()
    });

    // Collections

    function getChapter(pathNum, chapterNum) {
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

    function saveChapter() {
        // get current document from form editor
        var myChapter = jsonEditor.getValue();
        // get id if we have one
        myid = Session.get('current_id');
        if (debug) {
            console.log(myChapter);
            console.log(myid);
        }
        // if we have an id, then this in an update
        if (myid) {
            ChapterCollection.update(myid, { 
                $set: myChapter
            });
        // if we don't have an id, this is an insert
        } else {
            // Make sure we are not overwriting an existing record
            if (getChapter(myChapter.pathNumber,myChapter.chapterNumber)) {
                // alert about conflict
                reportConflict(myChapter.pathNumber, myChapter.pathName,
                    myChapter.chapterNumber, myChapter.chapterName);
                return;
            } else {
                // insert document in collection and save returned id
                myid = ChapterCollection.insert(myChapter);
                Session.set('current_id', myid);
                // Make pathNumber and chapterNUmber readonly
                protectIndexNumbers();
            }
        }
        bootbox.alert({
            title: "Saved",
            message:
                "<h3>Chapter saved</h3><br>"+
                "Path Number: "+myChapter.pathNumber+" "+myChapter.pathName+"<br>"+
                "Chapter Number: "+myChapter.chapterNumber+" "+myChapter.chapterName+"<br><br>"+
                "The chapter is recorded in the database."
        });
    };

};
