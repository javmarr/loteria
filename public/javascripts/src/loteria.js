var loteria = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
};

loteria.prototype = {
  	create: function(){
		number = Math.floor(Math.random()*10);
		spriteNumber = this.game.add.sprite(160,240,"numbers");
		spriteNumber.anchor.setTo(0.5,0.5);
		spriteNumber.frame = number;
		var higherButton = this.game.add.button(160,100,"higher",this.clickedHigher,this);
		higherButton.anchor.setTo(0.5,0.5);
		var lowerButton = this.game.add.button(160,380,"lower",this.clickedLower,this);
		lowerButton.anchor.setTo(0.5,0.5);
	},
	clickedHigher: function(){
		higher=true;
		this.tweenNumber(true);
	},
	clickedLower: function(){
		higher=false;
		this.tweenNumber(false);
	},
	tweenNumber: function(higher){
		if(workingButtons){
			workingButtons=false;
			var exitTween = this.game.add.tween(spriteNumber);
	          exitTween.to({x:420},500);
	          exitTween.onComplete.add(this.exitNumber,this);
	          exitTween.start();
	     }
	},
	exitNumber: function(){
		spriteNumber.x = -180;
	     spriteNumber.frame = Math.floor(Math.random()*10);
	     var enterTween = this.game.add.tween(spriteNumber);
	     enterTween.to({x:160},500);
	     enterTween.onComplete.add(this.enterNumber,this);
	     enterTween.start();

	},
	enterNumber: function(){
		workingButtons=true;
		if((higher && spriteNumber.frame<number)||(!higher && spriteNumber.frame>number)){
			this.game.state.start("GameOver",true,false,score);
		}
		else{
			score++;
			number = spriteNumber.frame;
		}
	}
};

// // --------
// window.onload = function() {
//
//   var cardsDealt = [];
//   var deck = [];
//   var deckSize = 54;
//   var cardNumber; // index for a card in the deck (0-deckSize-1)
//   var turn; // 1-deckSize
//   var gameOver = false;
//
//   var currentCard; // sprite with current card
//   var cardBorder; // border for cards
//   var text;
//   var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
//
//   // helper fuctions
//   function generateDeck() {
//     for(var i = 1; i <= deckSize; i++) {
//       deck.push(i);
//     }
//   }
//
//   function shuffleDeck() {
//     var times = deckSize; // swap these many times
//
//     // every card, swap to a random spot
//     for (var i = 0; i < times; i++) {
//       var temp = deck[i];
//       var random = ((Math.floor(Math.random() * 100)) % deckSize); // 0 - (deckSize-1)
//
//       // swap values
//       deck[i] = deck[random];
//       deck[random] = temp;
//     }
//   }
//
//   function changeCard() {
//     cardNumber++; // next card
//     if (cardNumber >= deckSize) {
//       gameOver = true;
//     } else {
//       cardsDealt.push(deck[cardNumber]);
//       // currentCard.x += 10;
//       // console.log('x: ' + currentCard.x);
//
//       if(cardsDealt.length > 5)
//         console.log('cardsDealt' + cardsDealt);
//       currentCard.loadTexture('loteria', 'card_' + deck[cardNumber] + '.png');
//
//       turn = cardNumber+1;
//     }
//   }
//
//
//
//   function preload() {
//    game.load.atlasJSONHash('loteria', 'images/cards/loteria.png', 'images/cards/loteria.json');
//    game.load.image('border', 'images/cards/border.png');
//
//     generateDeck();
//     console.log('Before' + deck);
//     shuffleDeck();
//     console.log('After shuffle: ' + deck);
//     cardNumber = 0;
//     turn = 1;
//   }
//
//
//   function create() {
//     game.stage.backgroundColor = "#ddd";
//     cardsDealt.push(deck[cardNumber]);
//     console.log('card number: ' + cardNumber);
//     console.log('dealt: ' + deck[cardNumber]);
//     cardBorder = game.add.image(40, 40, 'border');
//     currentCard = game.add.sprite(cardBorder.x + 30, cardBorder.y + 32, 'loteria', 'card_' + deck[cardNumber] + '.png');
//
//     text = game.add.text(250, 16, '', { fill: '#ffffff' });
//
//     currentCard.inputEnabled = true;
//     currentCard.events.onInputUp.add(changeCard, this);
//   }
//
//
//
//   function update() {
//     if (!gameOver)
//       text.text = "Turn: " + turn + " | Card " + deck[cardNumber];
//     else
//       text.text = 'Round Over';
//   }
//
//   function render() {
//   }
// };
