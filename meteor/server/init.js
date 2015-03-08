
exec = Npm.require('child_process').exec;

// From https://gentlenode.com/journal/meteor-14-execute-a-unix-command/33
runCommand = function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);

  if(error !== null) {
    console.log('exec error: ' + error);
  }
}

Meteor.startup(function() {

    //chapterFile = "chapter-voyage-life.json"
    //Meteor.chapterData = JSON.parse(Assets.getText(chapterFile));
    //console.log(Meteor.chapterData);

    //testing
    exec("ls -la", runCommand);

    imageDir = "images/";
    videoDir = "video/";
    audioDir = "audio/";
    tmpDir = "tmp/";
    uploadDir = ".upload/";

    //console.log("this.connection.httpHeaders.host" + this.connection.httpHeaders.host);
    console.log("Meteor.absoluteUrl(): " + Meteor.absoluteUrl());
    if (Meteor.absoluteUrl().match(/localhost/)) {
        publicBase = "/Users/wmodes/dev/secrethistory/meteor/public/";
    } else  if (Meteor.absoluteUrl().match(/peoplesriverhistory/)) {
        publicBase = "/home/secrethistory/bundle/programs/web.browser/app/";
    }

    fullUploadDir = publicBase+uploadDir;
    fullTmpDir = publicBase+uploadDir+tmpDir;
    fullImageDir = publicBase+imageDir;
    fullVideoDir = publicBase+videoDir;
    fullAudioDir = publicBase+audioDir;

    //Prep uploads
    UploadServer.init({
        tmpDir: fullTmpDir,
        uploadDir: fullUploadDir,
        checkCreateDirectories: true, //create the directories for you
        getDirectory: function(fileInfo, formData) {
            // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
            if (fileInfo.name) {
                var myExt = fileInfo.name.replace(/^.*\./, "");
                if (myExt.match(/jpg|png|gif/)) {
                    // image
                    return imageDir;
                } else if (myExt.match(/mp4|webm|mov/)) {
                    // video
                    return videoDir;
                } else if (myExt.match(/mp3|wav|ogg/)) {
                    // audio
                    return audioDir;
                }
            }
            return null;
        },
        finished: function(fileInfo, formFields) {
            // perform a disk operation
            var myExt = fileInfo.name.replace(/^.*\./, "");
            if (myExt.match(/jpg|png|gif/)) {
                // image
            } else if (myExt.match(/mp4|webm|mov/)) {
                // video
            } else if (myExt.match(/mp3|wav|ogg/)) {
                // audio
            }
            //return "This is important";
            return true;
        },
        cacheTime: 100,
        mimeTypes: {
            "jpg": "image/jpeg",
            "png": "image/png",
            "gif": "image/gif",
            "mp4": "video/mp4",
            "webm": "video/webm",
            "mov": "video/quicktime",
            "mp3": "audio/mpeg3",
            "wav": "audio/wav",
            "ogg": "audio/off"
        }
    })

});


