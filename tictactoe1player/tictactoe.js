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

	//choose randome boxes until an empty box is found
	do{
		let rand = parseInt(Math.random()*9) + 1;
		idName = idNames[rand-1];

		//check if chosen box is empty
		if(document.getElementById(idName).innerHTML == ""){
			document.getElementById(idName).innerHTML = currentPlayer;
			break;
		}
	}while(true);
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