var canvas_compteur;
var ctx;
var canvas_vitesse;
var ctx2;

var vitesse;
var duree;

var sonKlaxon;
var sonVictoire;
var sonAcceleration;

var canvas_compteur = document.getElementById('compteur');
var context = canvas_compteur.getContext('2d');

var canvas_vitesse = document.getElementById('vitesse');
var context_vitesse = canvas_vitesse.getContext('2d');

function drawCompteur() {
	// à compléter

	// Le cercle de plus grand diametre
    
    context.beginPath();
    context.arc(250, 250, 210, 0, Math.PI * 2);
    context.fillStyle = "rgb(230, 230, 230)";
    context.fill();
	
	// Le cercle intermédiaire

    context.beginPath();
    context.arc(250, 250, 200, 0, Math.PI * 2);
    context.fillStyle = "rgb(200, 200, 200)";
    context.fill();
    context.stroke();
    
	// Le plus petit cercle
    
    context.beginPath();
    context.arc(250, 250, 185, 0, Math.PI * 2);
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();
    context.stroke();


    // Get canvas element and context
    var canvas_compteur = document.getElementById('compteur');
    var context = canvas_compteur.getContext('2d');

	// Le support de l'aiguille
    context.beginPath();
    context.arc(250, 250, 30, 0, Math.PI * 2);
    context.fillStyle = "rgb(0, 0, 0)";
    context.fill();
	
	// L'image du compteur numérique
    var compteurNum = new Image();
    compteurNum.src = 'images/compteur_numerique.jpg';
    compteurNum.onload = function(){ // Wait for the image to load
        context.drawImage(compteurNum, 250-(compteurNum.width/2),300);
    }

	// le texte km/h

    /*context.font = "12pt Roboto,Geneva,Arial";
    context.fillStyle = "#fff";
    context.fillText(vitesse, 240, 322);*/
    
    context.font = "12pt Roboto,Geneva,Arial";
    context.fillStyle = "#000";
    context.fillText("km/h", 230, 210);
	
	// les graduations
    
    context.save();
    context.translate(250, 250);
    context.rotate(Math.PI-Math.PI/6);
    context.font = "12pt Roboto,Geneva,Arial";
    for(i=0; i<41; i++){
        context.beginPath();
        context.moveTo(155, 0);
        if(i%2 == 0){
            context.lineTo(172, 0);
            context.lineWidth = 4;
            if(i%4 ==0){
                context.fillStyle = "#000";
                context.fillText(i*5, 120, 5);
            }
        }else{
            context.lineTo(165, 0);
            context.lineWidth = 1;
        }
        context.stroke();
        context.rotate(Math.PI/30);
    }
    context.restore();
	
	// L'aiguille
		
}

function drawVitesse() {
    // La vitesse numérique 
    context_vitesse.save();
    context_vitesse.beginPath();

    context_vitesse.font = "16pt Roboto,Geneva,Arial";
    context_vitesse.fillStyle = "#fff";
    context_vitesse.fillText(vitesse, 245, 325);
    context_vitesse.restore();

    context_vitesse.save();
    context_vitesse.translate(250, 250);
    context_vitesse.rotate(((Math.PI / 30) * (25 + vitesse/5)));
    context_vitesse.beginPath();
    context_vitesse.moveTo(30,0);
    context_vitesse.lineTo(150,0);
    context_vitesse.lineWidth = 4;
    context_vitesse.strokeStyle = 'red';
    context_vitesse.stroke();
    context_vitesse.restore();
}

function moveVitesse() {
	// à compléter
    sonKlaxon = document.createElement('audio');
    sonKlaxon.src = "./medias/son/klaxon.mp3";


    context_vitesse.clearRect(0,0, 500, 500);
	duree++;
	if (keydown.up) {
		if (vitesse < 200) {
			vitesse++;
		} else {

		}
	}else if (keydown.down) {
        if (vitesse > 0) {
            vitesse--;
        } else {
        
        }
    }else{
        if(duree % 3 ==  0 && vitesse > 0){
            vitesse--;
        }
    }


    if (keydown.space) {
        if(duree % 10 ==  0){
            sonKlaxon.play();
        }
    }



}

function animationLoop() {
    moveVitesse();
	drawVitesse();
}

function init() {
    vitesse = 0;
    duree = 0;
    drawCompteur();
    setInterval(animationLoop, 1000 / 70);
}

window.onload = function() {
    init();
};