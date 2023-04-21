var gameOver = function(gameLoteria) {}

gameOver.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
  	var gameOverTitle = gameLoteria.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
	},

	playTheGame: function() {
		gameLoteria.state.start("Loteria");
	}
};
