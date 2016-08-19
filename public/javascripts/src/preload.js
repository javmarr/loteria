var preload = function(game){}

preload.prototype = {
	preload: function() {

    console.log("preloading");
    var loadingBar = this.add.sprite(160, 240,"loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(loadingBar);

    this.game.load.atlasJSONHash('loteria', '../images/cards/loteria.png', '../images/cards/loteria.json');
    this.game.load.image('border', '../images/cards/border.png');

		this.game.load.image("gametitle", "../images/temp/gametitle.png");
		this.game.load.image("join", "../images/button/joinGame.png");
    this.game.load.image("create", "../images/button/createGame.png");
    this.game.load.image("cardsDealt", "../images/button/cardsDealt.png");
    this.game.load.image("monitor", "../images/button/monitorGame.png");
		this.game.load.image("gameover", "../images/temp/gameover.png");
	},

	create: function() {
	    // this.game.state.start("GameTitle");
      this.game.state.start("Loteria"); // skip menu
	}
};
