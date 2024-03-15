// const gameContainer = document.getElementById("game");
// let card1 = null;
// let card2 = null;
// let cardsFlipped = 0;
// let noClicking = false;

// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];

// // here is a helper function to shuffle an array
// // it returns the same array with values shuffled
// // it is based on an algorithm called Fisher Yates if you want ot research more
// function shuffle(array) {
//   let counter = array.length;

//   // While there are elements in the array
//   while (counter > 0) {
//     // Pick a random index
//     let index = Math.floor(Math.random() * counter);

//     // Decrease counter by 1
//     counter--;

//     // And swap the last element with it
//     let temp = array[counter];
//     array[counter] = array[index];
//     array[index] = temp;
//   }

//   return array;
// }

// let shuffledColors = shuffle(COLORS);

// // this function loops over the array of colors
// // it creates a new div and gives it a class with the value of the color
// // it also adds an event listener for a click for each card
// function createDivsForColors(colorArray) {
//   for (let color of colorArray) {
//     const newDiv = document.createElement("div");

//     // create a new div
//     const newDiv = document.createElement("div");

//     // give it a class attribute for the value we are looping over
//     newDiv.classList.add(color);

//     // call a function handleCardClick when a div is clicked on
//     newDiv.addEventListener("click", handleCardClick);

//     // append the div to the element with an id of game
//     gameContainer.append(newDiv);
//   }
// }

// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target);
// }

// // when the DOM loads
// createDivsForColors(shuffledColors);

// This refers to the tile container Div:
const tilesContainer = document.querySelector(".tiles");
// the colors the game will use to match up with:
const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "teal",
  "yellow"
];
// colors pick list new array that is containing two of the colors in the colors array:
const colorsPickList = [...colors, ...colors];
const tileCount = colorsPickList.length;

// Game State:

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
	const element = document.createElement("div");

	element.classList.add("tile");
	element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");


  element.addEventListener("click", () => { 
    const revealed = element.getAttribute("data-revealed");
    
    if (
			awaitingEndOfMove
			|| revealed === "true"
			|| element == activeTile
		) {
			return;
		}
    
		element.style.backgroundColor = color;

		if (!activeTile) {
			activeTile = element;

			return;
		}

   const colorToMatch =  activeTile.getAttribute("data-color");
   if (colorToMatch === color) {
    element.setAttribute("data-revealed", "true");
    activeTile.setAttribute("data-revealed", "true");

    activeTile = null;
    awaitingEndOfMove = false;
    revealedCount += 2;

    if (revealedCount === tileCount) {
      alert("You did it! Refresh to play again.");
    }
      return;
   }
    
   awaitingEndOfMove = true;

   setTimeout(() => {
     activeTile.style.backgroundColor = null;
     element.style.backgroundColor = null;

     awaitingEndOfMove = false;
     activeTile = null;
   }, 1000);
 });

 return element;
}

// creating tiles: 
for (let i = 0; i < tileCount; i++) {
	const randomIndex = Math.floor(Math.random() * colorsPickList.length);
	const color = colorsPickList[randomIndex];
	const tile = buildTile(color);

	colorsPickList.splice(randomIndex, 1);
	tilesContainer.appendChild(tile);
}


