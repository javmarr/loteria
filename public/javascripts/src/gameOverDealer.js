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
	const deckSize = 54;
	const boardSize = 16;
	const Iturns = turn;
  
	let cardsLeft = turn-deckSize;
	let cardsInBoard = 0;
	let probability = 0;
  
	for (let i = 1; i <= Iturns; i++) {
	  const cardsDrawn = Math.min(cardsLeft, boardSize - cardsInBoard);
	  cardsLeft -= cardsDrawn;
	  cardsInBoard += cardsDrawn;
  
	  if (cardsInBoard === boardSize) {
		probability = 1;
		break;
	  }
	}
  
	if (probability === 0) {
	  probability = 1 - Math.pow((cardsLeft / deckSize), turn);
	}
  
	return probability;
  }

function calcularSuerte (){
	var probability = this.calculateProbability();
	if(probability>0.0<0.3)
		return ' Eres afortunad@ en el amor, en el azar no tanto... es broma'
	if(probability>0.3<0.6)
		return ' Eres un poco afortunad@ en el amor, un poco en el azar, vida balanceada';
	if(probability>0.6)
		return ' Super afortuna@ en el azar... mejor jugar que buscar pareja... es broma';
}

