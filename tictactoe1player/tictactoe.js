let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", "X wins", "O wins"
let numTurns = 0;
let idNames=["one", "two", "three", "four", "five", 
				"six", "seven", "eight", "nine"];

// reset board and all variables
function newGame(){
	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
	}

	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";

	changeVisibility("controls");
}

// take player turn
function playerTakeTurn (e){
	if(e.innerHTML == ""){
		e.innerHTML = currentPlayer;
		checkGameStatus();

		//if game not over, computer goes
		if(gameStatus == ""){
			setTimeout(function(){
					computerTakeTurn();
					checkGameStatus();
				}, 500
			);
		}
	}else{
		showLightBox("This box is already selected.", "Please try again.");
		return;
	}

}// playerTakeTurn

// randomly chooses a free box
function computerTakeTurn(){
	
	let idName = "";
	var cb = []; // current board
		 	cb[0] = "";
		 	cb[1] = document.getElementById("one").innerHTML;
		 	cb[2] = document.getElementById("two").innerHTML;
		 	cb[3] = document.getElementById("three").innerHTML;
		 	cb[4] = document. getElementById("four").innerHTML;
		 	cb[5] = document.getElementById("five").innerHTML;
		 	cb[6] = document.getElementById("six").innerHTML;
		 	cb[7] = document.getElementById("seven").innerHTML;
		 	cb[8] = document.getElementById("eight").innerHTML;
		 	cb[9] = document.getElementById("nine").innerHTML;
	//choose randome boxes until an empty box is found
			
			var x = 1;
			var y = 2;
			var z = 3;
			for(var i = 0; i < 8; i++){
				if(cb[x] == "" && cb[y] != "" && cb[y] == cb[z]){
					idName = (x);
				}else if(cb[y] == "" && cb[x] != "" && cb[x] == cb[z]){
					idName = (y);
				}else if(cb[z] == "" && cb[y] != "" && cb[y] == cb[x]){
					idName = (z);
				}
				if(i == 0){
					x = 4;
					y = 5;
					z = 6;
				}else if(i == 1){
					x = 7;
					y = 8;
					z = 9;
				}else if(i == 2){
					x = 1;
					y = 4;
					z = 7;
				}else if(i == 3){
					x = 2;
					y = 5;
					z = 8;
				}else if(i == 4){
					x = 3;
					y = 6;
					z = 9;
				}else if(i == 5){
					x = 1;
					y = 5;
					z = 9;
				}else if(i == 6){
					x = 3;
					y = 5;
					z = 7;
				}
			}

			if(idName == 1){
				idName = "one";
			}else if(idName == 2){
				idName = "two";
			}else if(idName == 3){
				idName = "three";
			}else if(idName == 4){
				idName = "four";
			}else if(idName == 5){
				idName = "five";
			}else if(idName == 6){
				idName = "six";
			}else if(idName == 7){
				idName = "seven";
			}else if(idName == 8){
				idName = "eight";
			}else if(idName == 9){
				idName = "nine";
			}
			
		if(idName == ""){
			do{
				let rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand-1];
				if(document.getElementById(idName).innerHTML == ""){
					break;
				}
			}while(true);
		}

		//change to O
		document.getElementById(idName).innerHTML = currentPlayer;
}

// after each turn check for a winner, a tie, or continue playing
function checkGameStatus(){
	numTurns++;

	//check for Win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
	}else if(numTurns == 9){
		gameStatus = "Tie Game!"
	}

	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");

	// game is over
	if(gameStatus != ""){
		setTimeout(function() {showLightBox(gameStatus, "Game Over");}, 500);
	}
} // checkGameStatus

// check for a Win, there are 8 win paths
function checkWin(){
	let cb = []; // current board
 	cb[0] = "";
 	cb[1] = document.getElementById("one").innerHTML;
 	cb[2] = document.getElementById("two").innerHTML;
 	cb[3] = document.getElementById("three").innerHTML;
 	cb[4] = document. getElementById("four").innerHTML;
 	cb[5] = document.getElementById("five").innerHTML;
 	cb[6] = document.getElementById("six").innerHTML;
 	cb[7] = document.getElementById("seven").innerHTML;
 	cb[8] = document.getElementById("eight").innerHTML;
 	cb[9] = document.getElementById("nine").innerHTML;

 	// top row
 	if ((cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3])||
 		(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6])||
 		(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9])||
 		(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7])||
 		(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8])||
 		(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9])||
 		(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9])||
 		(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7])
 		){
 		return true;
 	}

}

// change the visibility of divID
function changeVisibility(divID){
	var element = document.getElementById(divID);

	//if element exists, toggle it's class name
	//between hidden and unhidden
	if(element){
		element.className = (element.className == "hidden")? 'unhidden' : 'hidden';
	}
}// changeVisibility

// display message in lightbox
function showLightBox(message, message2){
	// set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}

function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

	//if the game is over, show controls
	if(gameStatus != ""){
		changeVisibility("controls");
	}
}// continueGame