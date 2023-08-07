// ... (código previo)

function movePlayer(event) {
    if (gameIsOver) return;

    const gameContainerWidth = document.getElementById('game-container').offsetWidth;
    const gameContainerHeight = document.getElementById('game-container').offsetHeight;
    const playerSize = player.offsetWidth;
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (event.key) {
        case 'ArrowLeft':
            newX = playerPosition.x - 40;
            break;
        case 'ArrowRight':
            newX = playerPosition.x + 40;
            break;
        case 'ArrowUp':
            newY = playerPosition.y - 40;
            break;
        case 'ArrowDown':
            newY = playerPosition.y + 40;
            break;
        default:
            return;
    }

    if (newX >= 0 && newX <= gameContainerWidth - playerSize && newY >= 0 && newY <= gameContainerHeight - playerSize) {
        const isCollision = checkCollision(newX, newY);
        if (!isCollision) {
            playerPosition.x = newX;
            playerPosition.y = newY;
            player.style.left = newX + 'px';
            player.style.top = newY + 'px';
            checkGoal();
        } else {
            gameIsOver = true;
            alert('¡Oops! Te has chocado con un obstáculo. Vuelve a intentarlo.');
            resetGame();
        }
    }
}

// ... (código posterior)

const player = document.getElementById('player');
const walls = document.getElementsByClassName('wall');
const movingWall = document.querySelector('.moving-wall');
const goal = document.querySelector('.goal');
const timeLeftElement = document.getElementById('time-left');

let playerPosition = { x: 0, y: 0 };
let timeLeft = 60;
let gameIsOver = false;
let movingWallDirection = 'right';

function movePlayer(event) {
    if (gameIsOver) return;

    const gameContainerWidth = document.getElementById('game-container').offsetWidth;
    const gameContainerHeight = document.getElementById('game-container').offsetHeight;
    const playerSize = player.offsetWidth;
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (event.key) {
        case 'ArrowLeft':
            newX = playerPosition.x - 40;
            break;
        case 'ArrowRight':
            newX = playerPosition.x + 40;
            break;
        case 'ArrowUp':
            newY = playerPosition.y - 40;
            break;
        case 'ArrowDown':
            newY = playerPosition.y + 40;
            break;
        default:
            return;
    }

    if (newX >= 0 && newX <= gameContainerWidth - playerSize && newY >= 0 && newY <= gameContainerHeight - playerSize) {
        const isCollision = checkCollision(newX, newY);
        if (!isCollision) {
            playerPosition.x = newX;
            playerPosition.y = newY;
            player.style.left = newX + 'px';
            player.style.top = newY + 'px';
            checkGoal();
        }
    }
}

function moveMovingWall() {
    const gameContainerWidth = document.getElementById('game-container').offsetWidth;
    const movingWallWidth = movingWall.offsetWidth;
    const movingWallLeft = parseInt(movingWall.style.left);

    if (movingWallDirection === 'right') {
        if (movingWallLeft + movingWallWidth >= gameContainerWidth) {
            movingWallDirection = 'left';
        }
        movingWall.style.left = movingWallLeft + 2 + 'px';
    } else {
        if (movingWallLeft <= 0) {
            movingWallDirection = 'right';
        }
        movingWall.style.left = movingWallLeft - 2 + 'px';
    }

    // Actualizamos la posición del jugador mientras se mueve el obstáculo móvil
    movePlayer({ key: '' }); // Usamos un objeto vacío para simular un evento y actualizar la posición del jugador
}

function checkCollision(newX, newY) {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        const wallTop = parseInt(wall.style.top);
        const wallLeft = parseInt(wall.style.left);
        const wallRight = wallLeft + 40;
        const wallBottom = wallTop + 40;

        if (
            newY + player.offsetHeight > wallTop &&
            newY < wallBottom &&
            newX + player.offsetWidth > wallLeft &&
            newX < wallRight
        ) {
            return true;
        }
    }

    if (
        newY + player.offsetHeight > movingWall.offsetTop &&
        newY < movingWall.offsetTop + movingWall.offsetHeight &&
        newX + player.offsetWidth > movingWall.offsetLeft &&
        newX < movingWall.offsetLeft + movingWall.offsetWidth
    ) {
        return true;
    }

    return false;
}

function checkGoal() {
    const goalLeft = parseInt(goal.style.left);
    const goalRight = goalLeft + 40;
    const goalTop = parseInt(goal.style.top);
    const goalBottom = goalTop + 40;
    const playerLeft = playerPosition.x;
    const playerRight = playerPosition.x + player.offsetWidth;
    const playerTop = playerPosition.y;
    const playerBottom = playerPosition.y + player.offsetHeight;

    if (playerRight >= goalLeft && playerLeft <= goalRight && playerBottom >= goalTop && playerTop <= goalBottom) {
        gameIsOver = true;
        alert('¡Felicidades! Llegaste a la meta a tiempo y ayudaste a la persona vulnerable a alcanzar su objetivo.');
        resetGame();
    }
}

function updateTimer() {
    timeLeft--;
    timeLeftElement.innerText = timeLeft;

    if (timeLeft === 0) {
        gameIsOver = true;
        alert('¡Tiempo agotado! No lograste llegar a la meta a tiempo. Vuelve a intentarlo.');
        resetGame();
    }
}

function resetGame() {
    gameIsOver = false;
    timeLeft = 60;
    timeLeftElement.innerText = timeLeft;
    playerPosition = { x: 0, y: 0 };
    player.style.left = '0';
    player.style.top = '0';
}

document.addEventListener('keydown', movePlayer);
setInterval(updateTimer, 1000);
setInterval(moveMovingWall, 10);