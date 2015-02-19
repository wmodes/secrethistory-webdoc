// Server controls on our collections and publishing

// Scenes
SceneCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
})


Meteor.publish("SceneCollection", function () {
  return SceneCollection.find();
});

// Chapters
ChapterCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
})


Meteor.publish("ChapterCollection", function () {
  return ChapterCollection.find();
});


