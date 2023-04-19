var gameTitleDealer = function(gameDealer){}

gameTitle.prototype = {
	create: function() {
		// var gameTitle = this.game.add.sprite(160,160,"gametitle");
		// gameTitle.anchor.setTo(0.5,0.5);
		var textoLoteria = {
			font: '24px Arial',
			fill: '#ffffff',
			backgroundColor: '#000000',
			shadow: {
				offsetX: 2,
				offsetY: 2,
				color: '#000000',
				blur: 2,
				stroke: true,
				fill: true
			}
		};

		

		

    var text = this.gameDealer.add.text(30, 30, '', textoLoteria);
    text.text = 'Loteria';
		var joinButton = this.gameDealer.add.button(160,320,"join",this.joinGame,this);
		joinButton.anchor.setTo(0.5,0.5);
		joinButton.style = {button	};

    var createButton = this.gameDealer.add.button(160,400,"create",this.createGame,this);
		createButton.anchor.setTo(0.5,0.5);
		createButton.style = {button	};
	},

	joinGame: function() {
		gameDealer.state.start("Loteria");
	},

  createGame: function() {

  }
}
