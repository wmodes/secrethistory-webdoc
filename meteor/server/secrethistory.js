// Server controls on our collections and publishing

// Chapters
ChapterCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
})


Meteor.publish("ChapterCollection", function () {
  return ChapterCollection.find();
});


