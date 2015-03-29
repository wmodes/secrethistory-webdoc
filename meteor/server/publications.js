Meteor.publish('userData', function() {
  var currentUser;
  currentUser = this.userId;
  if (currentUser) {
    return Meteor.users.find({
      _id: currentUser
    }, {
      fields: {
        "services.facebook.email": 1,
        "services.github.email": 1,
        "services.google.email": 1,
        "services.twitter.screenName": 1,
        "emails.address[0]": 1,
        "profile": 1
      }
    });
  } else {
    return this.ready();
  }
});

