const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const netWidth = 8;
const netHeight = canvas.height;

const paddleHeight = 200;
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

// opposit player attributes
const oppenent = {
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color:'#FFF',
    score: 0
};

// ball attributes
const ball = {
    x: canvas.width / 2,
    y:canvas.height / 2,
    radius: 14,
    speed: 7,
    velocity_X: 10,
    velocity_Y: 10,
    color: '#05EDFF'
};

// creating the net 
function createNet(){
    context.fillStyle = net.color;
    context.fillRect (net.x, net.y, net.width, net.height);
}


//setting score
function Score(x, y, score){
    context.fillStyle = '#fff';
    context.font = '35px sans-serif';

    context.fillText(score, x, y);
}

// create the relevant racket
function paddleCreate(x, y, width, height, color){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// create ball
function createBall(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();

    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

}

//for mouse clicks 



// user to handle keys
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

// use as an intermediate function to create the game and call their attributes
function render(){
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);


    // call the functions.

    createNet(); // create of net  which is in the middle. 
    Score(canvas.width / 4, canvas.height / 6, user.score); // setting user score 
    Score(3 * canvas.width / 4, canvas.height / 6, oppenent.score); // setting oppenent score
    paddleCreate(user.x, user.y, user.width, user.height, user.color); // create the bat of user
    paddleCreate(oppenent.x, oppenent.y, oppenent.width, oppenent.height, oppenent.color); // create the bat of opponent
    createBall(ball.x, ball.y, ball.radius, ball.color); // attributes of ball call 

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
    // scoring of the players
    
    if(ball.x + ball.radius >= canvas.width){
    
        user.score += 1;
        
        restart(); 
    }
       
    if (ball.x - ball.radius <= 0){
    
        oppenent.score += 1;
        
        restart();
    }

    if(user.score == 3){
        
        alert('win')
        user.score == 0 && oppenent.score == 0
        
    }

    if(oppenent.score == 3){
       
        alert('lost')
        user.score == 0 && oppenent.score == 0
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

setInterval(loop, 500 / 60);

