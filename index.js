const gameDiv = document.querySelector('.gameDiv');
const scoreDis = document.querySelector('#score')
blockWidth = 100;
blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerId;
const ballDiam =20
let xDir = -2;
let yDir = 2;
let score = 0;


const userStart = [230, 10];
const currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart

class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight =[xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockWidth];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all blocks
const blocks = [new Block(10, 270),new Block(120, 270),new Block(230, 270),new Block(340, 270),new Block(450, 270),new Block(10, 240),new Block(120, 240),new Block(230, 240),new Block(340, 240),new Block(450, 240),new Block(10, 210),new Block(120, 210),new Block(230, 210),new Block(340, 210),new Block(450, 210)]



//create Block
function createBlock () {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomRight[1] + 'px'
        gameDiv.appendChild(block);
    }

}

createBlock()

//user 
const user = document.createElement('div');
user.classList.add('user');
drawUser()
gameDiv.appendChild(user)

//user 
 function drawUser () {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px'
}


//moving user
function moveUser (e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
             if (currentPosition[0] < boardWidth - blockWidth) {
                 currentPosition[0] += 10
                drawUser()
            }
            break;    
    }
}

document.addEventListener('keydown', moveUser);

function drawBall () {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//add user
const ball = document.createElement('div');
ball.classList.add('ball');
  drawBall()
gameDiv.appendChild(ball)

//moveBall 
function moveBall () {
    ballCurrentPosition[0] +=xDir
    ballCurrentPosition[1] +=yDir
    drawBall()
    checkCollision() 
}

timerId = setInterval(moveBall, 30);

//CHECK FOR COLLISIONS 
function checkCollision () {
    //for block
    for (let i = 0; i < blocks.length; i++) {
       if(
       (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiam) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
       ){
        const allBlock = Array.from(document.querySelectorAll('.block'))
        allBlock[i].classList.remove('block')
        blocks.splice(i, 1)
        changeDir()
        score++
        scoreDis.innerHTML = score

        //check for win 
        if (blocks.length === 0) {
            scoreDis.innerHTML = 'YOU WIN'
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
        }

       }
        
    }


   if (
    ballCurrentPosition[0] >=(boardWidth - ballDiam) || ballCurrentPosition[1] >= (boardHeight -ballDiam) || ballCurrentPosition[0] <= 0) {
                 changeDir()
   }

   //userColision
   if(
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
   ) {
    changeDir()
   }

   //gameOver 
   if(ballCurrentPosition[1] <= 0){
    clearInterval(timerId)
    scoreDis.innerHTML = 'YOU LOSE'
    document.removeEventListener('keydown', moveUser)
   }
}



function changeDir () {
 if (xDir === 2 && yDir ===2){
   yDir =-2
    return
 } 
if(xDir == 2 && yDir == -2){
    xDir = -2
    return
}
if (xDir == -2 && yDir == -2){
    yDir = 2
    return 
}
if (xDir === -2 && yDir ===2){
    xDir = 2
} 
}
