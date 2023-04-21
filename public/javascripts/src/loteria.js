
var loteria = function(gameLoteria,groupLoteria){
};

loteria.prototype = {
  preload: function() {
    console.log('loteria board');
    
  },

  create: function() {
    gameLoteria.stage.backgroundColor = "#ffffff";

    // card = this.game.add.group(); // card containing image and border
    // cardBorder = card.create(0, 0, 'border');
    // cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + cardNumber + '.png');
    console.log('imageboard in phaser: ' + imageBoard);

    groupLoteria = gameLoteria.add.group();
    groupLoteria.createMultiple(1, 'loteria', imageBoard, true);
    groupLoteria.align(4, 4, 210, 330);
    groupLoteria.scale.set(.9, .9);
    groupLoteria.alive=true;

    window.addEventListener('message', function(event) 
   {
    var message = event.data;
    if(message.type === 'cardNumber') 
    {
      groupLoteria.forEach(function(sprite) {
      console.log('message.data: ' + message.data);
      var image = sprite.key;
      console.log('sprite.key: ' + image);
      if(image == 'card_'+message.data+'.png')
       {
        console.log('sprite.key: ' + sprite.key);
        sprite.loadTexture('loteria', 'dummyCard.png');
       }
      });
    }
  });
}};