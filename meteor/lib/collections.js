//

SceneCollection = new Mongo.Collection("SceneCollection");

if(Meteor.isClient){
     Meteor.subscribe('SceneCollection')
}
