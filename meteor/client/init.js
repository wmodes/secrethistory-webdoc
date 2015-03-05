
Meteor.startup(function() {
    
    // init upload
    Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL

});
