Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  //notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  //loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('card'),
      Meteor.subscribe('suite'),
      Meteor.subscribe('message'),
      Meteor.subscribe('game')
    ];
  }
});

/*
dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}*/

Router.map(function() {


  //this.route('signin');
  this.route('/', 'home');

  this.route('join');
  this.route('signin');
  this.route('creategame');

  this.route('game', 
  {
    path: '/game/:_id',
    waitOn          : function() {
        return Meteor.subscribe('gamemessage', this.params._id);
    },
    data            : function() {
        var gameMessages  = Message.find({ gameId : this.params._id });

        return {
            messages    : gameMessages,
        }
    }, 
    action          : function() {

        // Set the Session
        Session.set('gameId', this.params._id);

        this.render();
    },
    onStop          : function() {

        Session.set('gameId', null);
    },
    onRun: function() {
      if (!(Meteor.userId()) ) {
        Router.go('signin');
      } else {
        this.next();
      }
    }
  }); 

  this.route('gameboard', {
      path: '/gameboard',
      onRun: function() {
        if (!(Meteor.userId()) ) {
          Router.go('signin');
        } else {
          this.next();
        }
      }
    });



  //this.route('signin');
/*
  this.route('listsShow', {
    path: '/lists/:_id',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.todosHandle = Meteor.subscribe('todos', this.params._id);

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return Lists.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });


  this.route('home', {
    path: '/',
    action: function() {
      Router.go('listsShow');
    }
  });*/
});
