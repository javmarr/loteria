
var loteria = function(gameLoteria,groupLoteria){
};

loteria.prototype = {
  preload: function() {
    console.log('loteria board');
    this.load.image('cartaCoinci', '../images/cards/cartaCoinci.png');
    
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
    if(message.type === 'cardNumber') 
    {
      
      if(message.data <=50 && message.data>0) {
        var iIndex = 0;
        groupLoteria.forEach(function(sprite) {
            console.log('IMAGE: ' + imageBoard[iIndex]);  
            console.log('card_'+message.data+'.png');
            if(imageBoard[iIndex] === 'card_'+message.data+'.png')
            {
              console.log('!!!!!SUSTITUYENDO.!!!!!!!!!!!!!!!!: ' + imageBoard[iIndex]);  
              //q:why is not working?
              sprite.loadTexture('cartaCoinci', 'cartaCoinci.png');
              //sprite.loadTexture('cartaCoinci', 'cartaCoinci.png');
            }
        iIndex++;
        });
      }
     else  {
        console.log('Game over');
      endRoundConfetti();
        //gameLoteria.state.start('GameOver', true, false, 51);
      }
    }
  })} ,
} ;


emitters = [];
const playRect = {
  x: 0,
  y: 0,
  width: 800,
  height: 600
};

// Create a Phaser.Game instance
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  deviceScale:.9,
  scene: {
    create: createGame
  }
});


function endRoundConfetti() {
  if (emitters.length == 0) {
    createEmitter();
  }

  this.confettiExplosion(3);
};

function createEmitter() {
  const playRect = {width: 800, height: 600, x: 0, y: 0};


  for (let i = 0; i < 5; i++) {
    const randomX = (playRect.x * 1.25) + Math.random() * (playRect.width * 0.75);
    const randomY = (playRect.y * 1.25) + Math.random() * (playRect.height * 0.75);

    this.emitters.push(gameLoteria.add.particles('cheers_confetti_christmas').createEmitter({
      x: randomX,
      y: randomY,
      frame: ["snowflake_1", "snowflake_2", "snowflake_3"],
      lifespan: 2000,
      speedX: { min: -300 / this.game.deviceScale, max: 300 / this.game.deviceScale },
      speedY: { min: -300 / this.game.deviceScale, max: 300 / this.game.deviceScale },
      scale: { start: 0.2 / this.game.deviceScale, end: 0.4 / this.game.deviceScale },
      rotate: { start: 90, end: 180 },
      gravityY: 0
    }));
  }
}

function confettiExplosion(emitters) {
  emitters.forEach((emitter) => {
    emitter.start(true, 2000, null, 10);
  });
};