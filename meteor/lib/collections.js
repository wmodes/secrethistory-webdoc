// Declate all collections and subscriptions

// Chapters
ChapterCollection = new Mongo.Collection("ChapterCollection");

if(Meteor.isClient){
     Meteor.subscribe('ChapterCollection')
}
