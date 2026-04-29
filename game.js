// Interactive Football Game Logic
// Two Players, Ball Physics, Goal Detection and Touch Screen Support

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Player properties
const player1 = {
    x: 50,
    y: canvas.height / 2 - 25,
    width: 20,
    height: 50,
    score: 0,
};
const player2 = {
    x: canvas.width - 70,
    y: canvas.height / 2 - 25,
    width: 20,
    height: 50,
    score: 0,
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 2,
    speedY: 2,
};

// Goal properties
const goals = {
    player1: canvas.width - 20,
    player2: 0,
};

// Event listeners for touch support
canvas.addEventListener('touchstart', handleTouch);

function handleTouch(e) {
    const touchY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
    if (touchY < player1.y + player1.height / 2) {
        player1.y -= 20; // Move up
    } else {
        player1.y += 20; // Move down
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Ball movement
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
  
    // Ball collision with players
    if (collides(ball, player1) || collides(ball, player2)) {
        ball.speedX = -ball.speedX;
    }

    // Goal detection
    if (ball.x - ball.radius < goals.player2) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.radius > goals.player1) {
        player1.score++;
        resetBall();
    }
}

function collides(ball, player) {
    return ball.x + ball.radius > player.x &&  
           ball.x - ball.radius < player.x + player.width &&  
           ball.y + ball.radius > player.y &&  
           ball.y - ball.radius < player.y + player.height;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 2 * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = 2 * (Math.random() > 0.5 ? 1 : -1);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPlayer(player1);
    drawPlayer(player2);
    drawBall(ball);
    drawScores();
}

function drawPlayer(player) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall(ball) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawScores() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Player 1: ' + player1.score, 50, 30);
    ctx.fillText('Player 2: ' + player2.score, canvas.width - 120, 30);
}

gameLoop();