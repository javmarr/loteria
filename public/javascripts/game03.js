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
  var ship;

  function preload() {
    game.load.spritesheet('ship', '../images/ship.png', 67, 82);

  }

  function create() {

    // start physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = 0x333333;

    // Define motion constants
    ROTATION_SPEED = 180; // degrees/second
    ACCELERATION = 200; // pixels/second/second
    MAX_SPEED = 250; // pixels/second

    // Add the ship to the stage in the center
    ship = game.add.sprite(game.width/2, game.height/2, 'ship');
    // ship.animations.add('off', [0], 10, false);
    // ship.animations.add('on', [1], 10, false);


    ship.anchor.setTo(0.5, 0.5);
    ship.angle = 0; // Point the ship up

    // Enable physics on the ship
    game.physics.enable(ship, Phaser.Physics.ARCADE);

    // Set maximum velocity
    ship.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED); // x, y

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    // game.input.keyboard.addKeyCapture([
    //     Phaser.Keyboard.LEFT,
    //     Phaser.Keyboard.RIGHT,
    //     Phaser.Keyboard.UP,
    //     Phaser.Keyboard.DOWN
    // ]);

    // text
    // scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fll: '#000' });

    // keyboard input
    cursors = game.input.keyboard.createCursorKeys();



  }

  function update () {

    // collision check
    // game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // loop around
    if (ship.x > game.width) ship.x = 0;
    if (ship.x < 0) ship.x = game.width;
    if (ship.y > game.height) ship.y = 0;
    if (ship.y < 0) ship.y = game.height;

    // player movement
    if (cursors.left.isDown) {
      // move left
      ship.body.angularVelocity = -ROTATION_SPEED;
    } else if (cursors.right.isDown) {
      // move right
      ship.body.angularVelocity = ROTATION_SPEED;
    } else {
      ship.body.angularVelocity = 0;
    }

    // pressing up key
    if (cursors.up.isDown) {

        ship.body.acceleration.x = Math.sin(ship.rotation) * ACCELERATION;
        ship.body.acceleration.y = -Math.cos(ship.rotation) * ACCELERATION;
        // console.log('sin: ' + Math.sin(ship.rotation) + ' | cos: ' + Math.cos(ship.rotation));
        // console.log('( ' + ship.body.acceleration.x + ', ' + ship.body.acceleration.y + ')');

        // turn engine on
        ship.frame = 1;

    } else {
      ship.body.acceleration.setTo(0, 0);

      // turn engine off
      ship.frame = 0;
    }

  }

  function render () {
  }
};
