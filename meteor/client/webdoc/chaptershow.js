
Template.chaptershow.rendered = function(){

    // get an array of posts
    var chapterArray = ChapterCollection.find().fetch();
    // use the first element returned from the array
    var obj = chapterArray[0];
    //alert(JSON.stringify(chapterArray, null, 2));
    console.log("We are rendering the following chapter:\n\tp"
        +obj.pathNumber+" "+obj.pathName+"\n\t\tc"
        +obj.chapterNumber+" "+obj.chapterName);



};
