const roadArea = document.querySelector('.road');
let player = {step : 5};
let keys = {arrowUp: false, arrowDown: false, arrowLeft: false, arrowRight: false}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// I found this on the internet. this is a workaround becasue this is supposed to be a built in js function but does not work becasue this is canvas. 
function getBoundingClientRect(element) {
  let rect = {
    top: element.offsetTop,
    left: element.offsetLeft,
    width: element.offsetWidth,
    height: element.offsetHeight
  };

  let parent = element.offsetParent;
  while (parent) {
    rect.top += parent.offsetTop;
    rect.left += parent.offsetLeft;
    parent = parent.offsetParent;
  }

  return rect;
}


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
        if (item.y >= 700)
        {
            item.y = item.y - 750;
        }
        item.y = item.y + player.step;
        item.style.top = item.y + 'px';
    })
}

function moveEnemies()
{
    console.log("move enemies has been called");
    let enemies =  document.querySelectorAll('.enemy');
    enemies.forEach(function(item)
    {
        if (item.y > 750)
        {
            item.y = -300;
            var leftEnemy = Math.floor(Math.random() * 350) + 'px'; 
            item.style.left = leftEnemy; 
            console.log(leftEnemy);
        }
        item.y = item.y + player.step;
        item.style.top = item.y + 'px';
    })
}


function checkCollision() {
  let playerCar = document.querySelector(".car");
  let enemyCars = document.querySelectorAll(".enemy");
  
  enemyCars.forEach(function(item) {
    let playerRect = playerCar.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();
    
    if (playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top) {
      player.start = false;
    }
  });
}


function playArea()
{
    let playerCar = document.querySelector('.car');
    let road = roadArea.getBoundingClientRect();
    if(player.start)
    {
        moveLines();
        moveEnemies();

        checkCollision();
  if (!player.start) {
    return;
  }

        if(keys['ArrowUp'] && player.y > (road.top))
        {
            player.y = player.y - .5 * (player.step);
        }

        if(keys['ArrowDown'] && player.y < (road.bottom - 90))
        {
            player.y = player.y + .5 * (player.step);
        }

        if(keys['ArrowLeft'] && player.x > 0)
        {
            player.x = player.x - .5 * (player.step);
        }

        if(keys['ArrowRight'] && player.x < (road.width - 64))
        {
            player.x = player.x + .5 * (player.step);
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

    for (let x = 0; x < 7; x++)
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

