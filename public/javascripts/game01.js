// point tracking
var score = 0;
var scoreText;

function collectStar(player, star) {
  // remove the star
  star.kill();
  score += 10;
  scoreText.text = 'Score: ' + score;
}

window.onload = function() {
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

  // groups
  var platforms;
  var stars;

  var player;
  var cursors;
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

    // create stars
    stars = game.add.group();
    stars.enableBody = true;

    // 12 stars spaced appart
    var distBetween = 70;
    for (var i = 0; i < 12; i++) {
      var star = stars.create(i * distBetween, Math.random() * 100, 'star');
      star.body.gravity.y = 100;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    // two animations
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);



    // text
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fll: '#000' });

    // keyboard input
    cursors = game.input.keyboard.createCursorKeys();



  }

  function update () {

    // collision check
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // player movement
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      // move left
      player.body.velocity.x = -150;
      player.animations.play('left');
    } else if (cursors.right.isDown) {
      // move right
      player.body.velocity.x = 150;
      player.animations.play('right');
    } else {
      // stand still
      player.animations.stop();
      player.frame = 4; // face forwards
    }

    // player can jump if touching the ground
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }



  }

  function render () {
  }
};
