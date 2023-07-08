
var loteriaDealer = function(gameDealer){
};

loteriaDealer.prototype = {
  preload: function() {
    console.log('preload loteria.js');
    this.load.image('cartaX', '../images/cards/card_xx.png');
    this.load.image('cartaCoinci', '../images/cards/cartaCoinci.png');
    var manager = null;
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

    manager = gameDealer.plugins.add(Phaser.ParticleStorm);


  },

  changeCard: function() {
    console.log('TURN IN CHANGE CARD: ' + turn);
    if(turn<=50) {
      nextCard();
    }
    else {
      console.log('Game over');
      addConfeti();
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



function addConfeti(){

    var data = {
        lifespan: 3000,
        image: ['pixel_blue', 'pixel_green', 'pixel_red', 'pixel_white', 'pixel_yellow'],
        vx: { min: -0.5, max: 0.5 },
        vy: { min: -1, max: -2 },
        rotation: { delta: 2 },
        blendMode: 'ADD',
        alpha: { initial: 0, value: 1, control: 'linear' }
    };

    manager.addData('basic', data);

    circle = manager.createCircleZone(24);

    emitter = manager.createEmitter();

    emitter.force.y = 0.05;

    emitter.addToWorld();

    gameDealer.add.image(432, 487, 'logo');
};
