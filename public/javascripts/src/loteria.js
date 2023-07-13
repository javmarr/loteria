
var loteria = function(gameLoteria,groupLoteria){
};
var manager=null;
var emitter=null;
var circle=null;

loteria.prototype = {
  preload: function() {
    console.log('loteria board');
    this.load.image('cartaCoinci', '../images/cards/cartaCoinci.png');
    gameLoteria.forceSingleUpdate = true;
    gameLoteria.load.path='images/temp/';
    gameLoteria.load.images(['pixel_blue', 'pixel_green', 'pixel_red', 'pixel_white', 'pixel_yellow']);
  },

  create: function() {
    gameLoteria.stage.backgroundColor = "#BA97FF";
   
    // card = this.game.add.group(); // card containing image and border
    // cardBorder = card.create(0, 0, 'border');
    // cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + cardNumber + '.png');
    console.log('imageboard in phaser: ' + imageBoard);

    manager = gameLoteria.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 3000,
        image: ['pixel_blue', 'pixel_green', 'pixel_red', 'pixel_white', 'pixel_yellow'],
        vx: { min: -0.5, max: 0.5 },
        vy: { min: -1, max: -2 },
        rotation: { delta: 2 },
        blendMode: 'ADD',
        alpha: { initial: 0, value: 1, control: 'linear' }
    };

    manager.addData('basic', data);

    circle = manager.createCircleZone(24);

    emitter = manager.createEmitter();

    emitter.force.y = 0.05;

    emitter.addToWorld();

    gameLoteria.add.image(432, 487, 'logo');


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
  emitter.emit('basic', gameLoteria.input.x, gameLoteria.input.y, { zone: circle, total: 2 });
  }