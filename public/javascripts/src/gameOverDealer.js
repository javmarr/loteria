var gameOverDealer = function(gameDealer) { }

gameOverDealer.prototype = {
	init: function(cardsDealt) {
		console.log("Cards Dealt: " + cardsDealt) ;
	},

  create: function() {
	var endText = this.add.text(200, 200, 'Fin del juego. Lograste ganar en'+turn+'intentos tenias una probabilidad de: '+calculateProbability+' de lograrlo en ese numero de intentos', { fontSize: '32px', fill: '#FFF' });
	var endText2 = this.add.text(200, 200, 'ANALISIS DE TU SUERTE:'+calcularSuerte(), { fontSize: '32px', fill: '#FFF' });
	
  	endText.setActive(true).setVisible(true);
	endText2.setActive(true).setVisible(true);
}}

function calculateProbability (){
	  var turns=gameDealer.turns;
	  var combination=factorial(turns)/(factorial(16)*factorial(turns-16));
	  return probability=combination/(Math.pow(54,turns));
}

function factorial(n){
    if(n < 0){
        return "number has to be positive."
    }
    
    //base case
    if(n == 0 || n == 1){
        return 1;
    //recursive case
    }else{
        return n * factorial(n-1);
    }
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

