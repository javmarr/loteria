var boot = function(gameLoteria) {
	console.log("%cLoteria LOTERIA round, start!", "color:white; background:green");
};

boot.prototype = {
	preload: function() {
    this.gameLoteria.load.image("loading","../images/temp/loading.png");
	},

	create: function() {
  	// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  	// this.scale.pageAlignHorizontally = true;
  	// this.scale.updateLayout();
  	this.gameLoteria.state.start("Preload");
	}
};
