var preload = function(game){}

preload.prototype = {
	preload: function() {

    console.log("preloading");
    var loadingBar = this.add.sprite(160, 240,"loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.gameDealer.load.setPreloadSprite(loadingBar);

    this.gameDealer.load.atlasJSONHash('loteria', '../images/cards/loteria.png', '../images/cards/loteria.json');
    this.gameDealer.load.image('border', '../images/cards/border.png');

		this.gameDealer.load.image("gametitle", "../images/temp/gametitle.png");
		this.gameDealer.load.image("join", "../images/button/joinGame.png");
    this.gameDealer.load.image("create", "../images/button/createGame.png");
    this.gameDealer.load.image("cardsDealt", "../images/button/cardsDealt.png");
    this.gameDealer.load.image("monitor", "../images/button/monitorGame.png");
		this.gameDealer.load.image("gameover", "../images/temp/gameover.png");
	},

	create: function() {
	    // this.game.state.start("GameTitle");
      this.gameDealer.state.start("Loteria"); // skip menu
	}
};
