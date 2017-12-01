	
	/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
      
	  	   __    _    _  _   __      __   __    ___       __   __        __  __
	 	    / _   /_\  | \/ | |__     |  | |__     |  |__| |__| |  | |\ | |__ |__  
		    \__| /   \ |    | |__     |__| |       |  |  | | \  |__| | \| |__  __|
	                         
	                               _    __   __    _    __
												  |__|  /_\  |  \ |  \  /_\  |__|
												  |  | /   \ |__/ |__/ /   \ | \


	/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
	document.getElementById('gameSound').play();
	let couleur="";
	let valeur="";
	let cpt =0;
	let level=0;
	
	let cardSelected="";
	let score = 0;
			
/*------------------------------------
*	return : table aléatoire [0..12]  
-------------------------------------*/
function randomNumbers(){

	let numbers=[];
	let num;
	let i=0;

	while(i < 12) {
		
		num = Math.floor(Math.random()*12);

		if (numbers.includes(num) == false){

			numbers[i]=num;
			i++;
		}

	}
	return numbers;
}

/*---------------------------------
* function : melenger un les cartes 
* return : tableau mélangé 
---------------------------------*/
function melangeCarte(){

	let cards=creerJeuDeCarte();
	let randomNum=randomNumbers();
	let cartemelangee=[];
	let name="";
	let tag="";
	let id="";
	cardSelected="";
	cpt=0;
	level=0;
	document.getElementById('score').innerHTML='Score : '+score;
	for (var i = 0; i < 12; i++) {
			
			cartemelangee.push(cards[randomNum[i]]);
	}				
		console.log(cartemelangee);
		document.getElementById("container").innerHTML="";
		document.getElementById("container").innerHTML +="<ul id='resultat'></ul>";
		for (var j = 0; j < 12; j++) {
				
				id=cartemelangee[j].numero+"-"+cartemelangee[j].couleur;
				name=cartemelangee[j].couleur;

				document.getElementById("resultat").innerHTML +="<li>\
				<img src='img/back.jpg' id='"+id+"' alt='"+name+"' class='back hoverClass backflip' onclick='tourner(\""+id+"\")' name='"+name+"'>\
				<img src='img/"+name+".jpg'  class='front frontflip' id='front"+id+"'>\
				</li>";				
		}
		/* ---- */
		setTimeout(function () {
        cacher();
    }, 10000);
}

/*---------------------------------------------
*	fonction qui fait tourner tous les cartes 
---------------------------------------------*/
function cacher(){

	var elementsBack = document.getElementsByClassName('back');
	var elementsFront = document.getElementsByClassName('front');

	for (var i = 0; i < elementsBack.length; i++) {
	    elementsBack[i].classList.remove('backflip');
	    elementsFront[i].classList.remove('frontflip');
	}
}

/*
*  bloquer le clique sur les cartes 
*/
function gameOver(etat){

	var elementsBack = document.getElementsByClassName('back');
	if (etat==true) {
		for (var i = 0; i < elementsBack.length; i++) {
		    elementsBack[i].onclick="";    
		}
	}
}

/*------------------------------------------------------------------------
* fonction qui tourne la carte pour qu'elle sera visible (selectionnée)
* du cout cette fonction lance la fonction addScore() pour additionner 
	la valeur de carte selectionné au score.
------------------------------------------------------------------------*/
function tourner(id) {

	let nameOfCard;
	let popypMessage="";
	document.getElementById('flip').play();
	document.getElementById(id).classList.add("backflip");
	document.getElementById("front"+id).classList.add("frontflip");

	nameOfCard= document.getElementById(id).name;
		
	if (cardSelected == ""){
		cardSelected = nameOfCard;
		console.log('last card selected = '+cardSelected);
		cpt++;
	}
	else{

		if(nameOfCard==cardSelected && cpt<3){
			cpt++
				if(cpt==3){
					cardSelected="";
					level++;
					cpt=0;
				}
		}
		else{
			gameOver(true);
			popypMessage='<div><p>GAME OVER</p><button class="rejouer" onclick="rejouer()"> Recommencer</button></div>';
			popUp(popypMessage);
			score=0;	
		}
	}

	if(level==4){
		score =score+50;
		document.getElementById('score').innerHTML='Score : '+score;
		popypMessage='<div><p>BINGO </p><button class="rejouer" onclick="rejouer()"> Continuer</button></div>';
			popUp(popypMessage);
	}
		
}
/*-------------------------------------
* afficher un pop-up avec un message 
-------------------------------------*/
function popUp (message) {
		let pop=	document.getElementById('pop-up');
		pop.innerHTML=message;
		pop.style.display="initial";
		
		setTimeout(function(){
			pop.classList.add('flow');
			}, 1000);
}

/*-----------------------------
* function : relance le jeux
-----------------------------*/

function rejouer(){

	document.getElementById('pop-up').classList.remove('flow');
	
	setTimeout(function(){
		document.getElementById('pop-up').style.display="none";
		melangeCarte();
	}, 500);
}

/*------------------------------------------------------------------------
* fonction pour calculer la somme des valeurs des carte selectionnées 
* Cette fonction se déclanche à chaque selection du carte et appelé dans 
	la fonction tourner();
------------------------------------------------------------------------*/
function addScore(num){
		let somme;
		let i=parseInt(document.getElementById("score").innerHTML,10);
		somme = parseInt(num,10)+i;
		document.getElementById("score").innerHTML=somme;

		if (somme>21) {
			document.getElementById('bloque').style.top = "0vh"
		};

}

/*----------------------------------------------------
* function : creer les elements du jeux de carte
* return : tableau = [{ nameCard , numero }]
----------------------------------------------------*/
function creerJeuDeCarte() {

	const couleur = ['baratheon','greyjoy','lannister','mormont','stark','targayen','tyrell'];
	
	let model=new Array(4);
	let jeuCarte = new Array(12);
	let numero=[1,2,3,4];

	
	let cpt = 0;
	let cptCouleur = 0;
	let j=0;

/*
*	boucle pour créer une liste des numero aléatoire de 0 à 4
*/
	while(j < 4) {
		num = Math.floor(Math.random()*7);
		if (model.includes(num) == false){
					model[j]=num;
				j++
		}		
	}
	
/*
* boucle for pour composer les cartes à jouer
*/
for (var i = 0; i < jeuCarte.length; i++) {
		
		if(i!=0 && i%3==0) {
			cptCouleur=cptCouleur+1;
		}
		jeuCarte[i] ={
				couleur : couleur[model[cptCouleur]],
				numero : numero[i%3],
		}
};
	
	return jeuCarte;

}/* fin de fonction creerJeuDeCarte() ------------ */



