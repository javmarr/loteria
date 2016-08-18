var loteria = function(game){
  cardsDealt = [];
  deck = [];
  deckSize = 54;
  cardNumber = 0; // index for a card in the deck (0-deckSize-1)
  turn = 0; // 1-deckSize

};

loteria.prototype = {
  preload: function() {
    this.generateDeck();
    console.log('Before' + deck);
    this.shuffleDeck();
    console.log('After shuffle: ' + deck);
    cardNumber = 0;
    turn = 1;
    console.log('preload loteria.js');
  },

  create: function() {
    this.game.stage.backgroundColor = "#ddd";
    cardsDealt.push(deck[cardNumber]);
    console.log('card number: ' + cardNumber);
    console.log('dealt: ' + deck[cardNumber]);
    cardBorder = this.game.add.image(40, 40, 'border');
    currentCard = this.game.add.sprite(cardBorder.x + 30, cardBorder.y + 32, 'loteria', 'card_' + deck[cardNumber] + '.png');

    text = this.game.add.text(250, 16, '', { fill: '#ffffff' });

    currentCard.inputEnabled = true;
    currentCard.events.onInputUp.add(this.changeCard, this);
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
      currentCard.loadTexture('loteria', 'card_' + deck[cardNumber] + '.png');

      turn = cardNumber+1;
    }
  }

};
