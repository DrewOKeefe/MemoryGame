const gameContainer = document.getElementById('game');

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple',
];

function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		const newDiv = document.createElement('div');
		newDiv.classList.add(color);
		newDiv.addEventListener('click', handleCardClick);
		gameContainer.append(newDiv);
	}
}

let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

function handleCardClick(e) {
	// let divColor = e.target.classList.value;
	// e.target.style.backgroundColor = divColor;
	// console.log(divColor);
	// e.addEventListener('click',function () {
	// console.count(click)
	// };
	// if (click > 2) {
	// 	handleCardClick.disabled = true;
	// };

	// if(divColor === ???) {
	// // save to local storage or remove backgroundColor
	// setTimeout( if reseting )
	// };
	//-------------------------------------------------

	if (noClicking) return;
	if (e.target.classList.contains('flipped')) return;
	// console.log(noClicking)
	// console.log(e.target.classList.value)

	let currentCard = e.target;
	// console.log(currentCard);
	currentCard.style.backgroundColor = currentCard.classList[0];
	// console.log(currentCard.classList)

	if (!card1 || !card2) {
		currentCard.classList.add('flipped');
		card1 = card1 || currentCard;
		card2 = currentCard === card1 ? null : currentCard;
	}

	if (card1 && card2) {
		noClicking = true;

		if (card1.className === card2.className) {
			cardsFlipped += 2;
			card1.removeEventListener('click', handleCardClick);
			card2.removeEventListener('click', handleCardClick);
			card1 = null;
			card2 = null;
			noClicking = false;
		} else {
			setTimeout(function () {
				card1.style.backgroundColor = '';
				card2.style.backgroundColor = '';
				card1.classList.remove('flipped');
				card2.classList.remove('flipped');
				card1 = null;
				card2 = null;
				noClicking = false;
			}, 1000);
		}
	}
	if (cardsFlipped === COLORS.length) alert('game over!');
}

// when the DOM loads
createDivsForColors(shuffledColors);
