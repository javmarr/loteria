var boot = function(game) {
	console.log("%cLoteria round, start!", "color:white; background:green");
};

boot.prototype = {
	preload: function() {
    this.gameDealer.load.image("loading","../images/temp/loading.png");
	},

	create: function() {
  	// this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  	// this.scale.pageAlignHorizontally = true;
  	// this.scale.updateLayout();
  	this.gameDealer.state.start("Preload");
	}
};
