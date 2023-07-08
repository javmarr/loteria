
var gameOverDealer = function(gameDealer) { }

gameOverDealer.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {

	//q: how to add an animated javascript to this game over screen?
	//a: https://phaser.io/examples/v2/tweens/chain
	//a: https://phaser.io/examples/v2/tweens/complex-chain
	//a: https://phaser.io/examples/v2/tweens/looped-tween
	var gameOverTitle = gameDealer.add.sprite(160, 160, "gameover");
	addRain();
	gameOverTitle.anchor.setTo(0.5, 0.5);
	var probabilidad = calculateProbability();
	var ganaroPerder = 'perder';
	if(turn<=50){ 
		ganaroPerder=`ganar`; 
	}
	alert('Fin del juego. Lograste ' +ganaroPerder+ ' en '+turn+' intentos. Tenias una probabilidad de: '+probabilidad+'% de lograrlo en ese numero de intentos');
	alert('ANALISIS DE TU SUERTE: '+calcularSuerte());
  }}

  function calculateProbability() {
	const tiradasRestantes = 50-turn;
	const N = 54;
	const n = 1;
	const k = 16;
	const totalCards = 50-tiradasRestantes;
  
	let probability = 0;
  
	for (let x = k; x <= totalCards; x++) {
	  const numerator = combination(k, x) * combination(N - k, totalCards - x);
	  const denominator = combination(N, totalCards);
	  probability += numerator / denominator;
	}
  
	return probability.toFixed(4)*100; // Redondeamos a 4 decimales
  }
  
  function combination(n, k) {
	if (k === 0) {
	  return 1;
	}
  
	let result = 1;
  
	for (let i = 1; i <= k; i++) {
	  result *= (n - k + i) / i;
	}
  
	return result;
  }
  

function calcularSuerte (){
	var probability = this.calculateProbability();
	if(probability>0.0 && probability<30)
		return ' Tienes una SUPER SUERTE para el azar... mejor jugar que buscar pareja... es broma';
	if(probability>30 && probability<=60)
		return ' Tienes una suerte promedio similar a la de la mayoria de la poblacion... no te desanimes... es broma';
	if(probability>0.6)
		return ' Tienes una suerte MENOR al promedio, debes serlo en el amor entonces... es broma'
}

function addRain(){

	let rainParticle = this.game.add.bitmapData(15, 50);

	rainParticle.ctx.rect(0, 0, 15, 50);
	rainParticle.ctx.fillStyle = '#9cc9de';
	rainParticle.ctx.fill();

	this.emitter = this.game.add.emitter(this.game.world.centerX, -300, 400);

	this.emitter.width = this.game.world.width;
	this.emitter.angle = 10;

	this.emitter.makeParticles(rainParticle);

	this.emitter.minParticleScale = 0.1;
	this.emitter.maxParticleScale = 0.3;

	this.emitter.setYSpeed(600, 1000);
	this.emitter.setXSpeed(-5, 5);

	this.emitter.minRotation = 0;
	this.emitter.maxRotation = 0;

	this.emitter.start(false, 1600, 5, 0);

}