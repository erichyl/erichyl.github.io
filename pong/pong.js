// global variables
var scoreLeft = 0;
var scoreRight = 0;
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = startPositionOfPaddle1;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = startPositionOfPaddle2;
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;
const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var bounce = new sound("Ping.mp3");
var out = new sound("Buzzer.mp3");
var power1Used = false;
var power2Used = false;

//used to control game start/stop
var controlPlay;

//starts the movement of the ball
/*window.addEventListener('load', function() {
	startBall();
});*/

document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode);
	if(e.keyCode == 87 || e.which == 87){
		speedOfPaddle1 = -10;
	}
	if(e.keyCode == 83 || e.which == 83){
		speedOfPaddle1 = 10;
	}
	if(e.keyCode == 38 || e.which == 38){
		speedOfPaddle2 = -10;
	}
	if(e.keyCode == 40 || e.which == 40){
		speedOfPaddle2 = 10;
	}
	if(e.keyCode == 69){
		if(power1Used == false){
			power1Used = true;
			changeVisibility("power1");
			topSpeedOfBall *= -3;
			leftSpeedOfBall *= -3;
		}
	}
	if(e.keyCode == 191){
		if(power2Used == false){
			power2Used = true;
			changeVisibility("power2");
			topSpeedOfBall *= -3;
			leftSpeedOfBall *= -3;
		}
	}
});

document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode);
	if(e.keyCode == 87 || e.which == 87 || e.keyCode == 83 || e.which == 83){
		speedOfPaddle1 = 0;
	}
	if(e.keyCode == 38 || e.which == 38 || e.keyCode == 40 || e.which == 40){
		speedOfPaddle2 = 0;
	}
});

//object constructor to play sound
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//start the ball movement
function startBall(){
	let message1 = "";
	let message2 = "";
	if(scoreLeft == 10){
		message1 = "Player 1 wins with " + scoreLeft + " points!";
		message2 = "Player 2 had " + scoreRight + " points.";
		showLightBox(message1, message2);
		pauseGame();
	}else if(scoreRight == 10){
		message1 = "Player 2 wins with " + scoreRight + " points!";
		message2 = "Player 1 had " + scoreLeft + " points.";
		showLightBox(message1, message2);
		pauseGame();
	}
		let direction = 1;
		topPositionOfBall = startTopPositionOfBall;
		leftPositionOfBall = startLeftPositionOfBall;

		//50% chance of starting in either direction (left or right)
		if(Math.random() < 0.5){
			direction = -1;
		}
		topSpeedOfBall = Math.random() * 2 + 4;
		leftSpeedOfBall = direction * (Math.random() * 2 + 4);

}// startBall

// update positions of elements
function show(){
	//update positions of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	if(positionOfPaddle1 <= 0){
		positionOfPaddle1 = 0;
	}
	if(positionOfPaddle2 <= 0){
		positionOfPaddle2 = 0;
	}
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight){
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}
	if(positionOfPaddle2 >= gameboardHeight - paddleHeight){
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}

	// if ball hits top, or bottom of gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight){
		bounce.play();
		topSpeedOfBall *= -1;
	}

	// ball on left edge of gameboard
	if(leftPositionOfBall <= paddleWidth){
		//if ball hits left paddle, change direction
		if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1.2;
			topSpeedOfBall *= 1.1;
		}else{
			out.play();
			scoreRight++;
			document.getElementById("right").innerHTML = "Player 2 : " + scoreRight;
			startBall();
		}
	}
	// ball on right edge of gameboard
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		//if ball hits right paddle, change direction
		if(topPositionOfBall > positionOfPaddle2 &&
			topPositionOfBall < positionOfPaddle2 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1.2;
			topSpeedOfBall *= 1.1;
		}else{
			out.play();
			scoreLeft++;
			document.getElementById("left").innerHTML = "Player 1 : " + scoreLeft;
			startBall();
		}
	}

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
}//show

// resume game play
function resumeGame(){
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}//resumeGane

//pause game play
function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

//start game play
function startGame(){
	//reset score,s ball and paddle locations
	scoreLeft = 0;
	document.getElementById("left").innerHTML = "Player 1 : " + scoreLeft;
	scoreRight = 0;
	document.getElementById("right").innerHTML = "Player 2 : " + scoreRight;
	if(power1Used == true){
		changeVisibility("power1");
	}
	power1Used = false;
	if(power2Used == true){
		changeVisibility("power2");
	}
    power2Used = false;
	startBall();
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}//startGame

//stop game play
function stopGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;

	//show lightbox with score
	let message1 = "Tie Game";
	let message2 = "Close to continue";

	if(scoreLeft > scoreRight){
		message1 = "Player 1 wins with " + scoreLeft + " points!";
		message2 = "Player 2 had " + scoreRight + " points.";
	}else if(scoreLeft < scoreRight){
		message1 = "Player 2 wins with " + scoreRight + " points!";
		message2 = "Player 1 had " + scoreLeft + " points.";
	}

	showLightBox(message1, message2);
}//stopGame

/*** Lightbox Code ***/
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
}// continueGame
/*** End Lightbox Code ***/