
Template.chapterform.rendered = function(){

  // set global default options
  JSONEditor.defaults.options.theme = 'bootstrap3';

  // initialize
  var element = document.getElementById('#chapterform');

  var editor = new JSONEditor(element, {
      "schema": {
        "id": "chapter",
        "type": "object",
        "title": "Chapter",
        "description": "This is an individual chapter",
        "name": "chapter",
        "properties": {
          "pathNumber": {
            "id": "pathNumber",
            "type": "integer",
            "minimum": 0,
            "title": "Path Number",
            "description": "Unique path id number",
            "name": "path Number",
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
            "description": "Unique chapter id number",
            "name": "chapter Number",
          },
          "chapterName": {
            "id": "chapterName",
            "type": "string",
            "minLength": 0,
            "title": "Chapter Name",
            "description": "Name for this chapter",
            "name": "chapter Name"
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
              "description": "Individual scene within this chapter",
              "name": "0",
              "properties": {
                "sceneNumber": {
                  "id": "sceneNumber",
                  "type": "integer",
                  "multipleOf": 1,
                  "minimum": 0,
                  "title": "Scene Number",
                  "description": "Unique scene id number",
                  "name": "scene Number",
                },
                "sceneName": {
                  "id": "sceneName",
                  "type": "string",
                  "minLength": 0,
                  "title": "Scene Name",
                  "description": "Unique scene name",
                  "name": "scene Name",
                },
                "shots": {
                  "id": "shots",
                  "type": "array",
                  "minItems": 1,
                  "uniqueItems": false,
                  "additionalItems": true,
                  "title": "Shots",
                  "description": "Here are the shots within this chapter",
                  "name": "shots",
                  "items": {
                    "id": "0",
                    "type": "object",
                    "additionalProperties": true,
                    "title": "Shot",
                    "description": "Individual shot within this chapter",
                    "name": "0",
                    "properties": {
                      "shotNumber": {
                        "id": "shotNumber",
                        "type": "integer",
                        "multipleOf": 1,
                        "minimum": 0,
                        "title": "Shot Number",
                        "description": "Unique shot id number",
                        "name": "shot Number",
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
                        "default": true
                      },
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
                      "audioElements": {
                        "id": "audioElements",
                        "type": "array",
                        "minItems": 0,
                        "title": "Audio Elements",
                        "description": "The audio elements that apply to this chapter.",
                        "name": "audio Elements",
                        "items": {
                          "id": "0",
                          "type": "object",
                          "title": "Audio Element",
                          "description": "An individual audio element for this chapter.",
                          "name": "0",
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
                            }
                          },
                          "required": [
                            "audioContent",
                            "audioType",
                            "startTrigger",
                            "duration",
                            "volume"
                          ]
                        }
                      },
                      "visualElements": {
                        "id": "visualElements",
                        "type": "array",
                        "minItems": 0,
                        "title": "Visual Elements",
                        "description": "All of the visual elements that apply to this shot. Leave blank to add no additional elements.",
                        "name": "visual Elements",
                        "items": {
                          "id": "0",
                          "type": "object",
                          "title": "Visual Element",
                          "description": "An individual visual element that makes up the shot",
                          "name": "0",
                          "properties": {
                            "visualContent": {
                              "id": "visualContent",
                              "type": "string",
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
                              "title": "css Base",
                              "description": "Base css of element (for position, size, scale, opacity, etc.)",
                              "name": "css Base",
                            },
                            "transitions": {
                              "id": "transitions",
                              "type": "array",
                              "minItems": 0,
                              "title": "Transitions",
                              "description": "Transitions for this element (Leave blank to move with shot)",
                              "name": "transitions",
                              "items": {
                                "id": "0",
                                "type": "object",
                                "title": "Transition",
                                "description": "Transion for this visual element",
                                "name": "0",
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
                                    "title": "css Start",
                                    "description": "Start css of element (for position, size, scale, opacity, etc.)",
                                    "name": "css Start",
                                  },
                                  "cssEnd": {
                                    "id": "cssEnd",
                                    "type": "string",
                                    "format": "textarea",
                                    "title": "css End",
                                    "description": "End css of element (for position, size, scale, opacity, etc.)",
                                    "name": "css End",
                                  }
                                },
                                "required": [
                                  "transitionType",
                                  "startTrigger",
                                  "duration"
                                ]
                              }
                            }
                          },
                          "required": [
                            "visualContent",
                            "visualType",
                            "zIndex"
                          ]
                        }
                      }
                    },
                    "required": [
                      "shotNumber",
                      "shotContent",
                      "shotType",
                      "transitionType"
                    ]
                  }
                }
              },
              "required": [
                "sceneNumber",
                "sceneName"
              ]
            }
          }
        },
        "required": [
          "pathNumber",
          "pathName",
          "chapterNumber",
          "chapterName"
        ]
      }
    });
};
