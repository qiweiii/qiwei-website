// learning point: 
// plan your projrct, to every button, i mean the game features, do what and what should happen, draw them out.
// when you have a project that is more than 100 lines, you need to write plans for it
// put listener functions in to new functions will be very helpful
// there are other ways to structure this game, like objects
// You may learn more development structures in the future, maybe COMP1531 stuff
// always do things sep by step, and make amendments in the way, you are not going to make your plan very perfect at the very begining


// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)",
// ]
// instead of above colors, we should use random colors
var numOfSquares = 6;
var colors = [];
// pickedColor is the randomly selected correct answer
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var mode = document.querySelectorAll(".mode");

// Main
// in this function, we initialise everything
init();

// add a listener to New Game button
reset.addEventListener("click",resetFunc);








// functions
function changeColors(color){
	// loop through all squares
	for (var i = 0; i < colors.length; i++) {
		// change each color to match given color
		squares[i].style.background = color;
	}
}

// this function picks the ansewr color from the colors array
function pickColor() {
	// Math is a huge library(Object), random is a method, 
	// it only generate numbers btw 0-1, to make it 0-6, times 6 at the end
	// to make it 1-6, plus 1 at the end
	// floor is another method
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// this functions makes the color array of length num
function generateRandomColors(num) {
	// make an array
	var arr = [];
	// add num random colors to array
	for (var i = 0; i < num; i++) {
		// get random color
		// pick a "red" from 0-255
		var red = Math.floor(Math.random() * 256);
		// pick a "green" from 0-255
		var green = Math.floor(Math.random() * 256);
		// pick a "blue" from 0-255
		var blue = Math.floor(Math.random() * 256);
		// push them to the array
		var rgb = "rgb(" + red + ", " + green + ", " + blue +")";
		arr.push(rgb);
	}
	// return that array
	return arr;
}

function resetFunc() {
	// generate all new colors
	colors = generateRandomColors(numOfSquares);
	// pick a new random color
	pickedColor = pickColor();
	// change rgb player need to find
	colorDisplay.textContent = pickedColor;

	// to make the message display disapear when you reset a game
	messageDisplay.textContent = "";

	// initialise colors of 6 squares
	for(var i = 0; i < squares.length; i++) {
		// add initial colors to squares
		if (colors[i]) {
			// when in the easy mode
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			// when in the hard mode
			// hide all extra squares
			squares[i].style.display = "none";
		}
	}
	// make the text on the button new Game
	this.textContent = "New Game";
	// make the h1 background original
	// h1.style.background = "#000000";
}

function setUpModeBtn() {
	// if in the future want to add more diff levels,
	for (var i = 0; i < mode.length; i++) {
		mode[i].addEventListener("click", function(){
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			// this here means the one that is being clicked(listened)
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numOfSquares = 3;
			} else {
				numOfSquares = 6;
			}
			resetFunc();
		});
	}
}

function setUpSquares() {
	// loop through the six squares to set their colors and listeners
	for(var i = 0; i < squares.length; i++) {
		// add click listerners to squares
		squares[i].addEventListener("click", function(){
			// grab color of clicked square
			var clickedColor = this.style.background;
			// compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				// if the correct answer is clicked, change all colors the same
				changeColors(clickedColor);
				// if got correct, the reset button become play again
				reset.textContent = "Play Again?";
				// also change the color of the h1 background
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#4d4d4d";
				messageDisplay.textContent = "Try Again!!";
			}
		});
	}
}

function init() {
	// set up mode button
	// this also decide whether it is 3 or 6 squares
	setUpModeBtn();	

	// set up squares and listeners
	setUpSquares();
	
	resetFunc();
}