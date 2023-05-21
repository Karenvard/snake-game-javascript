import {Food} from "./food.js";
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const blockX = 10;
const blockY = 5;

let fps = prompt("Enter fps which you want to play with (Minimum: 10): ", "10");
if (fps < 10) fps = 10;
fps = Number(fps);

let isGodToggled = confirm("God mode. OK for enable. Cancel for disable")
let direction = "r";
let snakeBody = [
    {x: 9, y: 9},
];

let gameOver = false;
let food = new Food(snakeBody);


function main() {
    checkLose();
    if (!isGodToggled) if (gameOver) {
        alert("You lose!")
        const isContinue = confirm("Do you want to restart? OK = Yes, Cancel = No");
        if (isContinue) location.reload();
        return;
    };
    clearCanvas();
    moveSnake();
    drawSnake();
    spawnFood();
    if (checkIsSnakeOnFood()) {
        snakeBodyIncrement();
        food = new Food(snakeBody);
    }
    setTimeout(() => {
        window.requestAnimationFrame(main);
    }, 1000/fps)
}

function clearCanvas() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    for (let i = snakeBody.length - 1; i > -1; i--) {
        if (i === 0) {
            moveHead();
            break;
        }
        snakeBody[i] = {...snakeBody[i - 1]}
    }
}

function moveHead() {
    switch (direction) {
        case "r":
            snakeBody[0].x += 1;
            break;
        
        case "l":
            snakeBody[0].x -= 1;
            break;

        case "u":
            snakeBody[0].y -= 1;
            break;

        case "d":
            snakeBody[0].y += 1;
            break;
    }
    console.log("head moved")
}

function drawSnake() {
    snakeBody.forEach(part => {
        context.fillStyle = "green";
        context.fillRect(part.x * blockX, part.y * blockY, blockX, blockY);
    })
}

window.addEventListener("keydown", (e) => {
    if ((e.key === "ArrowUp" || e.key === "w") && direction !== "d") {
        direction = "u";
    } else if ((e.key === "ArrowDown" || e.key === "s") && direction !== "u") {
        direction = "d";
    } else if ((e.key === "ArrowRight" || e.key === "d") && direction !== "l") {
        direction = "r";
    } else if ((e.key === "ArrowLeft" || e.key === "a") && direction !== "r") {
        direction = "l";
    }
})


function spawnFood() {
    context.fillStyle = "yellow";
    context.fillRect(food.x * blockX, food.y * blockY, blockX, blockY)
}

function snakeBodyIncrement() {
    const last = {...snakeBody[snakeBody.length - 1]};
    switch (direction) {
        case "r":
            snakeBody.push({x: last.x - 1, y: last.y});
            break;

        case "l":
            snakeBody.push({x: last.x + 1, y: last.y});
            break;

        case "u":
            snakeBody.push({x: last.x, y: last.y + 1});
            break;

        case "d":
            snakeBody.push({x: last.x, y: last.y - 1});
            break;
    }
}

function checkIsSnakeOnFood() {
    if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) return true;
    return false;
}

function checkLose() {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[0].x > 29 || snakeBody[0].y > 29 || snakeBody[0].x < 0 || snakeBody[0].y < 0) return gameOver = true;
        if (i===0) continue;
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) return gameOver = true;
    }
}

main();