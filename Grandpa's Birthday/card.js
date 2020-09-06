function next(){
	changeVisibility("title");
	changeVisibility("message");
}

function changeVisibility(divID){
	var element = document.getElementById(divID);

	//if element exists, toggle it's class name
	//between hidden and unhidden
	if(element){
		element.className = (element.className == "hidden")? 'unhidden' : 'hidden';
	}
}// changeVisibility