
Template.chapterform.rendered = function(){

      $('#chapterform').jsonForm(

{
    "schema": {
        "id": "chapter",
        "type": "object",
        "title": "Chapter",
        "description": "This is an individual chapter",
        "name": "chapter",
        "properties": {
            "chapterNumber": {
                "id": "chapterNumber",
                "type": "integer",
                "minimum": 0,
                "title": "Chapter Number",
                "description": "Unique chapter id number",
                "name": "chapter Number",
                "default": 0
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
                            "default": 0
                        },
                        "sceneName": {
                            "id": "sceneName",
                            "type": "string",
                            "minLength": 0,
                            "title": "Scene Name",
                            "description": "Unique scene name",
                            "name": "scene Name",
                            "default": ""
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
                                        "default": 0
                                    },
                                    "shotName": {
                                        "id": "shotName",
                                        "type": "string",
                                        "minLength": 0,
                                        "title": "Shot Name",
                                        "description": "Unique shot name",
                                        "name": "shot Name",
                                        "default": ""
                                    },
                                    "shotType": {
                                        "id": "shotType",
                                        "type": "string",
                                        "minLength": 0,
                                        "title": "Shot Type",
                                        "description": "What type of visual element is this? [still, video, html]",
                                        "enum": [
                                            "",
                                            "still",
                                            "video"
                                        ],
                                        "name": "shot Type"
                                    },
                                    "shotContent": {
                                        "id": "shotContent",
                                        "type": "string",
                                        "minLength": 0,
                                        "title": "Shot Content",
                                        "description": "Filename of shot",
                                        "name": "Shot Content"
                                    },
                                    "transitionType": {
                                        "id": "transitionType",
                                        "type": "string",
                                        "minLength": 0,
                                        "title": "Transition Type",
                                        "description": "What type of transition is this? [cut, fade, flare, push, wipe, cut, pan, split, focus, animate",
                                        "enum": [
                                            "",
                                            "cut",
                                            "fade",
                                            "flare",
                                            "push",
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
                                                "elementName": {
                                                    "id": "elementName",
                                                    "type": "string",
                                                    "title": "Element Name",
                                                    "description": "Unique name of this audio file",
                                                    "name": "element Name"
                                                },
                                                "content": {
                                                    "id": "content",
                                                    "type": "string",
                                                    "title": "Content",
                                                    "description": "Filename of audio file",
                                                    "name": "content"
                                                },
                                                "elementType": {
                                                    "id": "elementType",
                                                    "type": "string",
                                                    "minLength": 0,
                                                    "title": "Element Type",
                                                    "description": "Loop or played once?",
                                                    "name": "element Type",
                                                    "enum": [
                                                        "",
                                                        "loop",
                                                        "once"
                                                    ]
                                                },
                                                "startTrigger": {
                                                    "id": "startTrigger",
                                                    "type": "number",
                                                    "title": "Start Trigger",
                                                    "description": "Relative to start of shot (winUnits. 0=start, 0.5=half. Can be negative)",
                                                    "name": "start Trigger"
                                                },
                                                "duration": {
                                                    "id": "duration",
                                                    "type": "number",
                                                    "title": "End Trigger",
                                                    "description": "Duration of shot (winUnits. 0.5=half, 2=two screens)",
                                                    "name": "end Trigger",
                                                    "minimum": 0
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
                                                "elementName": {
                                                    "id": "elementName",
                                                    "type": "string",
                                                    "minLength": 0,
                                                    "title": "Element Name",
                                                    "description": "Unique name for this element",
                                                    "name": "element Name"
                                                },
                                                "elementContent": {
                                                    "id": "elementContent",
                                                    "type": "string",
                                                    "minLength": 0,
                                                    "title": "Element Content",
                                                    "description": "Filename or HTML",
                                                    "name": "element Content"
                                                },
                                                "elementType": {
                                                    "id": "elementType",
                                                    "type": "string",
                                                    "minLength": 0,
                                                    "title": "Element Type",
                                                    "description": "What type of visual element is this? [still, video, html]",
                                                    "enum": [
                                                        "",
                                                        "still",
                                                        "video",
                                                        "html"
                                                    ],
                                                    "name": "element Type"
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
                                                                    "",
                                                                    "cut",
                                                                    "fade",
                                                                    "flare",
                                                                    "push",
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
                                                                "name": "start Trigger"
                                                            },
                                                            "duration": {
                                                                "id": "duration",
                                                                "type": "number",
                                                                "title": "End Trigger",
                                                                "description": "Duration of transition (winUnits. 0.5=half, 2=two screens)",
                                                                "name": "end Trigger",
                                                                "minimum": 0
                                                            },
                                                            "startPosition": {
                                                                "id": "startPosition",
                                                                "type": "string",
                                                                "minLength": 0,
                                                                "title": "Start Position",
                                                                "description": "Screen position at start of transition.",
                                                                "name": "start Position",
                                                                "default": "center"
                                                            },
                                                            "endPosition": {
                                                                "id": "endPosition",
                                                                "type": "string",
                                                                "minLength": 0,
                                                                "title": "End Position",
                                                                "description": "Screen position at end of transition.",
                                                                "name": "end Position",
                                                                "default": "center"
                                                            },
                                                            "startScale": {
                                                                "id": "startScale",
                                                                "type": "number",
                                                                "maximum": 2,
                                                                "minimum": 0,
                                                                "title": "Start Scale",
                                                                "description": "Scale as a fraction of native element size [0-2] (leave empty to disable this setting)",
                                                                "name": "start Scale"
                                                            },
                                                            "endScale": {
                                                                "id": "endScale",
                                                                "type": "number",
                                                                "maximum": 2,
                                                                "minimum": 0,
                                                                "title": "End Scale",
                                                                "description": "Scale as a fraction of native element size [0-2] (leave empty to disable this setting)",
                                                                "name": "end Scale"
                                                            },
                                                            "startWidth": {
                                                                "id": "startWidth",
                                                                "type": "number",
                                                                "minimum": 0,
                                                                "title": "Start Width",
                                                                "description": "Width as a fraction of winUnits (leave empty to disable this setting)",
                                                                "name": "start Width"
                                                            },
                                                            "startHeight": {
                                                                "id": "startHeight",
                                                                "type": "number",
                                                                "minimum": 0,
                                                                "title": "Start Height",
                                                                "description": "Height as a fraction of winUnits (leave empty to disable this setting)",
                                                                "name": "start Height"
                                                            },
                                                            "endWidth": {
                                                                "id": "endWidth",
                                                                "type": "number",
                                                                "minimum": 0,
                                                                "title": "End Width",
                                                                "description": "Width as a fraction of winUnits (leave empty to disable this setting)",
                                                                "name": "end Width"
                                                            },
                                                            "endHeight": {
                                                                "id": "endHeight",
                                                                "type": "number",
                                                                "minimum": 0,
                                                                "title": "End Height",
                                                                "description": "Height as a fraction of winUnits (leave empty to disable this setting)",
                                                                "name": "end Height"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



      );

};
