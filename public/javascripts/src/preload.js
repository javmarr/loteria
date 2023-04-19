var preload = function(gameLoteria){}

preload.prototype = {
	preload: function() {

    console.log("preloading");
    var loadingBar = this.add.sprite(160, 240,"loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(loadingBar);

    this.gameLoteria.load.atlasJSONHash('loteria', '../images/cards/loteria.png', '../images/cards/loteria.json');
    this.gameLoteria.load.image('border', '../images/cards/border.png');

		this.gameLoteria.load.image("gametitle", "../images/temp/gametitle.png");
		this.gameLoteria.load.image("join", "../images/button/joinGame.png");
    this.gameLoteria.load.image("create", "../images/button/createGame.png");
    this.gameLoteria.load.image("cardsDealt", "../images/button/cardsDealt.png");
    this.gameLoteria.load.image("monitor", "../images/button/monitorGame.png");
		this.gameLoteria.load.image("gameover", "../images/temp/gameover.png");
	},

	create: function() {
	    // this.game.state.start("GameTitle");
      this.gameLoteria.state.start("Loteria"); // skip menu
	}
};
