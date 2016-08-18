var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};

boot.prototype = {
	preload: function() {
    this.game.load.image("loading","images/temp/loading.png");
    console.log("booting");
	},

	create: function() {
  	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  	this.scale.pageAlignHorizontally = true;
  	this.scale.updateLayout();
    console.log("calling preload");
  	this.game.state.start("Preload");
	}
};
