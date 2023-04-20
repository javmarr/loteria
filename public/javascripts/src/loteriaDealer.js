
var loteriaDealer = function(gameDealer){
};

loteriaDealer.prototype = {
  preload: function() {
    console.log('preload loteria.js');
  },

  create: function() {
    //what color is the background? 0xRRGGBB  0x000000 = black  0xffffff = white #ddd 
    gameDealer.stage.backgroundColor = "#ffffff";
    console.log('cardNumber: ' + cardNumber);

    card = gameDealer.add.group(); // card containing image and border
    cardBorder = card.create(0, 0, 'border');
    cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + cardNumber + '.png');

    text = gameDealer.add.text(250, 16, '', { fill: '#ffffff' });

    cardImage.inputEnabled = true;
    cardImage.events.onInputUp.add(this.changeCard, this);
    console.log("\n\n\n\n\nOn loteria (gameID) " + gameID);
    console.log("\nOn loteria (cardNumber) " + cardNumber);
  },

  changeCard: function() {
    nextCard();
    
  },
  update: function() {
    cardImage.loadTexture('loteria', 'card_' + cardNumber + '.png');
  }

};
