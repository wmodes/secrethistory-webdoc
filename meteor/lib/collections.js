// Declate all collections and subscriptions

// Scenes
SceneCollection = new Mongo.Collection("SceneCollection");

if(Meteor.isClient){
     Meteor.subscribe('SceneCollection')
}

// Chapters
ChapterCollection = new Mongo.Collection("ChapterCollection");

if(Meteor.isClient){
     Meteor.subscribe('ChapterCollection')
}
