Meteor.startup(function () {
    Accounts.loginServiceConfiguration.remove({
      service : 'twitter'
    });

    Accounts.loginServiceConfiguration.remove({
      service: 'google'
    });

    Accounts.loginServiceConfiguration.insert({
      service     : 'twitter',
      consumerKey : 'mj7XcbxrUVDAjPJKyx8QKfQjZ',
      secret      : 'tvOQUjAKE8z0TWRGPbJyzPZEP1AjiAjlW7Os8z5kcwBhiT6KYs'
    });

    Accounts.loginServiceConfiguration.insert({
        service   : 'google',
        clientId  : '418056167760-c6jg39o967m7hc9o8i6emgtgtcr78nl9.apps.googleusercontent.com',
        secret    : 'SVWrAFd_sowhDW7PZk5yatdo'
    });

    Accounts.onLogin(function(){
      console.log("Successfully logged in");
    });

    Meteor.call('getDeck');
});

Meteor.publish('card', function(query) {  
  return Card.find();
});

Meteor.publish('suite', function(query) {  
  return Suite.find();
});

Meteor.methods({
    getDeck: function () {
        this.unblock();
        try {
          var response =  HTTP.get('https://fortyfives.herokuapp.com/api/deck');

            Suite.remove({});

            _.each(response.data.suites, function(suite) {
              Suite.insert(suite);
            });

            Card.remove({});

            _.each(response.data.cards, function(card) {
              var suite = Suite.findOne({ suiteId: card.suiteId });
              card.Suite = suite;
              Card.insert(card);
            });

            console.log(Math.random());

        } catch(error) {
          console.log(error);
        }
    }
});



