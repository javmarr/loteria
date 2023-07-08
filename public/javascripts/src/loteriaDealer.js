
var loteriaDealer = function(gameDealer){
};

loteriaDealer.prototype = {
  preload: function() {
    console.log('preload loteria.js');
    this.load.image('cartaX', '../images/cards/card_xx.png');
    this.load.image('cartaCoinci', '../images/cards/cartaCoinci.png');
  },

  create: function() {
    //what color is the background? 0xRRGGBB  0x000000 = black  0xffffff = white #ddd 
    gameDealer.stage.backgroundColor = "#BA97FF";
    console.log('cardNumber: ' + cardNumber);

    card = gameDealer.add.group(); // card containing image and border
    cardBorder = card.create(0, 0, 'border');
    if(cardNumber == 0)
      cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'cartaX', 'card_xx' + '.png');
    else
      cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + cardNumber + '.png');

    text = gameDealer.add.text(250, 16, '', { fill: '#ffffff' });

    cardImage.inputEnabled = true;
    cardImage.events.onInputUp.add(this.changeCard,this);

    console.log("\n\n\n\n\nOn loteria (gameID) " + gameID);
    console.log("\nOn loteria (cardNumber) " + cardNumber);
  },

  changeCard: function() {
    console.log('TURN IN CHANGE CARD: ' + turn);
    if(turn<=50) {
      nextCard();
    }
    else {
      console.log('Game over');
      addRain();
      gameDealer.state.start('GameOverDealer', true, false, 51);
    }
      var message = {
        type: 'cardNumber',
        data: cardNumber
      };
      window.parent.postMessage(message, '*');
  },

  update: function() {
    if(cardNumber > 0)
     cardImage.loadTexture('loteria', 'card_' + cardNumber + '.png');
  }
}



function addRain(){

	let rainParticle = this.game.add.bitmapData(15, 50);

	rainParticle.ctx.rect(0, 0, 15, 50);
	rainParticle.ctx.fillStyle = 'green';
	rainParticle.ctx.fill();

	this.emitter = this.game.add.emitter(this.game.world.centerX, -300, 400);

	this.emitter.width = game.width;
	this.emitter.angle = 10;

	this.emitter.makeParticles(rainParticle);

	this.emitter.minParticleScale = 0.1;
	this.emitter.maxParticleScale = 0.3;

	this.emitter.setYSpeed(1200, 2000);
	this.emitter.setXSpeed(-500, 500);

	this.emitter.minRotation = 0;
	this.emitter.maxRotation = 0;

	this.emitter.start(false, 1600, 5, 0);
}

;
