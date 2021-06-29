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
    color: '#FFF'
};

const user = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color:'#FFF',
    score: 0
};

const oppenent = {
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color:'#FFF',
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y:canvas.height / 2,
    radius: 7,
    speed: 7,
    velocity_X: 5,
    velocity_Y: 5,
    color: '#05EDFF'
};

function createNet(){
    context.fillStyle = net.color;
    context.fillRect (net.x, net.y, net.width, net.height);
}

function Score(x, y, score){
    context.fillStyle = '#fff';
    context.font = '35px sans-serif';

    context.fillText(score, x, y);
}

function paddleCreate(x, y, width, height, color){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function createBall(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();

    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

}

window.addEventListener('keydown',keyDown);
window.addEventListener('keyup',keyUp);

function keyDown(event){
    switch (event.keyCode){
        case 38:
            upArrowPressed = true;
            break;
        
        case 40:
            downArrowPressed = true;
            break;
    }
}

function keyUp(event){
    switch (event.keyCode){
        case 38:
            upArrowPressed = false;
            break;
        
        case 40:
            downArrowPressed = false;
            break;
    }
}

function render(){
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    createNet();
    Score(canvas.width / 4, canvas.height / 6, user.score);
    Score(3 * canvas.width / 4, canvas.height / 6, oppenent.score);
    paddleCreate(user.x, user.y, user.width, user.height, user.color);
    paddleCreate(oppenent.x, oppenent.y, oppenent.width, oppenent.height, oppenent.color);
    createBall(ball.x, ball.y, ball.radius, ball.color);

}

function update(){
    // paddle movement
    if(upArrowPressed && user.y > 0){
        user.y -= 8;
    }

    else if (downArrowPressed && (user.y < canvas.height - user.height)){
        user.y += 8;
    }
    // check of ball hit bottom
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0){
        
        ball.velocity_Y = -ball.velocity_Y;

    }

    if(ball.x + ball.radius >= canvas.width){

        user.score += 1;
        restart(); 
    }

    if (ball.x - ball.radius <= 0){

        oppenent.score += 1;
        restart(); 
    }

    // motion of ball
    ball.x += ball.velocity_X;
    ball.y += ball.velocity_Y;
    //oppenent motion
    oppenent.y += ((ball.y - (oppenent.y + oppenent.height / 2 ))) * 0.09;
    // collision detect of pad

    let player = (ball.x < canvas.width / 2) ? user: oppenent

    if (collisionDet(player, ball)){
        let theta = 0;

        if (ball.y < (player.y + player.height / 2)){
            theta = -1 * Math.PI / 4;
        }

        else if(ball.y > (player.y + player.height / 2)){
            theta = Math.PI / 4;
        }

        ball.velocity_X = (player === user ? 1 : -1) * ball.speed * Math.cos(theta);
        ball.velocity_Y =  ball.speed * Math.sin(theta);

        ball.speed += 0.2;
    }
}

function restart(){
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;

    ball.velocity_Y = -ball.velocity_Y;
    ball.velocity_X = -ball.velocity_X;
}

function collisionDet(player, ball){
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;

}



function loop(){
    update();

    render();
}

setInterval(loop, 1000 / 60);

