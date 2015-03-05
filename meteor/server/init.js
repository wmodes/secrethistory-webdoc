Meteor.startup(function() {

    //chapterFile = "chapter-voyage-life.json"
    //Meteor.chapterData = JSON.parse(Assets.getText(chapterFile));
    //console.log(Meteor.chapterData);

    //Prep uploads
    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        //tmpDir: '/Users/tomi/Documents/Uploads/tmp',
        //uploadDir: '/Users/tomi/Documents/Uploads/',
        checkCreateDirectories: true, //create the directories for you
        getDirectory: function(fileInfo, formData) {
            // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
            return formData.contentType;
        },
        finished: function(fileInfo, formFields) {
            // perform a disk operation
        },
        cacheTime: 100,
        mimeTypes: {
            "xml": "application/xml",
            "vcf": "text/x-vcard"
        }
    })

});


