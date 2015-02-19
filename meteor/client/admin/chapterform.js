
Template.chapterform.created = function(){

    ChapterCollection.attachSchema(new SimpleSchema({ 
        title: {
            type: String,
            label: "Title",
            max: 200
        },

        addresses: {
            type: [Object],
            minCount: 1,
            maxCount: 4
        },
        "addresses.$.street": {
            type: String
        },
        "addresses.$.city": {
            type: String
        },

        author: {
            type: String,
            label: "Author"
        },
        copies: {
            type: Number,
            label: "Number of copies",
            min: 0
        },
        lastCheckedOut: {
            type: Date,
            label: "Last date this book was checked out",
            optional: true
        },
        summary: {
            type: String,
            label: "Brief summary",
            optional: true,
            max: 1000
        }
    })); 

};
