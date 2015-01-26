Template.signInWithOtherServices.events({
  'click .twitterSignIn' : function() {
    Meteor.loginWithTwitter(function(error){
      if(error != undefined){
        console.log(error);
      }
      Router.go('/');
    });
  }
});

Template.signInWithOtherServices.events({
  'click .googleSignIn' : function() {
    Meteor.loginWithGoogle(function(error){
      if(error != undefined){
        console.log(error);
      }
      Router.go('/');
    });
  }
});


Template.join.events({
  'click #twitterSignIn' : function() {
    Meteor.loginWithTwitter(function(error){
      if(error != undefined){
        console.log(error);
      }
      Router.go('/');
    });
  }
});

Template.user.events({
  'click #signOut' : function() {
    Meteor.logout();
  }
});

Template.join.events({
  'click #submit' : function() {
    event.preventDefault();
    $(".alert.alert-danger").remove();

    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if(name && email && password && confirmPassword){
      var options = 
      {
        email:  email,
        password: password,
        profile: 
        {
          name: name
        }
      };

      Accounts.createUser(options, function(error){
        if(error != undefined)
        {
          $(".form-signin-heading").before($("<div>" + data.reason + "</div>").addClass("alert alert-danger"));
        } else {
          Router.go('/');
        }
      });
    } 

  }
});

Template.signin.events({
  'click #submit' : function() {
    event.preventDefault();
    $(".alert.alert-danger").remove();

    var email = $("#email").val();
    var password = $("#password").val();

    if(email && password)
    {
      Meteor.loginWithPassword(email, password, 
        function(data){ 
          if(data != undefined){
            $(".form-signin-heading").before($("<div>" + data.reason + "</div>").addClass("alert alert-danger"));
          } else {
            Router.go('/');
          }
        });
    } else {
      $(".form-signin-heading").before($("<div>Please provide a username and password</div>").addClass("alert alert-danger"));
    }
  }
});

Template.appBody.events({  
  'click a.signout': function(event, template) {
      event.preventDefault();
      Meteor.logout();
  }
});


Template.appBody.events({  
  'click a.signin': function(event, template) {
      event.preventDefault();
      Router.go('signin');
  }
});

Template.appBody.events({  
  'click a.join': function(event, template) {
      event.preventDefault();
      Router.go('join');
  }
});

Template.appBody.helpers({  
  card: function() {
    return Card.find({}, 
      { 
        sort  : { cardId : 1 }, 
        limit : 4, 
        skip  : Card.find().count() * Math.random()  
      });
  },
  suite: function() {
    return Suite.findOne({},
      {
        skip  : Suite.find().count() * Math.random()  
      });
  },
  count: function(){
    return Card.find().count();
  }
});




