const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
document.body.style.overflow = "hidden"; // Prevent scrolling

// Ball objects
let ball1 = { x: 100, y: 100, radius: 20, speed: 5, color: "red" };
let ball2 = { x: 200, y: 200, radius: 20, speed: 5, color: "blue" };
let ball3 = { x: 300, y: 300, radius: 20, speed: 5, color: "yellow" };

let keys = {}; // Trackuje co mačkám

document.addEventListener("keydown", (event) => { keys[event.key] = true; });
document.addEventListener("keyup", (event) => { keys[event.key] = false; });

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys["ArrowUp"] && ball1.y - ball1.radius > 0) ball1.y -= ball1.speed;
    if (keys["ArrowDown"] && ball1.y + ball1.radius < canvas.height) ball1.y += ball1.speed;
    if (keys["ArrowLeft"] && ball1.x - ball1.radius > 0) ball1.x -= ball1.speed;
    if (keys["ArrowRight"] && ball1.x + ball1.radius < canvas.width) ball1.x += ball1.speed;

    if (keys["w"] && ball2.y - ball2.radius > 0) ball2.y -= ball2.speed;
    if (keys["s"] && ball2.y + ball2.radius < canvas.height) ball2.y += ball2.speed;
    if (keys["a"] && ball2.x - ball2.radius > 0) ball2.x -= ball2.speed;
    if (keys["d"] && ball2.x + ball2.radius < canvas.width) ball2.x += ball2.speed;
   
    if (keys["i"] && ball3.y - ball3.radius > 0) ball3.y -= ball3.speed;
    if (keys["k"] && ball3.y + ball3.radius < canvas.height) ball3.y += ball3.speed;
    if (keys["j"] && ball3.x - ball3.radius > 0) ball3.x -= ball3.speed;
    if (keys["l"] && ball3.x + ball3.radius < canvas.width) ball3.x += ball3.speed;

    drawBall(ball1);
    drawBall(ball2);
    drawBall(ball3);

    requestAnimationFrame(gameLoop);
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// 🎮 Start Game Function
function startGame() {
    document.getElementById("menu").style.display = "none"; // Hide menu
    canvas.style.display = "block"; // Show game
    resizeCanvas();
    gameLoop();
}
