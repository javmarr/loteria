
var loteria = function(game){
};

loteria.prototype = {
  preload: function() {
    console.log('loteria board');
  },

  create: function() {
    this.game.stage.backgroundColor = "#000000";

    // card = this.game.add.group(); // card containing image and border
    // cardBorder = card.create(0, 0, 'border');
    // cardImage = card.create(cardBorder.x+30, cardBorder.y+32, 'loteria', 'card_' + cardNumber + '.png');
    console.log('imageboard in phaser: ' + imageBoard);

    var group = game.add.group();
    group.createMultiple(1, 'loteria', imageBoard, true);
    group.align(4, 4, 210, 330);
    group.scale.set(.9, .9);

    if (boardLayout == "halfBoard") {
      for (var i = 0, len = group.children.length; i < len; i++) {
        console.log(group.children[i]);
        if (![0,3,5,6,9,10,12,15].includes(i)){
            group.children[i].alpha = 0;
        }
      }
    }
  }

};













/*

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    // game.load.image('ufo', 'assets/sprites/ufo.png');
    // game.load.image('diamond', 'assets/sprites/diamond.png');
    // game.load.image('diamond', 'assets/sprites/diamond.png');
    game.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', 32, 24);
    // game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);
    // game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

}

function create() {

    var group = game.add.group();

    //  Creates 24 sprites FOR EACH FRAME
    group.createMultiple(24, 'diamonds', [0, 1, 2, 3, 4], true);

    // sprites.createMultiple(20, ['diamonds', 'balls'], [0, 1, 2], true);

    //  Align the sprites into rows of 12, by however many we need (the -1 argument)
    //  With 48x48 pixel spacing per sprite
    group.align(12, -1, 48, 48);

    group.x = 100;
    group.y = 64;

}
*/
