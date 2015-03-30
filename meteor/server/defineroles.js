  var users = [
      {name:"Jacob Simowitz",email:"jasimowi@ucsc.edu",roles:['editor']},
      {name:"Kyle Doria",email:"kcdoria@ucsc.edu",roles:['editor']},
      {name:"Monica Yap",email:"myap@ucsc.edu",roles:['editor']},
      {name:"Regina Ortanez",email:"raortane@ucsc.edu",roles:['editor']},
      {name:"Wes Modes",email:"wmodes@gmail.com",roles:['admin','owner']}
    ];

  _.each(users, function (user) {
    var id;


    userSearch = Meteor.users.findOne({ "emails.address" : user.email })
    if (! userSearch) {
      id = Accounts.createUser({
        email: user.email,
        password: "changemeASAP",
        profile: { name: user.name }
      });
    } else {
      id = userSearch._id;
    }

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }

  });
