var preload = function(gameLoteria){}

preload.prototype = {
	preload: function() {

    console.log("preloading");
    var loadingBar = this.add.sprite(160, 240,"loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(loadingBar);

    gameLoteria.load.atlasJSONHash('loteria', '../images/cards/loteria.png', '../images/cards/loteria.json');
    gameLoteria.load.image("loteria", "../images/cards/cartaCoinci.png");
    gameLoteria.load.image('border', '../images/cards/border.png');

		gameLoteria.load.image("gametitle", "../images/temp/gametitle.png");
		gameLoteria.load.image("join", "../images/button/joinGame.png");
    gameLoteria.load.image("create", "../images/button/createGame.png");
    gameLoteria.load.image("cardsDealt", "../images/button/cardsDealt.png");
    gameLoteria.load.image("monitor", "../images/button/monitorGame.png");
		gameLoteria.load.image("gameover", "../images/temp/gameover.png");

    gameLoteria.forceSingleUpdate = true;

    gameLoteria.load.image('logo', 'assets/particlestorm/logo-flat.png');

    gameLoteria.load.path = 'assets/particlestorm/particles/';

    gameLoteria.load.images(['pixel_blue', 'pixel_green', 'pixel_red', 'pixel_white', 'pixel_yellow']);

   
   
	},

	create: function() {
	    // this.game.state.start("GameTitle");
      gameLoteria.state.start("Loteria"); // skip menu
	}
};
