const roadArea = document.querySelector('.road');
let player = {step : 5};
let keys = {arrowUp: false, arrowDown: false, arrowLeft: false, arrowRight: false}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(ev)
{
    keys[ev.key] = true;
}

function keyUp(ev)
{
    keys[ev.key] = false;
}

function moveLines()
{
    let roadLines = document.querySelectorAll('.line');
    roadLines.forEach(function(item)
    {
        if (item.y >= 750)
        {
            item.y = item.y - 850;
        }
        item.y = item.y + 8;
        item.style.top = item.y + 'px';
    })
}

function moveEnemies(playerCar)
{
    let enemies =  document.querySelectorAll('.enemy');
    playerCarBound = getBoundingClientRect();
    enemies.forEach(function(item)
    {
        if (item.y > 750)
        {
            enemyCarBound = item.getBoundingClientRect();
            if ((playerCarBound.bottom > enemyCarBound.top) ||  (playerCarBound.top > enemyCarBound.bottom) || (playerCarBound.left > enemyCarBound.right) || (playerCarBound.right > enemyCarBound.left))
            {
                console.log("YOU LOSE")
            }
            item.y = -300;
            var leftEnemy = Math.floor(Math.random() * 350) + 'px'; 
            item.style.left = leftEnemy; 
            console.log(leftEnemy);
        }
        item.y = item.y + 7;
        item.style.top = item.y + 'px';
    })
}


function playArea()
{
    let playerCar = document.querySelector('.car');
    let road = roadArea.getBoundingClientRect();
    if(player.start)
    {
        moveLines();
        moveEnemies(playerCar);

        if(keys['ArrowUp'] && player.y > (road.top))
        {
            player.y = player.y - player.step;
        }

        if(keys['ArrowDown'] && player.y < (road.bottom - 90))
        {
            player.y = player.y + player.step;
        }

        if(keys['ArrowLeft'] && player.x > 0)
        {
            player.x = player.x - player.step;
        }

        if(keys['ArrowRight'] && player.x < (road.width - 64))
        {
            player.x = player.x + player.step;
        }

        playerCar.style.top = player.y + 'px';
        playerCar.style.left = player.x + 'px';
        window.requestAnimationFrame(playArea);
    }
}

function init()
{
    player.start = true;
    window.requestAnimationFrame(playArea);

    let playerCar = document.createElement('div');
    playerCar.setAttribute('class', 'car')
    roadArea.appendChild(playerCar);

    player.x = playerCar.offsetLeft;
    player.y = playerCar.offsetTop;

    for (let x = 0; x < 6; x++)
    {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'line');
        roadLines.y = x * 150;
        roadLines.style.top = roadLines.y + 'px';
        roadArea.appendChild(roadLines)
    }

    for (let x = 0; x < 5; x++)
    {
        let enemy = document.createElement('div');
        enemy.setAttribute('class', 'enemy');
        enemy.y = ((x + 1) * 300) * -1;
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * 350) + 'px';
        roadArea.appendChild(enemy);

    }


    

}

init();