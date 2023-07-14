var gameOver = function(gameLoteria) {}

gameOver.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
  	var gameOverTitle = gameLoteria.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
	endRoundConfetti();
	},

	playTheGame: function() {
		gameLoteria.state.start("Loteria");
	}




};



var emitters = [];


function endRoundConfetti() {
    this.createEmitter();
     this.confettiExplosion();
  }

 function createEmitter() {
    const playRect = {x: .9, y: .9, width: 600, height: 800};
    
    for (let i = 0; i < 5; i++) {
      const randomX = (playRect.x * 1.25) + Math.random() * (playRect.width * 0.75);
      const randomY = (playRect.y * 1.25) + Math.random() * (playRect.height * 0.75);

      emitters.push(gameLoteria.add.emitter(randomX, randomY));
      emitters[i].makeParticles('confetti1', ["confetti2", "confetti3", "confetti4"]);
      emitters[i].setSize(playRect.height / 2, playRect.height / 2);
      emitters[i].gravity = 0;
      emitters[i].setAlpha(0, 1, 1000, Phaser.Easing.Linear.None, true);
      emitters[i].setRotation(90, 180);
      emitters[i].setScale(
        0.2 / .9,
        0.4 / .9,
        0.2 / .9,
        0.4 / .9
      );
      emitters[i].setXSpeed(-300 / .9, 300 / .9);
      emitters[i].setYSpeed(-300 / .9, 300 / .9);
    }
  }

  function confettiExplosion() {
    emitters.forEach((emitter) => {
      emitter.start(false, 2000, 5, 0);
    });
  }
