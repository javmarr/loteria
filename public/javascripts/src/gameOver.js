var gameOver = function(gameLoteria) {}

gameOver.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
  	var gameOverTitle = this.gameLoteria.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
    var playButton = this.gameLoteria.add.button(160, 320, "play", this.playTheGame, this);
	playButton.style = {button	};
  	playButton.anchor.setTo(0.5, 0.5);
	},

	playTheGame: function() {
		gameLoteria.state.start("Loteria");
	}
};
