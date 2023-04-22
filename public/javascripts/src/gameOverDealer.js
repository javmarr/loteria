var gameOverDealer = function(gameDealer) { }

gameOverDealer.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
	var gameOverTitle = gameDealer.add.sprite(160, 160, "gameover");
    gameOverTitle.anchor.setTo(0.5, 0.5);
	var probabilidad = calculateProbability();
	var ganaroPerder = 'perder';
	if(turn<=50){ ganaroPerder=`ganar`;}
	alert('Fin del juego. Lograste ' +ganaroPerder+ 'en '+turn+' intentos tenias una probabilidad de: '+probabilidad+' de lograrlo en ese numero de intentos');
	alert('ANALISIS DE TU SUERTE: '+calcularSuerte());
  }}

  function calculateProbability() {
	const tiradasRestantes = 50-turn;
	const N = 54;
	const n = 1;
	const k = 16;
	const totalCards = 50-turn;
  
	let probability = 0;
  
	for (let x = k; x <= totalCards; x++) {
	  const numerator = combination(k, x) * combination(N - k, totalCards - x);
	  const denominator = combination(N, totalCards);
	  probability += numerator / denominator;
	}
  
	return probability.toFixed(4); // Redondeamos a 4 decimales
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
	if(probability>0.0<0.3)
		return ' Super afortuna@ en el azar... mejor jugar que buscar pareja... es broma';
	if(probability>0.3<0.6)
		return ' Eres un poco afortunad@ en el amor, un poco en el azar, vida balanceada';
	if(probability>0.6)
		return ' Eres afortunad@ en el amor, en el azar no tanto... es broma'
}

