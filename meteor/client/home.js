//Router.before(function() {
    //unless(Meteor.userId()) {
        //this.redirect('userUnauthorized');
        //do (this.stop)
    //}
//}, {
    //except: ['userUnauthorized', 'otherPageUnauthorizedUsersAllowedToSee']
//});

Router.map(function(){
    this.route('chaptershow', {
        path: '/'
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

Router.configure({
    notFoundTemplate: 'four-oh-four'
});
