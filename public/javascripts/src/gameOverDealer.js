var gameOverDealer = function(gameDealer) {}

gameOverDealer.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
  	var gameOverTitle = gameDealer.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
    
	},

	playTheGame: function() {
		gameDealer.state.start("Loteria");
	}
};
