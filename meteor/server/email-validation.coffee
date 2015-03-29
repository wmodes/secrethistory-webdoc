i
Future = Npm.require('fibers/future');

Meteor.methods(
  validateEmailAddress: (address)->
    check(address,String)

    validateEmail = new Future()

    HTTP.call("GET", "https://api.kickbox.io/v1/verify",
      params:
        email: address
        apikey: "6c4bc00f75a38c41ec577fcf0cfca3787c527eab50ae180610ad8901ec9e7df9"
    ,(error,response)->
      if error
        validateEmail.return(error)
      else
        if response.data.result == "invalid" or response.data.result == "unknown"
          validateEmail.return(
            error: "Sorry, your email was returned as invalid. Please try another address."
          )
        else
          validateEmail.return(true)
    )

    validateEmail.wait()
)
