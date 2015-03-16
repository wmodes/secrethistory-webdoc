//Router.before(function() {
    //unless(Meteor.userId()) {
        //this.redirect('userUnauthorized');
        //do (this.stop)
    //}
//}, {
    //except: ['userUnauthorized', 'otherPageUnauthorizedUsersAllowedToSee']
//});

Router.route('/chapter', function () {
    console.log(this.params);
    console.log(this.params.query);
    this.render('chaptershow');
});

// given a url like "/chapter/voyage-of-the-doty/provisioning"
Router.route('/chapter/:pathSlug/:chapterSlug', function () {
    var slug = this.params.pathSlug+'/'+this.params.chapterSlug;
    console.log("Rendering Chapter: "+slug);
    this.render('chaptershow');
});

Router.route('/admin/chapter/:pathNum/:chapterNum', function () {
    console.log("Editing Chapter: p"+this.params.pathNum+"c"+this.params.chapterNum);
    this.render('chaptereditpage');
});

Router.route('/admin/chapter', function () {
    this.render('chaptereditpage');
});

Router.route('/admin/upload', function () {
    this.render('uploadpage');
});

/*
Router.map(function(){
    this.route('chaptershow', {
        path: '/'
    });
    this.route('chaptershow', {
        path: '/chapter/'
    });
    this.route('doctest', {
        path: '/doctest'
    });
    this.route('chapterform', {
        path: '/admin/chapter'
    });
    this.route('notauthorized', {
        path: '/noauth'
    });
});
*/

Router.configure({
    notFoundTemplate: 'four-oh-four'
});
