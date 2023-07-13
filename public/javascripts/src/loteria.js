
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

//q: create emmiters initializatio here?
var emitters = [];



function endRoundConfetti() {
  if (emitters.length == 0) {
    createEmitter();
  }

  this.confettiExplosion(3);
};

function createEmitter() {
  const playRect = this.game.gameAssets.playRect;
  emitters = [];

  for (let i = 0; i < 5; i++) {
    const randomX = (playRect.x * 1.25) + Math.random() * (playRect.width * 0.75);
    const randomY = (playRect.y * 1.25) + Math.random() * (playRect.height * 0.75);

    emitters.push(this.game.add.emitter(randomX, randomY));
    emitters[i].makeParticles('cheers_confetti_christmas', ["snowflake_1", "snowflake_2", "snowflake_3"]);
    emitters[i].setSize(playRect.height / 2, playRect.height / 2);
    emitters[i].gravity = 0;
    emitters[i].setAlpha(0, 1, 1000, Phaser.Easing.Linear.None, true);
    emitters[i].setRotation(90, 180);
    emitters[i].setScale(
      0.2 / game.deviceScale,
      0.4 / game.deviceScale,
      0.2 / game.deviceScale,
      0.4 / game.deviceScale
    );
    emitters[i].setXSpeed(-300 / game.deviceScale, 300 / game.deviceScale);
    emitters[i].setYSpeed(-300 / game.deviceScale, 300 / game.deviceScale);
  }
};

function confettiExplosion(emitters) {
  emitters.forEach((emitter) => {
    emitter.start(true, 2000, null, 10);
  });
};