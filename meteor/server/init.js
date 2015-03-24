debug = true;


Meteor.startup(function() {

    //chapterFile = "chapter-voyage-life.json"
    //Meteor.chapterData = JSON.parse(Assets.getText(chapterFile));
    //console.log(Meteor.chapterData);

    imageDir = "images/";
    videoDir = "video/";
    audioDir = "audio/";
    thumbDir = "thumbs/";
    tmpDir = "tmp/";
    uploadDir = ".upload/";
    
    imageMagickOpts = ' -quality 50 -resize 1920x1920 ';
    handbrakeOpts = ' -e x264  -q 20.0 -a 1,1 -E faac,copy:ac3 -B 160,160 -6 dpl2,none -R Auto,Auto -D 0.0,0.0 --audio-copy-mask aac,ac3,dtshd,dts,mp3 --audio-fallback ffac3 -f mp4 -4 --decomb --loose-anamorphic --modulus 2 -m --x264-preset medium --h264-profile high --h264-level 4.1 -O ';
    lameOpts = ' -b 64 -h -V 6 ';

    imageThumbOpts = ' -quality 50 -resize 500x500\\> ';
    ffmpegThumbOpts = ' -s 500 ';

    //console.log("this.connection.httpHeaders.host" + this.connection.httpHeaders.host);
    if (Meteor.absoluteUrl().match(/localhost/)) {
        // we are local
        publicBase = "/Users/wmodes/dev/secrethistory/meteor/public/";
        imagemagick = "/opt/local/bin/convert ";
        handbrake = "/usr/local/bin/HandbrakeCLI ";
        lame = "/opt/local/bin/lame ";
        ffmpegthumbnailer = "/usr/local/bin/ffmpegthumbnailer";
    } else  if (Meteor.absoluteUrl().match(/peoplesriverhistory/)) {
        // we are deployed
        publicBase = "/home/secrethistory/bundle/programs/web.browser/app/";
        imagemagick = "/usr/bin/convert ";
        handbrake = "/usr/bin/HandBrakeCLI ";
        lame = "/usr/bin/lame ";
        ffmpegthumbnailer = "/usr/bin/ffmpegthumbnailer";
    }

    fullUploadDir = publicBase+uploadDir;
    fullTmpDir = publicBase+uploadDir+tmpDir;
    fullImageDir = publicBase+imageDir;
    fullVideoDir = publicBase+videoDir;
    fullAudioDir = publicBase+audioDir;
    fullThumbDir = publicBase+thumbDir;
                    
    //exec("mkdir "+fullImageDir, runCommand);
    //exec("mkdir "+fullVideoDir, runCommand);
    //exec("mkdir "+fullAudioDir, runCommand);

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
            var filename = fileInfo.name;
            var myExt = fileInfo.name.replace(/^.*\./, "");
            //TODO: Strip extension from dest and reaply the format we want
            if (myExt.match(/jpg|png|gif/)) {
                // image
                var srcFile = fullUploadDir + imageDir + filename;
                var destFile = fullImageDir + filename;
                var thumbFile = fullThumbDir + filename + ".jpg";

                if (debug) console.log("image file: src:"+srcFile+" dest:"+destFile);
                if (myExt == "jpg") {
                    if (debug) console.log("Cmd: "+imagemagick+srcFile+imageMagickOpts+destFile);
                    exec(imagemagick + srcFile + imageMagickOpts + destFile, runCommand);
                } else {
                    exec("cp " + srcFile + " " + destFile, runCommand);
                }

                if (debug) console.log("Cmd: "+imagemagick + srcFile + imageThumbOpts + thumbFile);
                exec(imagemagick + srcFile + imageThumbOpts + thumbFile, runCommand);

            } else if (myExt.match(/mp4|webm|mov/)) {
                // video
                var srcFile = fullUploadDir + videoDir + filename;
                var destFile = fullVideoDir + filename;
                var thumbFile = fullThumbDir + filename + ".jpg";

                if (debug) console.log("video file: src:"+srcFile+" dest:"+destFile);
                if (debug) console.log("Cmd:"+handbrake+' -i '+srcFile+' -o '+destFile+handbrakeOpts);

                exec(handbrake + ' -i ' + srcFile + ' -o ' + destFile + handbrakeOpts, runCommand);
                //TODO: Add functionality: Copy to webm format as well

                if (debug) console.log("Cmd: "+ ffmpegthumbnailer + " -i " + srcFile 
                    + " -o " + thumbFile + ffmpegThumbOpts);
                exec(ffmpegthumbnailer + " -i " + srcFile + " -o " + thumbFile + ffmpegThumbOpts, runCommand);
                
            } else if (myExt.match(/mp3|wav|ogg/)) {
                // audio
                var srcFile = fullUploadDir+audioDir+filename;
                var destFile = fullAudioDir+filename;
                if (debug) console.log("audio file: src:"+srcFile+" dest:"+destFile);
                //exec("cp "+srcFile+" "+destFile, runCommand);
                exec(lame+lameOpts+srcFile+" "+destFile, runCommand);
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


