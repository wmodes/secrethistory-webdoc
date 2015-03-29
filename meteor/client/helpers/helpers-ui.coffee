
UI.registerHelper('userIdentity', (userId) ->
  getUser = Meteor.users.findOne({_id: userId})
  if getUser.emails
    getUser.emails[0].address
  else if getUser.services
    services = getUser.services
    getService = switch
      when services.facebook then services.facebook.email
      when services.github then services.github.email
      when services.google then services.google.email
      when services.twitter then services.twitter.screenName
      else false
    getService
  else
    getUser.profile.name
)
