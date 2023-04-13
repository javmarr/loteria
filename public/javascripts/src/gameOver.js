var gameOver = function(game) {}

gameOver.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
  	var gameOverTitle = this.game.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
    var playButton = this.game.add.button(160, 320, "play", this.playTheGame, this);
	playButton.style = {button	};
  	playButton.anchor.setTo(0.5, 0.5);
	},

	playTheGame: function() {
		this.game.state.start("Loteria");
	}
};
