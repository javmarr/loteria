var gameOverDealer = function(gameDealer) { }

gameOverDealer.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
	var endText = this.add.text(1000, 1000, 'Fin del juego. Lograste ganar en'+turn+'intentos tenias una probabilidad de: '+calculateProbability+' de lograrlo en ese numero de intentos', { fontSize: '32px', fill: '#FFF' });
	var endText2 = this.add.text(1000, 1000, 'ANALISIS DE TU SUERTE:'+calcularSuerte(), { fontSize: '32px', fill: '#FFF' });
  }}

function calculateProbability() {
	const deckSize = 54;
	const boardSize = 16;
	const Iturns = turn;
  
	let cardsLeft = deckSize;
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
	  probability = 1 - Math.pow((cardsLeft / deckSize), turns);
	}
  
	return probability;
  }

function calcularSuerte (){
	var probability = this.calculateProbability();
	if(probability>0.0<0.3)
		return 'Eres afortunad@ en el amor, en el azar no tanto'
	if(probability>0.3<0.6)
		return 'Eres un poco afortunad@ en el amor, un poco en el azar, vida balanceada';
	if(probability>0.6)
		return 'Super afortuna@ en el azar... mejor jugar que buscar pareja... es broma';
}

