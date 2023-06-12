const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;

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
    game.textAlign = '';
    for (let i = 0; i < 10; i++) {
        for (let z = 1; z < 11; z++) {
            game.fillText(emojis['X'], elementsSize * i, elementsSize * z);
        }
    }
}