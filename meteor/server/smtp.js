// server/smtp.js
Meteor.startup(function () {
  smtp = {
    username: 'admin@peoplesriverhistory.us',   // eg: server@gentlenode.com
    password: 'Clear2Fire',   // eg: 3eeP1gtizk5eziohfervU
    server:   'mail.gandi.net',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
