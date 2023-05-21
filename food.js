export class Food {
    freeSpaces = [];
    constructor(snakeBody) {
        for (let x = 0; x < 30; x++) {
            for (let y = 0; y < 30; y++) {
                let isOnSnake = false;
                snakeBody.forEach(part => {
                    if (part.x === x && part.y === y) isOnSnake = true;
                });
                if (!isOnSnake) this.freeSpaces.push({x,y});
            }
        }
        snakeBody.forEach(elem => console.log(elem))
        let {x,y} = this.freeSpaces[Math.floor(Math.random() * this.freeSpaces.length)]
        this.x = x;
        this.y = y;
    }
}