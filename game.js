const levels = [	
	//level 0
	["flag", "rock", "", "", "",
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
	["flag", "rock", "", "", "",
	"fenceside", "rock", "", "", "rider",
	"", "tree", "animate", "animate", "animate",
	"", "water", "", "", "",
	"", "fences", "", "horseup", ""]
	];

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0; //starting level 
var riderOn = false; //is the rider on the horse?
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level

//start game
window.addEventListener("load", function () {
	loadLevel();
});

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

	animateEnemy(animateBoxes, 0, "right");

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
	}else /*if(direction == "left")*/{
		boxes[index].classList.add("enemyleft");
	}

	//remove images from other boxes
	for(i = 0; i < boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
		}
	}// for

	//moving animation
	if(direction == "right"){
		//turn around if hit right side
		if(index == boxes.length-1){
			index--;
			direction = "left";
		} else {
			index++;
		}
	} else /*if (direction == "left")*/{
		//turn around if hit left side
		if(index == 0){
			index++;
			direction = "right";
		} else {
			index--;
		}
	}

	currentAnimation = setTimeout(function(){
		animateEnemy(boxes, index, direction);
	}, 600);

}// animateEnemy