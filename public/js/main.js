(function() {
  window.App = {
    Models: {},
    Views: {},
    Collections: {},
    Router: {}
  };

  App.gamestatusElement = $('#gameresults');

  window.vent = _.extend({}, Backbone.Events);

  vent.on('gamestatus', function(status) {
    App.gamestatusElement.append('<br />' + status.message);
  });

  App.Models.Game = Backbone.Model.extend({
    defaults: {
      PlayerTurn: 1,
      PlayerCount: 0,
      InProgress: 0
    }

  });

  App.Models.Dice = Backbone.Model.extend({
    defaults: {
      Sides: 6
    },
    Roll: function() {
      vent.trigger('gamestatus', {message: 'You rolled ' + _.random(1, 6)});

    },
    initialize: function() {
      vent.on('rolldice', this.Roll);
    }
  });

  App.Models.Player = Backbone.Model.extend({
    defaults: {
      Name: 'Bob',
      Wins: 0,
      Losses: 0,
      Ties: 0
    },
    initialize: function() {
      this.RollElement = $('#player1 .rolldice');
      this.RollElement.click(function() {
        // console.log('triggered rolldice');
        vent.trigger('rolldice');

      });
    }

  });

  App.Collections.Players = Backbone.Collection.extend({
    model: App.Models.Player
  });

}());

App.game = new App.Models.Game();

App.dice = new App.Models.Dice();

App.players = new App.Collections.Players([
  {Name: 'David'},
//  {Name: 'Snow'}
  ]);

