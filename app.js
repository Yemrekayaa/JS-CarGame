document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            if (myCar.isStart == true)
            pause();
        } else {
            //resume();
        }
    }, false);

    const car = document.querySelector('.car');
    const game_area = document.querySelector('.game-area');
    const road = document.querySelector('.road');
    const pauseElement = document.querySelector('.pause');
    const scoreElement = document.querySelector('.score');
    const startElement = document.querySelector('.start');

    let myCar = {
        width: 64,
        height: 148,
        top: 500,
        left: 225,
        speed: 7,
        score: 0,
        isPause: false,
        isGameOver: false,
        isStart: false,
        leftTime: null,
        rightTime: null
    }
    


    function score() {
        if(myCar.isPause == false){
        myCar.score += 1;
        scoreElement.innerHTML = parseInt(myCar.score);
    }
    }

        let scoreTime = setInterval(score, 100);
    function carControl(direction) {
        if ((myCar.left >= 25 || direction != "left") && (myCar.left <= 410 || direction == "left")) {
            let move = direction == "left" ? -1 : 1;
            myCar.left += move;
            car.style.left = myCar.left + "px";
            //console.log(myCar.bottom);
        }
    }

    function keyControl(e) {
        if (myCar.isPause == false) {
            if (e.keyCode === 65 && !e.repeat && e.type == "keydown") {
                clearInterval(myCar.rightTime);
                clearInterval(myCar.leftTime);
                myCar.leftTime = setInterval(() => carControl("left"), myCar.speed);
            }
            else if (e.keyCode === 68 && !e.repeat && e.type == "keydown") {
                clearInterval(myCar.rightTime);
                clearInterval(myCar.leftTime);
                myCar.rightTime = setInterval(() => carControl("right"), myCar.speed);
            } else if ((e.keyCode === 68 || e.keyCode === 65) && e.type == "keyup") {
                clearInterval(myCar.rightTime);
                clearInterval(myCar.leftTime);
            }
            if (e.keyCode === 32 && !e.repeat && e.type == "keydown") {
                myCar.isPause = true;
                pause();
            }
        } else if (e.keyCode === 32 && !e.repeat && e.type == "keydown" && myCar.isGameOver == false) {
            if(myCar.isStart == false) myCar.isStart = true;
            myCar.isPause = false;
            resume();
        } else if(e.keyCode === 32 && !e.repeat && e.type == "keydown" && myCar.isGameOver == true){
            location.reload();
        }
    }
    document.addEventListener("keydown", keyControl)
    document.addEventListener("keyup", keyControl)
    


    function generateCar() {
        let enemyCar = {
            width: 64,
            height: 148,
            left: 30,
            top: -166,
            speed: 1
        }
        let randomPos = [35, 150, 272, 390];
        enemyCar.left = randomPos[Math.floor(Math.random() * 4)];
        const enemyCarElement = document.createElement("div");
        enemyCarElement.classList.add('enemy-car')
        road.appendChild(enemyCarElement);
        enemyCarElement.style.left = enemyCar.left + "px";

        function moveEnemyCar() {
            if (myCar.isPause == false) {
                enemyCar.top += enemyCar.speed;
                enemyCarElement.style.top = enemyCar.top + "px";

            }


            if (enemyCar.top >= 583 && myCar.isPause == false) {

                enemyCar.height -= enemyCar.speed;
                enemyCarElement.style.height = enemyCar.height + "px";
                if (enemyCar.height <= 0) {
                    road.removeChild(enemyCarElement);
                    clearInterval(moveTimer)
                }
                
            }

            if ((enemyCar.top >= (myCar.top - myCar.height) && enemyCar.top <= (myCar.top + myCar.height)) &&
                ((myCar.left >= enemyCar.left && myCar.left <= enemyCar.left + enemyCar.width) ||
                    (myCar.left + myCar.width >= enemyCar.left && myCar.left + myCar.width <= enemyCar.left + enemyCar.width))) {
                if (myCar.isGameOver == false) gameOver();
            }
        }

        let moveTimer = setInterval(moveEnemyCar, 10);


    }
    let generateTimer = setInterval(generateCar, 3500);
    function gameOver() {
        myCar.isPause = true;
        myCar.isGameOver = true;
        road.style.animationPlayState = "paused";
        clearInterval(generateTimer);
        clearInterval(myCar.rightTime);
        clearInterval(myCar.leftTime);
        pauseElement.style.display = "block";
        pauseElement.innerHTML = "GAME OVER" + "<p class='press'>(press spacebar to play again)</p>";
    }

    function pause() {
        myCar.isPause = true;
        road.style.animationPlayState = "paused";
        clearInterval(generateTimer);
        clearInterval(myCar.rightTime);
        clearInterval(myCar.leftTime);
        pauseElement.style.display = "block";
        pauseElement.innerHTML = "PAUSED" + "<p class='press'>(press spacebar to continue)</p>";
    }

    function resume() {
        myCar.isPause = false;
        road.style.animationPlayState = "running";
        generateTimer = setInterval(generateCar, 3500);
        pauseElement.style.display = "none";
    }
    start();
    function start(){
        myCar.isPause = true;
        road.style.animationPlayState = "paused";
        clearInterval(generateTimer);
        clearInterval(myCar.rightTime);
        clearInterval(myCar.leftTime);
        pauseElement.style.display = "block";
        pauseElement.innerHTML = "START GAME" + "<p class='press'>(press spacebar to start)</p><p class='press'>(play with a and d)</p>";
    }

    
})