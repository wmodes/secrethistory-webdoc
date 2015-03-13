
imageDir = "images/";
videoDir = "video/";
audioDir = "audio/";
tmpDir = "tmp/";
uploadDir = ".upload/";


function zeroPad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

Meteor.startup(function() {

    var imageFileList = null
    var videoFileList = null
    var audioFileList = null

});


Meteor.methods({
    'getPublicFiles': function(myPathNum, myChapterNum){

        var fs = Npm.require("fs");

        if (myPathNum && myChapterNum) {
            var filePrefix = 'p'+zeroPad(myPathNum,2)+'c'+zeroPad(myChapterNum,2);
        } else {
            var filePrefix = '';
        } 
        var imageCmd = "cd "+fullImageDir+";ls -1 "+filePrefix+"*";
        var videoCmd = "cd "+fullVideoDir+";ls -1 "+filePrefix+"*";
        var audioCmd = "cd "+fullAudioDir+";ls -1 "+filePrefix+"*";
        console.log("imageCmd: "+imageCmd);
        console.log("videoCmd: "+videoCmd);
        console.log("audioCmd: "+audioCmd);

        //TODO: Add to mongo database and watch from client end
        //In fact, I could add a watcher to update these lists

        /*
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
                // SAVE
                // insert document in collection and save returned id
                myid = ChapterCollection.insert(myChapter);
                Session.set('current_id', myid);
                // Make pathNumber and chapterNUmber readonly
                protectIndexNumbers();
            }
        }
        */


        //Session.set("imageFileList", fs.readdir(fullImageDir));
        //Session.set("videoFileList", fs.readdir(fullVideoDir));
        //Session.set("audioFileList", fs.readdir(fullAudioDir));

        return;

        var content = fs.read('.');
        console.log(content);

        return([imageList, videoList, audioList]);
    },
    'updateDirList': function(){
        return;
    }

});


