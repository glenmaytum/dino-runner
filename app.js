document.addEventListener('DOMContentLoaded', () => {
	const dino = document.querySelector('.dino');
	const grid = document.querySelector('.grid');
	const alert = document.getElementById('alert');
	const distanceDisplay = document.getElementById('distance');
	let distance = 0;

	let isJumping = false;
	let count = 0;
	let gravity = 0.9;
	let isGameOver = false;

	function control(e) {
		if (e.keyCode === 32) {
			if (!isJumping) {
				isJumping = true;
				jump();
			}
		}
	}
	document.addEventListener('keyup', control);

	let position = 0;
	function jump() {
		let count = 0;
		let timerId = setInterval(() => {
			//move down
			if (count === 15) {
				clearInterval(timerId);

				let downTimerId = setInterval(() => {
					if (count === 0) {
						clearInterval(downTimerId);
						isJumping = false;
					}
					position -= 5;
					count--;
					position = position * gravity;
					dino.style.bottom = `${position}px`;
				}, 20);
			}
			//Move up
			position += 30;
			count++;
			position = position * gravity;
			dino.style.bottom = `${position}px`;
		}, 20);
	}

	function generateObstacles() {
		let randomTime = Math.random() * 4000;
		let obstaclePosition = 1000;
		const obstacle = document.createElement('div');

		if (!isGameOver) obstacle.classList.add('obstacle');
		grid.appendChild(obstacle);
		obstacle.style.left = `${obstaclePosition}px`;

		let timerId = setInterval(() => {
			if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
				clearInterval(timerId);
				alert.innerHTML = 'Game Over';
				isGameOver = true;
				while (grid.firstChild) {
					grid.removeChild(grid.lastChild);
				}
			}
			obstaclePosition -= 10;
			obstacle.style.left = `${obstaclePosition}px`;
		}, 20);
		if (!isGameOver) setTimeout(generateObstacles, randomTime);
	}
	generateObstacles();

	function recordDistance() {
		let distanceCovered = setInterval(() => {
			if (isGameOver) {
				clearInterval(distanceCovered);
			}
			distance += 1;
			distanceDisplay.innerHTML = distance;
		}, 250);
	}
	recordDistance();
});
