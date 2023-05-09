let playBoard = document.querySelector(".play-board");
let score = document.querySelector(".score span");
let highScore = document.querySelector(".high-score span");
let pauseButton = document.querySelector(".btn");
let controls = document.querySelectorAll('.controls i');
let userName = document.querySelector(".user-name span");
let highLevel = document.querySelector(".high-level span");

let promptOne = prompt(`what's your name ??`);



let counter = 0;
let food = {
	x: 0,
	y: 0,
};
let head = {
	x: 5,
	y: 8,
};
let volencX = 0;
let volencY = 0;
let snakeBody = [];
let setIntervalOpperator;

//local storage
let localHighScore = {
	"sco": 0,
	"name": "No-User"
};
if (localStorage.getItem("high-score")) {
	localHighScore = JSON.parse(localStorage.getItem("high-score"));
	highScore.innerHTML = localHighScore.sco;
	userName.innerHTML = promptOne;
	highLevel.innerHTML = localHighScore.name;
} else {
	highLevel.innerHTML = 'Uknown';
	highScore.innerHTML = 0;
	userName.innerHTML = promptOne;
}


// the random function
function randomFoodPosition() {
	food.x = Math.floor(Math.random() * 30 + 1);
	food.y = Math.floor(Math.random() * 30 + 1);
}

/*tragger the random fucntion */
randomFoodPosition();

// the alert function
function alertFunction() {
	alert("Game Over... , Press Ok To Try Again");
	clearInterval(setIntervalOpperator);
	location.reload();
}

// the key down function
function keyFunction(e) {
	if (e.key === "ArrowUp" && volencY != 1) {
		volencX = 0;
		volencY = -1;
	} else if (e.key === "ArrowDown" && volencY != -1) {
		volencX = 0;
		volencY = 1;
	} else if (e.key === "ArrowLeft" && volencX != 1) {
		volencX = -1;
		volencY = 0;
	} else if (e.key === "ArrowRight" && volencX != -1) {
		volencX = 1;
		volencY = 0;
	}

	clearInterval(setIntervalOpperator);
	setIntervalFunction();
}

// this is the main function
function mainFunction() {
	head.x += volencX;
	head.y += volencY;

	if (head.x === 0 || head.x > 30 || head.y === 0 || head.y > 30) {
		alertFunction();
	}

	let catcher = `<div class="food" style="grid-area: ${food.y} / ${food.x}"></div>`;

	// this condition for eating food
	if (head.x === food.x && head.y === food.y) {
		randomFoodPosition();
		counter++;
		score.innerHTML = counter;
		snakeBody.push([food.x, food.y]);

		let loStoObj = {
			"name": promptOne,
			"sco": counter
		};

		if (parseInt(localHighScore.sco) < counter) {
			window.localStorage.setItem("high-score", JSON.stringify(loStoObj));
		}
	}

	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}

	snakeBody[0] = [head.x, head.y];

	for (let i = 0; i < snakeBody.length; i++) {
		catcher += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

		if (
			i != 0 &&
			snakeBody[i][1] === snakeBody[0][1] &&
			snakeBody[i][0] === snakeBody[0][0]
		) {
			alertFunction();
		}
	}

	playBoard.innerHTML = catcher;
}

// event key down
document.addEventListener("keydown", keyFunction);

controls.forEach((e) => {
	// {'key': e.dataset.key };
	e.addEventListener("click", function() {
		let hello = {
			"key": e.dataset.key
		}
		keyFunction(hello);
	}); //{"key": e.dataset.key}
})

// set interval opperator
function setIntervalFunction() {
	setIntervalOpperator = setInterval(mainFunction, 100);
}

//tragger the set interval function
setIntervalFunction();

// the pause button
pauseButton.onclick = () => {
	clearInterval(setIntervalOpperator);
};
