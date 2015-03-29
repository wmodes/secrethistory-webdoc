
var createServiceConfiguration;

createServiceConfiguration = function(service, clientId, secret) {
  var config;
  ServiceConfiguration.configurations.remove({
    service: service
  });
  config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };
  switch (service) {
    case 'facebook':
      return ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      return ServiceConfiguration.configurations.insert(config.twitter);
    default:
      return ServiceConfiguration.configurations.insert(config.generic);
  }
};

createServiceConfiguration('facebook', 
                           '1710018712558457', 
                           'a4cc4be855289921f2a7dac471ac2deb');
createServiceConfiguration('github', 
                           '79f5ff0103b63690caeb', 
                           '6894146d690d9c5b8d66f711ba89a19dc647d540');
createServiceConfiguration('google', 
                           '783354941160-dut2661tjo4tgdsljjfcrehg2j5bcrbt.apps.googleusercontent.com', 
                           '7e8Q0EMKGhJoUIkSYvsicE1J');
createServiceConfiguration('twitter', 
                           'OJu4cDPEm3DcWwZtc53Snoyf4', 
                           'fBSOohzDvEF1GROge5tRlhLIzWond7rBAJVWd7SM5gGDR1pjzB');

