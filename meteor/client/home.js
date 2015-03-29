//Router.before(function() {
    //unless(Meteor.userId()) {
        //this.redirect('userUnauthorized');
        //do (this.stop)
    //}
//}, {
    //except: ['userUnauthorized', 'otherPageUnauthorizedUsersAllowedToSee']
//});

Router.route('/auth', function () {
    this.render('authpage');
});

Router.route('/chapter', function () {
    this.render('chaptershow');
});

// given a url like "/chapter/voyage-of-the-doty/provisioning"
Router.route('/chapter/:pathSlug/:chapterSlug', function () {
    var slug = this.params.pathSlug+'/'+this.params.chapterSlug;
    this.render('chaptershow');
});

Router.route('/admin/chapter/:pathNum/:chapterNum', function () {
    this.render('chaptereditpage');
});

Router.route('/admin/chapter', function () {
    this.render('chaptereditpage');
});

Router.route('/admin/upload', function () {
    this.render('uploadpage');
});

Router.route('dashboard', {
  path: '/dashboard',
  template: 'dashboard',
  waitOn: function() {
    return Meteor.subscribe('userData');
  },
  onBeforeAction: function() {
    Session.set('currentRoute', 'dashboard');
    return this.next();
  }
});

Router.configure({
    notFoundTemplate: 'four-oh-four'
});
