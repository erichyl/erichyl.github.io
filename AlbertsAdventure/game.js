const levels = [	
	//level 0
	["flag", "rock", "fenceside", "", "",
	"fenceside", "rock", "", "", "rider",
	"", "tree", "animate", "animate", "animate",
	"", "water", "", "", "",
	"", "fence", "", "horseup", ""],

	//level 1
	["flag", "water", "", "", "",
	"fenceside", "water", "", "", "rider",
	"animate", "bridge animate", "animate", "animate", "animate",
	"", "water", "", "", "",
	"", "water", "", "horseup", ""],

	//level 2
	["tree", "tree", "flag", "tree", "tree",
	"animate", "animate", "animate", "animate", "animate",
	"water", "bridge", "water", "water", "water",
	"", "", "", "rock", "",
	"rider", "rock", "", "", "horseup"],

	//level 3
	["tree", "tree", "water", "fenceside", "flag",
	"", "animate", "water", "", "fenceside",
	"", "animate", "bridge", "", "",
	"", "animate", "water", "", "rock",
	"rider", "rock", "water", "", "horseup"]
	];

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];

var originalMessage = document.getElementById("message").innerHTML;
var originalMessage2 = document.getElementById("message2").innerHTML;;
var currentLevel = 0; //starting level 
var riderOn = false; //is the rider on the horse?
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var widthOfBoard = 5;
var enemyMovementSpeed = 500;
var numlives = 3;

//start game
window.addEventListener("load", function () {
	loadLevel();
});

window.addEventListener("keydown", function (e) {
	switch(e.keyCode) {
		case 37: //left arrow
			if(currentLocationOfHorse % widthOfBoard !== 0){
				tryToMove("left");
			}
			break;
		case 38: //up arrow
			if(currentLocationOfHorse >= widthOfBoard){
				tryToMove("up");
			}
			break;
		case 39: //right arrow
		if(currentLocationOfHorse % widthOfBoard < widthOfBoard-1){
				tryToMove("right");
			}
			break;
		case 40: //down arrow
		if(currentLocationOfHorse + widthOfBoard < 25){
				tryToMove("down");
			}
			break;
		case 70: //f
		enemyMovementSpeed -= 50;
		break;
		case 83: //f
		enemyMovementSpeed += 50;
		break;
	}//switch
});//key event listener

//try to move horse
function tryToMove(direction) {
	//location before moving
	let oldLocation = currentLocationOfHorse;

	//class of location before moving
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0; //location we wish to move to
	let nextClass = ""; // class of location we wish to move to
	
	let nextLocation2 = 0; 
	let nextClass2 = ""; 
	let validJump = false;
	let newClass = ""; // new class to switch to if move successful

	switch (direction){
		case "left":
		nextLocation = currentLocationOfHorse - 1;
		break;
		case "right":
		nextLocation = currentLocationOfHorse + 1;
		break;
		case "up":
		nextLocation = currentLocationOfHorse - widthOfBoard;
		break;
		case "down":
		nextLocation = currentLocationOfHorse + widthOfBoard;
		break;
	}// switch

	nextClass = gridBoxes[nextLocation].className;
	//if element is not passable
	if(noPassObstacles.includes(nextClass)){ return; }

	//if it's a fence and there is no rider
	if(!riderOn && nextClass.includes("fence")){ return; }

	//if there is a fence and the horse is on, 
	//move two spaces with animation
	if(nextClass.includes("fence")){
		//rider must be on horse for horse to jump
		if(riderOn){
			oldClassName = gridBoxes[nextLocation].className;
		}
		
		if(direction == "up"){
			if(nextClass.includes("fenceside")){
				nextClass = "jumpup";
				nextClass2 = "horserideup";
				nextLocation2 = nextLocation - widthOfBoard;
				validJump = true;
			}
		}else if(direction == "down"){
			if(nextClass.includes("fenceside")){
				nextClass = "jumpdown";
				nextClass2 = "horseridedown";
				nextLocation2 = nextLocation + widthOfBoard;
				validJump = true;
			}
		}else if(direction == "left"){
			if(nextClass.includes("fenceside") == false){
				nextClass = "jumpleft";
				nextClass2 = "horserideleft";
				nextLocation2 = nextLocation - 1;
				validJump = true;
			}
		}else if(direction == "right" && nextClass.includes("fenceside") == false){
			if(nextClass.includes("fenceside") == false){
				nextClass = "jumpright";
				nextClass2 = "horserideright";
				nextLocation2 = nextLocation + 1;
				validJump = true;
			}
		}
		if(nextLocation2 < 0 || nextLocation2 > 25){
			validJump = false;
		}else if(noPassObstacles.includes(gridBoxes[nextLocation2].className)){
			validJump = false;
		}
		//show horse jumping
		if(validJump == true){
			gridBoxes[currentLocationOfHorse].className = "";
			gridBoxes[nextLocation].className = nextClass;

			setTimeout(function() {

				//set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;

				//update current location of horse to be 2 spaces past take off
				currentLocationOfHorse = nextLocation2;

				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfHorse].className;

				//show horse and rider after landing
				gridBoxes[currentLocationOfHorse].className = nextClass2;

				//if next box is a flag, go up a level
				if(nextClass == "flag"){
					levelUp(nextClass);
				}
			}, 350);
		}
		return;

	}// if class has fence

	//if there is a rider, add rider
	if(nextClass == "rider"){
		riderOn = true;
	}
	//if there is a bridge in the old location, keep it
	if(oldClassName.includes("bridge")){
		gridBoxes[oldLocation].className = "bridge";
	}else {
		gridBoxes[oldLocation].className = "";
	}
	
	//build name of new class
	newClass = (riderOn) ? "horseride" : "horse";
	newClass += direction;

	//if there is a bridge in the next location, keep it
	if(gridBoxes[nextLocation].classList.contains("bridge")){
		newClass += " bridge";
	}

	//move 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;

	//if it is an enemy, end game
	if(nextClass.includes("enemy")){
		numlives--;
		if(numlives == 0){
			showLightBoxStop("You have been captured!", "Would you like to try again?");
			return;
		}
		changeVisibility("life" + (numlives + 1));
	}
	//if it's a flag, move up to next level
	if(nextClass == "flag"){
		levelUp(nextClass);
	}

}//tryToMove	

