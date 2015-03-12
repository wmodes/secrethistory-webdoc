
Meteor.methods({
    'getPublicFiles': function(myPathNum, myChapterNum){

        var filePrefix = 'p'+zeroPad(myPathNum,2)+'c'+zeroPad(myChapterNum,2);
        var imageCmd = "cd "+fullImageDir+";ls -1 "+filePrefix+"*";
        var videoCmd = "cd "+fullVideoDir+";ls -1 "+filePrefix+"*";
        var audioCmd = "cd "+fullAudioDir+";ls -1 "+filePrefix+"*";
        console.log("imageCmd: "+imageCmd);
        console.log("videoCmd: "+videoCmd);
        console.log("audioCmd: "+audioCmd);

        exec(imageCmd, function (error, stdout, stderr) {
            if (stderr) console.log('stderr: ' + stderr);
            if (error) console.log('exec error: ' + error);
            imageList = stdout.split("\n");
            console.log(imageList);
        });

        exec(videoCmd, function (error, stdout, stderr) {
            if (stderr) console.log('stderr: ' + stderr);
            if (error) console.log('exec error: ' + error);
            videoList = stdout.split("\n");
            console.log(videoList);
        });

        exec(audioCmd, function (error, stdout, stderr) {
            if (stderr) console.log('stderr: ' + stderr);
            if (error) console.log('exec error: ' + error);
            audioList = stdout.split("\n");
            console.log(audioList);
        });

        output = exec("ls "+publicBase, runCommand);
        return([imageList, videoList, audioList]);
    }
});


