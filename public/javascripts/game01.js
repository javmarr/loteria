window.onload = function() {
  // mods by Patrick OReilly
  // Twitter: @pato_reilly Web: http://patricko.byethost9.com

  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameBox', { preload: preload, create: create, update: update, render: render });

  function preload() {

    //  You can fill the preloader with as many assets as your game requires
    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.
    //  The second parameter is the URL of the image (relative)
    game.load.image('flyer', '../images/ball.png');
    game.load.image('sky', '../images/sky.png');
    game.load.image('ground', '../images/platform.png');
    game.load.image('star', '../images/star.png');
    game.load.spritesheet('dude', '../images/dude.png', 32, 48); //


  }

  var platforms;

  function create() {

    // start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true; //any object inside group has physics now

    //create platforms to add to group
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    // --



  }

  function update () {
    // nothing required here

  }

  function render () {
  }
};
