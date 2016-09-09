
var loteria = function(game){
  cardNumber = 0; // index for a card in the deck (0-deckSize-1)
  turn = 0; // 1-deckSize
  cardsDealt = [];
  deckSize = 0;
};

loteria.prototype = {
  preload: function() {
    cardNumber = 0;
    deckSize = deck.length;
    turn = 1;
    console.log('preload loteria.js');
  },

  create: function() {
    this.game.stage.backgroundColor = "#ddd";
    cardsDealt.push(deck[cardNumber]);
    console.log('card number: ' + cardNumber);
    console.log('dealt: ' + deck[cardNumber]);

    card = this.game.add.group(); // card containing image and border
    cardBorder = card.create(0, 0, 'border');
    cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + deck[cardNumber] + '.png');


    // currentCard = this.game.add.sprite(cardBorder.x + 30, cardBorder.y + 32, 'loteria', 'card_' + deck[cardNumber] + '.png');

    // cardBorder2 = this.game.add.image(0, 0, 'border');
    // currentCard2 = this.game.add.sprite(cardBorder.x + 30, cardBorder.y + 32, 'loteria', 'card_' + deck[cardNumber] + '.png');

    text = this.game.add.text(250, 16, '', { fill: '#ffffff' });

    cardImage.inputEnabled = true;
    cardImage.events.onInputUp.add(this.changeCard, this);
    console.log("\n\n\n\n\nOn loteria (gameID) " + gameID);
    console.log("\nOn loteria (nickname) " + nickname);
  },

  generateDeck: function() {
    for(var i = 1; i <= deckSize; i++) {
      deck.push(i);
    }
  },

  shuffleDeck: function() {
    var times = deckSize; // swap these many times

    // every card, swap to a random spot
    for (var i = 0; i < times; i++) {
      var temp = deck[i];
      var random = ((Math.floor(Math.random() * 100)) % deckSize); // 0 - (deckSize-1)

      // swap values
      deck[i] = deck[random];
      deck[random] = temp;
    }
  },

  changeCard: function() {
    cardNumber++; // next card
    if (cardNumber >= deckSize) {
      this.game.state.start("GameOver", true, false, cardsDealt);
    } else {
      cardsDealt.push(deck[cardNumber]);
      // currentCard.x += 10;
      // console.log('x: ' + currentCard.x);

      // if(cardsDealt.length > 5)
      //   console.log('cardsDealt' + cardsDealt);
      cardImage.loadTexture('loteria', 'card_' + deck[cardNumber] + '.png');

      turn = cardNumber+1;
    }

  }

};
