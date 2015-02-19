Meteor.startup(function() {
    console.log(JSON.parse(Assets.getText('test.json')));
});
