
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
    groupLoteria.inputEnabled = true;
    
    //q:when is this event calles?
    //a:when the user clicks on the card
    //q:why is not working? 
    //a:because the event is not called when the user clicks on the card, but when the user clicks on the screen
    groupLoteria.events.onInputUp.add(this.changeCard,this);
    console.log("\n\n\n\n\nOn loteria (gameID) " + gameID);
    
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
              sprite.loadTexture('cartaCoinci', 'cartaCoinci.png');
            }
        iIndex++;
        });
      }
     else  {
        console.log('Game over');
        //gameLoteria.state.start('GameOver', true, false, 51);
      }
    }
  })} ,

};



  