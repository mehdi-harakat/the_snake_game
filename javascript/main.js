let playboard = document.querySelector(".play-board");
let score = document.querySelector(".score span");
let highScore = document.querySelector(".high-score span");

// the food and the head variable
let counter = 0;
let foodX, foodY;
let headX = 5;
let headY = 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let movingTimeout;
let gameOver = false;

// window.localStorage.removeItem('high-score')
// checking local storage
let localOne = window.localStorage.getItem('high-score') || 0;

highScore.innerHTML = localOne


// random value function
function foodAndHeadPosition() {
	foodX = Math.floor(Math.random() * 30) + 1;
	foodY = Math.floor(Math.random() * 30) + 1;
}

// on keydown function
function controlFunction(e) {
	if (e.key === "ArrowUp" && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	} else if (e.key === "ArrowDown" && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	} else if (e.key === "ArrowLeft" && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	} else if (e.key === "ArrowRight" && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	} else if (e.code === 'Space') {
		mainFunction();
	}

}

function finishGame() {
	clearInterval(movingTimeout);
	alert("You Lose , Press Ok To Try Again");
	location.reload();
}

// the main function
function mainFunction() {
	headX += velocityX;
	headY += velocityY;

	let catcher = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

	if (headX === foodX && headY === foodY) {
		foodAndHeadPosition();
		snakeBody.push([foodX, foodY]);
		counter++
		score.innerHTML = counter;
		if (parseInt(localOne) < parseInt(counter)) {
			window.localStorage.setItem("high-score", counter);
		}
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	snakeBody[0] = [headX, headY];

	for (let i = 0; i < snakeBody.length; i++) {
		catcher += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

		if (snakeBody[i] != snakeBody[0] && snakeBody[i][1] === snakeBody[0][1] && snakeBody[i][0] ===  snakeBody[0][0]) {
			gameOver = true
		}
	}

	// catcher += `<div class="head" style="grid-area: ${headY} / ${headX}"></div>`;
	playboard.innerHTML = catcher;

	if (headX <= 0 || headX > 30 || headY <= 0 || headY > 30) {
		gameOver = true;
	}

	if (gameOver) return finishGame();
}

// this function for random value
foodAndHeadPosition();
// set interval for make the snake moving every 500ms
movingTimeout = setInterval(mainFunction, 100);
// add Event listener keydown
document.addEventListener("keydown", controlFunction);
