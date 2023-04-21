
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
    if(message.type === 'cardNumber') 
    {
      groupLoteria.forEach(function(sprite) {
      console.log('message.data: ' + message.data);
      //var image = gameLoteria.cache.getKeys(Phaser.Cache.IMAGE).find(function(key) { return gameLoteria.cache.getImage(key).name === sprite.key; });
      //console.log('sprite.key: ' + image);
      var otIndex = sprite.frameName.slice(5, -4) -1;
      console.log('sprite.key: ' + otIndex);
      console.log('IMAGE: ' + imageBoard[otIndex]);  
      if(imageBoard[otIndex] == 'card_'+message.data+'.png')
       {
        imageBoard[otIndex]] = 'dummyCard.png';
        groupLoteria.createMultiple(1, 'loteria', imageBoard, true, index => {
          return imageBoard[index];
        });
       }
      });
    }
  });
}};