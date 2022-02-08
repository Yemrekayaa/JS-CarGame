document.addEventListener('DOMContentLoaded', () => {
    const car = document.querySelector('.car');
    const game_area = document.querySelector('.game-area');
    const road = document.querySelector('.road');

    let myCar = {
        width: 78,
        height: 166,
        left: 225,
        speed: 7,
        leftTime: null,
        rightTime: null
    }


    function carControl(direction) {
        if ((myCar.left >= 20 || direction != "left")&& (myCar.left <= 400|| direction == "left")) {
            let move = direction == "left" ? -1 : 1;
            myCar.left += move;
            car.style.left = myCar.left + "px";
            //console.log(car.style.left);
        }
    }

    function keyControl(e) {
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
    }
    document.addEventListener("keydown", keyControl)
    document.addEventListener("keyup", keyControl)
    


    function generateCar(){
        let enemyCar = {
            width: 78,
            height: 166,
            left : 30,
            bottom: 600,
            pos: [35,150,272,390],
            speed: 1
        }
        
        let randomLeft= enemyCar.pos[Math.floor(Math.random() * 4)];
        const enemyCarElement = document.createElement("div");
        enemyCarElement.classList.add('enemy-car')
        road.appendChild(enemyCarElement);
        enemyCarElement.style.left = randomLeft + "px";

        function moveEnemyCar(){
            enemyCar.bottom -= enemyCar.speed;
            enemyCarElement.style.bottom = enemyCar.bottom  + "px";

        }
        
        setInterval(moveEnemyCar,10);
    }
    setInterval(generateCar,4000);
})