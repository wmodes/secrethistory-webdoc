
/*
 * Web Doc Routes
 */

Router.route('/', {
  name: 'landingpage',
  template: 'landingpage',
  onBeforeAction: function() {
    this.next();
  }
});

Router.route('/chapter/:pathSlug/:chapterSlug', {
  name: 'chaptershow',
  template: 'chaptershow',
  //waitOn: function() {
    //return [Meteor.subscribe('users'),
            //Meteor.subscribe('ChapterCollection')];
  //},
  onBeforeAction: function() {
    Session.set('currentRoute', 'chapter');
    console.log("chaptershow route:");
    console.log(this.params);
    this.next();
  }
});

/*
 * Authentication Routes
 */

Router.route('/login', {
  name: 'login',
  template: 'login',
  //waitOn: function() {
    //return Meteor.subscribe('users');
  //},
  onBeforeAction: function() {
    Session.set('currentRoute', 'login');
    this.next();
  }
});


/*
 * Admin Routes
 */

Router.route('/admin/chapter/:pathNum/:chapterNum', {
  name: 'chaptereditpage',
  template: 'chaptereditpage',
  //waitOn: function() {
    //return [Meteor.subscribe('users'),
            //Meteor.subscribe('ChapterCollection')];
  //},
  onBeforeAction: function() {
    Session.set('currentRoute', 'chapteredit');
    if(isAuth(['editor', 'admin', 'owner'])) {
      this.next();
    }
  }
});

Router.route('/admin/chapter', {
  name: 'chaptereditblank',
  template: 'chaptereditpage',
  //waitOn: function() {
    //return Meteor.subscribe('users');
  //},
  onBeforeAction: function() {
    Session.set('currentRoute', 'chapteredit');
    if(isAuth(['editor', 'admin', 'owner'])) {
      this.next();
    }
  }
});

Router.route('/admin/upload', {
  name: 'uploadpage',
  template: 'uploadpage',
  //waitOn: function() {
    //return [Meteor.subscribe('users'),
            //Meteor.subscribe('ChapterCollection')];
  //},
  onBeforeAction: function() {
    Session.set('currentRoute', 'upload');
    if(isAuth(['editor', 'admin', 'owner'])) {
      this.next();
    }
  }
});


function isAuth(roles){
  if (roles) {
    if (!Meteor.userId()) {
      Router.current().render('login');
      return false;
    } else if (! Roles.userIsInRole(Meteor.user(), roles)) {
      Router.current().render('notauthorized')
      return false;
    }
    return true;
  }
}



/*Router.route('/test', {
  onBeforeAction: checkAuthandRender(this.route._path)
});
*/

/*
 * Web Doc Routes
 */

/*
Router.route('/chapter', function () {
  this.render('chaptershow');
});

// given a url like "/chapter/voyage-of-the-doty/provisioning"
Router.route('/chapter/:pathSlug/:chapterSlug', function () {
  var slug = this.params.pathSlug+'/'+this.params.chapterSlug;
  this.render('chaptershow');
});
*/


/*
Router.route('/login', {
  onBeforeAction: checkAuthandRender(this.route._path)
});
*/



/*
function createRoutesAndPerms(){
  for (i = 0; i < routeTable.length; i++) { 
    thisRoute = routeTable[i];
    Router.route(thisRoute.path, {
      onBeforeAction: function () {
        console.log('Routing:');
        console.log(this);
        if (thisRoute.onlyRoles) {
          if (!Meteor.userId()) {
            this.render('login');
          } else if (! Roles.userIsInRole(Meteor.user(), thisRoute.onlyRoles)) {
            this.render('notauthorized')
          } else {
            this.render(thisRoute.template);
          }
        } else {
          this.render(thisRoute.template);
        }
      }
    })
  }
}
*/


/*
 * Admin & Edit Routes
 */

/*
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
*/

/*
 * Error Routes
 */

Router.configure({
  notFoundTemplate: 'four-oh-four'
});
