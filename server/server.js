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
    Meteor.call('getRules');
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
        } catch(error) {
          console.log(error);
        }
    },
    getRules: function(){
      this.unblock();
      try {
        var response =  HTTP.get('https://fortyfives.herokuapp.com/api/rules');

        Rule.remove({});

        var x = 0;

        _.each(response.data, function(item) {

          if(x < 4){
            item.isTrump = true;
          } else {
            item.isTrump = false;
          }
          
          console.log(item);
          x++;
        });
      } catch(error) {
        console.log(error);
      }
    }
});



