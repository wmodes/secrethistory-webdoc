
imageDir = "images/";
videoDir = "video/";
audioDir = "audio/";
tmpDir = "tmp/";
uploadDir = ".upload/";

Template.uploadform.rendered = function(){

    //$(".jqDropZone").html("Drop files here<br><img src='/images/add.png'/>");

    // List Files Button
    //
    $("#listfiles-button").click(function() {
        console.log("List files!");
        if (typeof(pathNum) == "undefined") pathNum = null;
        if (typeof(chapterNum) == "undefined") chapterNum = null;
        Meteor.call("getPublicFiles", pathNum, chapterNum, function(err, result) {
            console.log("err");
            console.log(err);
            console.log("result");
            console.log(result);
        urlBase = document.URL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6}|:[0-9]{3,4})\b/)[0];
        });
        
    });

};

