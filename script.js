const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 40; // Matches the size of the balls (2 * radius)
const moveCooldown = 5; // Frames to wait before allowing another move

// Ball objects with cooldown counters
let ball1 = { x: 100, y: 100, radius: 20, color: "red", moveCounter: 0 };
let ball2 = { x: 200, y: 200, radius: 20, color: "blue", moveCounter: 0 };
let ball3 = { x: 300, y: 300, radius: 20, color: "yellow", moveCounter: 0 };

let keys = {}; // Track pressed keys

document.addEventListener("keydown", (event) => { keys[event.key] = true; });
document.addEventListener("keyup", (event) => { keys[event.key] = false; });

/* --- Game Initialization --- */
function init() {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.body.style.overflow = "hidden"; // Prevent scrolling
    gameLoop();
}

/* --- Canvas Resizing --- */
function resizeCanvas() {
    canvas.width = Math.floor(window.innerWidth / gridSize) * gridSize;
    canvas.height = Math.floor(window.innerHeight / gridSize) * gridSize;
}

/* --- Grid Drawing --- */
function drawGrid() {
    ctx.strokeStyle = "#ccc";
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.strokeRect(x, y, gridSize, gridSize);
        }
    }
}

/* --- Ball Movement --- */
function snapToGrid(value) {
    return Math.round(value / gridSize) * gridSize;
}

function moveBall(ball, keyUp, keyDown, keyLeft, keyRight) {
    if (ball.moveCounter === 0) {
        let newX = ball.x;
        let newY = ball.y;

        if (keys[keyUp] && ball.y - gridSize >= 0) newY -= gridSize;
        if (keys[keyDown] && ball.y + gridSize < canvas.height - gridSize) newY += gridSize;
        if (keys[keyLeft] && ball.x - gridSize >= 0) newX -= gridSize;
        if (keys[keyRight] && ball.x + gridSize < canvas.width - gridSize) newX += gridSize;

        ball.x = snapToGrid(newX);
        ball.y = snapToGrid(newY);

        ball.moveCounter = moveCooldown; // Reset the cooldown counter for this ball
    }
}

/* --- Decrease Cooldowns for Each Ball --- */
function updateCooldowns() {
    if (ball1.moveCounter > 0) ball1.moveCounter--;
    if (ball2.moveCounter > 0) ball2.moveCounter--;
    if (ball3.moveCounter > 0) ball3.moveCounter--;
}

/* --- Game Loop --- */
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // Draw the grid

    updateCooldowns(); // Update cooldowns

    // Handle movement for each ball
    moveBall(ball1, "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight");
    moveBall(ball2, "w", "s", "a", "d");
    moveBall(ball3, "i", "k", "j", "l");

    drawBall(ball1);
    drawBall(ball2);
    drawBall(ball3);

    requestAnimationFrame(gameLoop);
}

/* --- Draw Ball Function --- */
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x + ball.radius, ball.y + ball.radius, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

/* --- Start the Game --- */
function startGame() {
    document.getElementById("menu").style.display = "none";
    canvas.style.display = "block"; 
    init();
}
