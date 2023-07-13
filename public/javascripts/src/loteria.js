
var loteria = function(gameLoteria,groupLoteria){
};

loteria.prototype = {
  preload: function() {
    console.log('loteria board');
    this.load.image('cartaCoinci', '../images/cards/cartaCoinci.png');
    this.load.image('confetti', '../images/temp/pixel_red.png');
    gameLoteria.forceSingleUpdate = true;
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
function endRoundConfetti() {
      /*let rainParticle = this.game.add.bitmapData(15, 50);

      rainParticle.ctx.rect(0, 0, 15, 50);
      rainParticle.ctx.fillStyle = '#9cc9de';
      rainParticle.ctx.fill();
*/
    

    var emitter = this.add.particles('confetti').createEmitter({
      x: { min: 0, max: 800 },    // x-axis range
      y: -50,                     // start y-coordinate (above the screen)
      lifespan: 3000,             // lifespan of each particle (in milliseconds)
      speedY: { min: 200, max: 400 },  // vertical speed range
      scale: { start: 0.5, end: 0 },   // scale of particles
      quantity: 5,                // number of particles emitted per frame
      blendMode: 'ADD'            // blend mode for particles
    });

        
    // Set emitter bounds
    emitter.setScrollFactor(0);
    emitter.setSpeedX(-100, 100);
    emitter.setScale(0.5, 1);

    this.emitter.start(false, 1600, 5, 0);
  }