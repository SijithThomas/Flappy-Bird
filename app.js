
document.addEventListener('DOMContentLoaded',()=>{
    const gameDisplay=document.querySelector('.game-container');
    const startBox=document.createElement('div');
    const reloadBox=document.createElement('div');
    const playBtn=document.createElement('button');
    const score=document.createElement('h1');
    startBox.classList.add('start-box');
    reloadBox.classList.add('reload-box');
    playBtn.classList.add('play-btn');
    playBtn.innerHTML='Play';
    score.innerHTML='Press space-key';
    score.classList.add('score');
    gameDisplay.appendChild(startBox);
    startBox.appendChild(playBtn);
    startBox.appendChild(score);

    playBtn.addEventListener('click',()=>{
        gameDisplay.removeChild(startBox);
        const obstacle= document.createElement('div');
        const topObstacle=document.createElement('div');
        const bird=document.querySelector('.bird');
        
        const ground=document.querySelector('.ground');

        let birdBottom=100;
        let birdLeft=220;
        let gravity=2;
        let isGameOver=false;
        let gap=430;
        let score= 000;

        function startGame(){
            birdBottom -= gravity;
            bird.style.bottom = birdBottom + 'px';
            bird.style.left = birdLeft +'px';

        }
        let gameIimerId=setInterval(startGame,20);
        function liveScore(){
            score++;
            const point=document.createElement('p');
            point.classList.add('point');
            point.innerHTML=`${score}`;
            gameDisplay.appendChild(point);
            
        }
        let scoreId=setInterval(liveScore,3000);
        function jumb(){
            if(birdBottom<500)
            birdBottom+=50;
            bird.style.bottom=birdBottom+'px';
        }
        document.addEventListener('keyup',controller=(e)=>{
            if(e.keyCode === 32)
            jumb();
        });
        function generateObstacles(){
            let obstacleLeft= 500;
            let randomHeight=Math.random()*60;
            let obstacleBottom= randomHeight;
            const obstacle= document.createElement('div');
            const topObstacle=document.createElement('div');
            if(!isGameOver){
                obstacle.classList.add('obstacles');
                topObstacle.classList.add('top-obstacles');
            }
            gameDisplay.appendChild(obstacle);
            gameDisplay.appendChild(topObstacle);
            obstacle.style.left= obstacleLeft+'px';
            topObstacle.style.left= obstacleLeft+'px';
            obstacle.style.bottom= obstacleBottom+'px';
            topObstacle.style.bottom= obstacleBottom+ gap +'px';

            function obstacleMove(){
                obstacleLeft-=2;
                obstacle.style.left=obstacleLeft+'px';
                topObstacle.style.left=obstacleLeft+'px';
                if(obstacleLeft === -60){
                    clearInterval(timerId);
                    gameDisplay.removeChild(obstacle);
                    gameDisplay.removeChild(topObstacle);
                }
                if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                    (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) || birdBottom === 0)

                    {   
                    gameOver();
                    clearInterval(timerId);
                }
            }
            let timerId=setInterval(obstacleMove,20);
            if(!isGameOver)setTimeout(generateObstacles, 3000);
        }
        generateObstacles();

        function gameOver(){
            clearInterval(gameIimerId);
            clearInterval(scoreId);
            isGameOver=true;
            document.removeEventListener('keyup',controller);
            gameDisplay.appendChild(reloadBox);
            reloadBox.innerHTML=`<h1 class="score">Game Over</h1> <div class="action-box"><p class="score">Score: ${score}</p> <button class="play-btn" onclick="location.reload()">Reload</button></div>`
        }
    })
})
