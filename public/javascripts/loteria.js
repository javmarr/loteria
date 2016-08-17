var cardsDealt = [];
var cardNumber;

function generateCardNumber() {
  return ((Math.floor(Math.random() * 100)) % 54) + 1; // 1-54
}

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

  function preload() {
    game.load.atlasJSONHash('loteria', 'images/cards/loteria.png', 'images/cards/loteria.json');

  }

  var currentCard;
  var text;
  function create() {
    cardNumber = generateCardNumber();
    cardsDealt.push(cardNumber);
    console.log('card number: ' + cardNumber);
    console.log('dealt: ' + cardNumber);
    currentCard = game.add.sprite(0, 0, 'loteria', 'loteria_' + cardNumber + '.jpeg');
    text = game.add.text(250, 16, '', { fill: '#ffffff' });

    currentCard.inputEnabled = true;
    currentCard.events.onInputDown.add(changeCard, this);

  }

  function changeCard() {
    cardNumber = generateCardNumber();
    cardsDealt.push(cardNumber);
    currentCard.x += 10;
    console.log('x: ' + currentCard.x);

    if(cardsDealt.length > 5)
      console.log('cardsDealt' + cardsDealt);
    currentCard.loadTexture('loteria', 'loteria_' + cardNumber + '.jpeg');

    counter = cardNumber;
    text.text = "Your card: " + counter;
  }

  function update() {

  }

  function render() {
  }
};
