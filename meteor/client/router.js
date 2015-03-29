//Router.before(function() {
  //unless(Meteor.userId()) {
    //this.redirect('userUnauthorized');
    //do (this.stop)
  //}
//}, {
  //except: ['userUnauthorized', 'otherPageUnauthorizedUsersAllowedToSee']
//});


/*
 * Web Doc Routes
 */

Router.route('/chapter', function () {
  this.render('chaptershow');
});

// given a url like "/chapter/voyage-of-the-doty/provisioning"
Router.route('/chapter/:pathSlug/:chapterSlug', function () {
  var slug = this.params.pathSlug+'/'+this.params.chapterSlug;
  this.render('chaptershow');
});


/* 
 * Authentication Routes 
 */

Router.route('/login', function () {
  this.render('login');
});

/*
 * Admin & Edit Routes
 */

Router.route('/admin/chapter/:pathNum/:chapterNum', {
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.render('login');
    } else {
      this.render('chaptereditpage');
    }
  }
});

Router.route('/admin/chapter', {
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.render('login');
    } else {
      this.render('chaptereditpage');
    }
  }
});

Router.route('/admin/upload', {
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      this.render('login');
    } else {
      this.render('uploadpage');
    }
  }
});

/*
 * Error Routes
 */

Router.configure({
  notFoundTemplate: 'four-oh-four'
});
