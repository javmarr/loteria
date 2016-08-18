var preload = function(game){}

preload.prototype = {
	preload: function() {

    console.log("preloading");
    var loadingBar = this.add.sprite(160, 240,"loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(loadingBar);

    this.game.load.atlasJSONHash('loteria', 'images/cards/loteria.png', 'images/cards/loteria.json');
    this.game.load.image('border', 'images/cards/border.png');

		// this.game.load.spritesheet("numbers", "images/temp/numbers.png", 100, 100);
		this.game.load.image("gametitle", "images/temp/gametitle.png");
		this.game.load.image("play", "images/temp/play.png");
		// this.game.load.image("higher", "images/temp/higher.png");
		// this.game.load.image("lower", "images/temp/lower.png");
		// this.game.load.image("gameover", "images/temp/gameover.png");
	},

	create: function() {
	    this.game.state.start("GameTitle");
	}
};
