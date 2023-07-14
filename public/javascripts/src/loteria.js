
var loteria = function(gameLoteria,groupLoteria){
};

loteria.prototype = {
  preload: function() {
    gameLoteria.forceSingleUpdate = true;
    console.log('loteria board');
    this.load.image('cartaCoinci', '../images/cards/cartaCoinci.png');
    this.load.image('confetti1', '../images/temp/pixel_red.png');
    this.load.image('confetti2', '../images/temp/pixel_blue.png');
    this.load.image('confetti3', '../images/temp/pixel_green.png');
    this.load.image('confetti4', '../images/temp/pixel_yellow.png');
    },

  create: function() {
    gameLoteria.stage.backgroundColor = "#BA97FF";
   
    // card = this.game.add.group(); // card containing image and border
    // cardBorder = card.create(0, 0, 'border');
    // cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + cardNumber + '.png');
    console.log('imageboard in phaser: ' + imageBoard);

    


    groupLoteria = gameLoteria.add.group();
    //groupLoteria.createMultiple(1, 'loteria', imageBoard, true);
    groupLoteria.createMultiple(1, 'loteria', imageBoard, true, index => {
      return imageBoard[index];
    });
    groupLoteria.align(4, 4, 210, 330);
    groupLoteria.scale.set(.9, .9);
    groupLoteria.alive=true;
    
    window.addEventListener('message', function(event) 
   {
    var message = event.data;
    console.log('message: ' + message.type + ' ' + message.data);
    //q:how to get the turn from message?
    //a: message.data.type
   
      if(message.cardNumber <=50 && message.cardNumber>0) {
        var iIndex = 0;
        groupLoteria.forEach(function(sprite) {
            console.log('IMAGE: ' + imageBoard[iIndex]);  
            console.log('card_'+message.cardNumber+'.png');
            if(imageBoard[iIndex] === 'card_'+message.cardNumber+'.png')
            {
              console.log('!!!!!SUSTITUYENDO.!!!!!!!!!!!!!!!!: ' + imageBoard[iIndex]);  
              //q:why is not working?
              sprite.loadTexture('cartaCoinci', 'cartaCoinci.png');
              //sprite.loadTexture('cartaCoinci', 'cartaCoinci.png');
            }
        iIndex++;

        });
      }     
       var turn = message.turn;
      console.log('turn: ' + turn);
      if(turn>50) 
      {
        endRoundConfetti();
      }
        //gameLoteria.state.start('GameOver', true, false, 51);
  });
  } 
}

var emitters = [];


function endRoundConfetti() {
    this.createEmitter();
     this.confettiExplosion();
  }

 function createEmitter() {
    const playRect = {x: .9, y: .9, width: 600, height: 800};
    
    for (let i = 0; i < 5; i++) {
      const randomX = (playRect.x * 1.25) + Math.random() * (playRect.width * 0.75);
      const randomY = (playRect.y * 1.25) + Math.random() * (playRect.height * 0.75);

      emitters.push(gameLoteria.add.emitter(randomX, randomY));
      emitters[i].makeParticles('confetti1', ["confetti2", "confetti3", "confetti4"]);
      emitters[i].setSize(playRect.height / 2, playRect.height / 2);
      emitters[i].gravity = 0;
      emitters[i].setAlpha(0, 1, 1000, Phaser.Easing.Linear.None, true);
      emitters[i].setRotation(90, 180);
      emitters[i].setScale(
        0.2 / .9,
        0.4 / .9,
        0.2 / .9,
        0.4 / .9
      );
      emitters[i].setXSpeed(-300 / .9, 300 / .9);
      emitters[i].setYSpeed(-300 / .9, 300 / .9);
    }
  }

  function confettiExplosion() {
    emitters.forEach((emitter) => {
      emitter.start(true, 2000, null, 10);
    });
  }