//move up a level
function levelUp(nextClass){
	if(nextClass == "flag" && riderOn && currentLevel < levels.length-1){
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout (function(){
			document.getElementById("levelup").style.display = "none";
			currentLevel++;
			loadLevel();
		}, 1000);

	}else if(nextClass == "flag" && riderOn && currentLevel == levels.length-1){
		endGame("You Win!", "You have successfully evaded capture and escaped with Simon");
	}
}

//load level
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;

	//load board
	for(i = 0; i < gridBoxes.length; i++){
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("horse")) currentLocationOfHorse = i;
	}// for

	animateBoxes = document.querySelectorAll(".animate");
	if(currentLevel < 3){
		animateEnemy(animateBoxes, 0, "right");
	}else{
		animateEnemy(animateBoxes, 0, "down");
	}

}// loadLevel

// animate enemy left to right (could add up and down to this)
//boxes - array of grid boxes that include animation
//index = current location of animation
//direction - current direction of animation
function animateEnemy(boxes, index, direction){
	//exit function if no animation
	if(boxes.length <= 0) { return; }
	//update images
	if(direction == "right") {
		boxes[index].classList.add("enemyright");
	}else if(direction == "left"){
		boxes[index].classList.add("enemyleft");
	}else if(direction == "up"){
		boxes[index].classList.add("enemyup");
	}else if(direction == "down"){
		boxes[index].classList.add("enemydown");
	}

	//remove images from other boxes
	for(i = 0; i < boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
			boxes[i].classList.remove("enemyup");
			boxes[i].classList.remove("enemydown");
		}
	}// for

	if(boxes[index].className.includes("horse")){
		numlives--;
		if(numlives == 0){
			showLightBoxStop("You have been captured!", "Would you like to try again?");
			return;
		}
		changeVisibility("life" + (numlives + 1));
	}

	//moving animation
	if(direction == "right"){
		//turn around if hit right side
		if(index == boxes.length-1){
			index--;
			direction = "left";
		} else {
			index++;
		}
	}else if (direction == "left"){
		//turn around if hit left side
		if(index == 0){
			index++;
			direction = "right";
		} else {
			index--;
		}
	}else if (direction == "up"){
		//turn around if hit left side
		if(index == 0){
			index++;
			direction = "down";
		} else {
			index--;
		}
	}else if (direction == "down"){
		//turn around if hit left side
		if(index == boxes.length-1){
			index--;
			direction = "up";
		} else {
			index++;
		}
	}
	currentAnimation = setTimeout(function(){
		animateEnemy(boxes, index, direction);
	}, enemyMovementSpeed);

}// animateEnemy

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
	changeVisibility("x");
}

function showLightBoxStop(message, message2){
	// set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	document.getElementById("lightbox").className = "unhidden";
	document.getElementById("boundaryMessage").className = "unhidden";
	document.getElementById("x").className = "hidden";
	document.getElementById("Yes").className = "unhidden";
	document.getElementById("No").className = "unhidden";
}

function showLightBoxContinue(){
	//hide lightbox
	document.getElementById("lightbox").className = "hidden";
	document.getElementById("boundaryMessage").className = "hidden";
	document.getElementById("x").className = "hidden";
	document.getElementById("Yes").className = "hidden";
	document.getElementById("No").className = "hidden";
	clearTimeout(currentAnimation);
	currentLevel = 0;
	numlives = 3;
	document.getElementById("life1").className = "unhidden";
	document.getElementById("life2").className = "unhidden";
	document.getElementById("life3").className = "unhidden";
	loadLevel();
}

function backToStart(){
	document.getElementById("message").innerHTML = originalMessage;
	document.getElementById("message2").innerHTML = originalMessage2;
	document.getElementById("lightbox").className = "unhidden";
	document.getElementById("boundaryMessage").className = "unhidden";
	document.getElementById("x").className = "unhidden";
	document.getElementById("Yes").className = "hidden";
	document.getElementById("No").className = "hidden";
	document.getElementById("Done").className = "hidden";
}

function endGame(message, message2){
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	document.getElementById("lightbox").className = "unhidden";
	document.getElementById("boundaryMessage").className = "unhidden";
	document.getElementById("x").className = "hidden";
	document.getElementById("Done").className = "unhidden";
}

function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	changeVisibility("x");
	currentLevel = 0;
	enemyMovementSpeed = 500;
	clearTimeout(currentAnimation);
	numlives = 3;
	document.getElementById("life1").className = "unhidden";
	document.getElementById("life2").className = "unhidden";
	document.getElementById("life3").className = "unhidden";
	loadLevel();
}// continueGame
/*** End Lightbox Code ***/