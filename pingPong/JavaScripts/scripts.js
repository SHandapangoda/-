const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const netWidth = 4;
const netHeight = canvas.height;

const paddleHeight = 100;
const paddleWidth = 10;

let upArrowPressed = false;
let downArrowPressed = false;

const net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "#FFF"
}

const user = {
    x: 10,
    y: canvas.height,
    width: paddleWidth,
    height: paddleHeight,
    color:"#FFF",
    score: 0
}

const oppenent = {
    x:canvas.width - (paddleWidth + 10),
    y:canvas.height / 2 -paddleHeight / 2,
    width:paddleWidth,
    height:paddleHeight,
    color:"#FFF",
    score: 0
}

const ball = {
    x: canvas.width,
    y:canvas.height,
    radius: 7,
    velocity_X = 5,
    velocity_Y = 5,
    color: "#000"
}

function render(){
    context.fillStyle = "#000";
    context.fillRect(0,0,canvas.clientWidth,canvas.height);
}

render();