let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", "X wins", "O wins"
let numTurns = 0;

// take player turn
function playerTakeTurn (e){
	if(e.innerHTML == ""){
		e.innerHTML = currentPlayer;
		checkGameStatus();
	}else{
		showLightBox("This box is already selected.", "Please try again.");
		console.log("This box is already selected, please try again.");
		return;
	}

	// game is over
	if(gameStatus != ""){
		showLightBox(gameStatus, "Game Over");
	}
}// playerTakeTurn

// after each turn check for a winner, a tie, or continue playing
function checkGameStatus(){
	numTurns++;

	//check for Win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
		return;
	}

	// check for tie
	if(numTurns == 9){
		gameStatus = "Tie Game!"
	}

	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
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
}