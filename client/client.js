Template.signInWithOtherServices.events({
  'click .twitterSignIn' : function() {
    Meteor.loginWithTwitter(login);
  }
});

var login = function(error){
  if(error != undefined){
    console.log(error);
  } else {
    Router.go('gameboard');
  }
}

var logout = function(error){
    if(error != undefined){
    console.log(error);
  } else {
    Router.go('/');
  }
}

Template.signInWithOtherServices.events({
  'click .googleSignIn' : function() {
    Meteor.loginWithGoogle(login);
  }
});


Template.join.events({
  'click #twitterSignIn' : function() {
    Meteor.loginWithTwitter(login);
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
          Router.go('/gameboard');
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
            Router.go('/gameboard');
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
      Meteor.logout(logout);
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

Template.appBody.events({  
  'click a.game': function(event, template) {
      event.preventDefault();
      Router.go('join');
  }
});

Template.appBody.events({  
  'click a.creategame': function(event, template) {
      event.preventDefault();
      Router.go('creategame');
  }
});


Template.chatBox.events({
  'click button#send': function(){

    var text = $("#text").val();

    Message.insert({
      gameId: Session.get('gameId'), 
      text: text,
      name: Meteor.user().profile.name,
      creation_date: new Date() 
    });

    $('#text').val('');

  }
});

Template.chatBox.rendered = function(){
  this.autorun(function(){
    var message = Message.find({ gameId: Session.get('gameId') }).fetch();
    var messageDiv = $("#pierre");
    messageDiv.scrollTop(messageDiv[0].scrollHeight);

  });
}


Template.gameboard.helpers({  
  card: function() {
    return Card.find({});
  },
  suite: function() {
    return Suite.findOne({});
  },
  trick: function(){
      var trick = Card.find({}, 
      { 
        sort  : { cardId : 1 }, 
        limit : 4, 
        skip  : Card.find().count() * Math.random()  
      });

      var trump = Suite.findOne({},
      {
        skip  : Suite.find().count() * Math.random()  
      });

      trick.trump = trump;
      return trick;
  }
});

Template.appBody.helpers({
  game: function(){
    return Game.find({});
  }
});

Template.creategame.events({
  'click button#create': function(){
    event.preventDefault();

    var name = $("#name").val();
    var visibility = $('input:radio[name=visibility]:checked').val();

    var game = {
      _id: Random.id(),
      name: name,
      visibility: visibility,
      owner: Meteor.userId(),
      username: Meteor.user().username
    }
    Game.insert(game);

    Router.go('game', game);
  }
});






