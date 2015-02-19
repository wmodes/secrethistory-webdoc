//

SceneCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
})


Meteor.publish("SceneCollection", function () {
  return SceneCollection.find();
});

