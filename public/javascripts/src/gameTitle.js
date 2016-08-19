var gameTitle = function(game){}

gameTitle.prototype = {
	create: function() {
		// var gameTitle = this.game.add.sprite(160,160,"gametitle");
		// gameTitle.anchor.setTo(0.5,0.5);

    var text = this.game.add.text(30, 30, '', { fill: '#ffffff' });
    text.text = 'Loteria';
		var joinButton = this.game.add.button(160,320,"join",this.joinGame,this);
		joinButton.anchor.setTo(0.5,0.5);

    var createButton = this.game.add.button(160,400,"create",this.createGame,this);
		createButton.anchor.setTo(0.5,0.5);
	},

	joinGame: function() {
		this.game.state.start("Loteria");
	},

  createGame: function() {

  }
}
