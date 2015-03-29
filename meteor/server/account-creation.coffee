Accounts.onCreateUser((options,user)->
  userData =
    email: determineEmail(user)
    name: if options.profile then options.profile.name else ""

  if userData.email != null
    Meteor.call 'sendWelcomeEmail', userData, (error)->
      console.log error if error

  if options.profile
    user.profile = options.profile

  user
)

determineEmail = (user)->
  if user.emails
    emailAddress = user.emails[0].address
  else if user.services
    services = user.services
    emailAddress = switch
      when services.facebook then services.facebook.email
      when services.github then services.github.email
      when services.google then services.google.email
      when services.twitter then null
      else null
  else
    null


Meteor.methods(

  sendWelcomeEmail: (userData)->
    check(userData,{email: String, name: String})

    SSR.compileTemplate('welcomeEmail', Assets.getText('email/welcome-email.html'))

    emailTemplate = SSR.render('welcomeEmail',
      email: userData.email
      name: if userData.name != "" then userData.name else null
      url: "http://localhost:3000"
    )

    Email.send(
      to: userData.email
      from: "Secret History of American River People <info@peoplesriverhistory.us>"
      subject: "Welcome aboard, team matey!"
      html: emailTemplate
    )

)
