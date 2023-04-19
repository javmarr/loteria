var preloadDealer = function(gameDealer){}

preloadDealer.prototype = {
	preload: function() {

    console.log("preloading");
    var loadingBar = this.add.sprite(160, 240,"loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    gameDealer.load.setPreloadSprite(loadingBar);

    gameDealer.load.atlasJSONHash('loteria', '../images/cards/loteria.png', '../images/cards/loteria.json');
    gameDealer.load.image('border', '../images/cards/border.png');

		gameDealer.load.image("gametitle", "../images/temp/gametitle.png");
		gameDealer.load.image("join", "../images/button/joinGame.png");
    gameDealer.load.image("create", "../images/button/createGame.png");
    gameDealer.load.image("cardsDealt", "../images/button/cardsDealt.png");
    gameDealer.load.image("monitor", "../images/button/monitorGame.png");
		gameDealer.load.image("gameover", "../images/temp/gameover.png");
	},

	create: function() {
	    // this.game.state.start("GameTitle");
      gameDealer.state.start("Loteria"); // skip menu
	}
};
