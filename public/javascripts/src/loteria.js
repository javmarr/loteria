
var loteria = function(game){
};

loteria.prototype = {
  preload: function() {
    console.log('loteria board');
  },

  create: function() {
    this.game.stage.backgroundColor = "#83d";
  },

  changeCard: function() {
    // cardNumber++; // next card
    // if (cardNumber >= deckSize) {
    //   this.game.state.start("GameOver", true, false, cardsDealt);
    // } else {
    //   cardsDealt.push(deck[cardNumber]);
    //   // currentCard.x += 10;
    //   // console.log('x: ' + currentCard.x);
    //
    //   // if(cardsDealt.length > 5)
    //   //   console.log('cardsDealt' + cardsDealt);
    //   cardImage.loadTexture('loteria', 'card_' + deck[cardNumber] + '.png');
    //
    //   turn = cardNumber+1;
    // }

  }

};
