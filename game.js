const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
};
const giftPosition = {
    x: undefined,
    y: undefined
};
let enemyPositions = [];

function setCanvasSize () {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementsSize = canvasSize / 10 - 1;
    starGame();
}

function starGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0, 0, canvasSize, canvasSize);
    enemyPositions = [];
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = parseFloat((elementsSize * (colI + 1))).toFixed(2);
            //const posX = (elementsSize * (colI + 1));
            const posY = parseFloat((elementsSize * (rowI + 1))).toFixed(2);
            //const posY = (elementsSize * (rowI + 1));

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer () {
    const giftColisionX = parseFloat(playerPosition.x).toFixed(2) == parseFloat(giftPosition.x).toFixed(2);
    const giftColisionY = parseFloat(playerPosition.y).toFixed(2) == parseFloat(giftPosition.y).toFixed(2);
    const giftColision = giftColisionX && giftColisionY;
    if (giftColision) {
        console.log('Subiste de nivel');
    }

    const enemyColision = enemyPositions.find(enemy => {
        const enemyColisionX = enemy.x == playerPosition.x;
        const enemyColisionY = enemy.y == playerPosition.y;
        return enemyColisionX && enemyColisionY;
    });
    if (enemyColision) {
        console.log('Chocaste');
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys (event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp () {
    console.log({playerPosition, elementsSize});
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {    
        playerPosition.y = parseFloat(playerPosition.y - elementsSize).toFixed(2);
        starGame();
    }
}
function moveLeft () {
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x = parseFloat(playerPosition.x - elementsSize).toFixed(2);
        starGame();
    }
}
function moveRight () {
    if ((Number(playerPosition.x) + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x = parseFloat(Number(playerPosition.x) + elementsSize).toFixed(2);
        starGame();
    }
}
function moveDown () {
    if ((Number(playerPosition.y) + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y = parseFloat(Number(playerPosition.y) + elementsSize).toFixed(2);
        starGame();
    }
}