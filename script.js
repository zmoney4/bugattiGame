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

function playArea()
{
    let playerCar = document.querySelector('.car');
    let road = roadArea.getBoundingClientRect();
    if(player.start)
    {
        if(keys.arrowUp && player.y > (road.top + 80))
        {
            player.y = player.y - player.step;
        }

        if(keys.arrowDown && player.y < (road.top - 80))
        {
            player.y = player.y + player.step;
        }

        if(keys.arrowLeft && player.x > 0)
        {
            player.x = player.x - player.step;
        }

        if(keys.arrowRight && player.x < (road.width - 64))
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


    for (let x = 0; x < 5; x++)
    {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'line');
        roadLines.y = x * 150;
        roadLines.style.top = roadLines.y + 'px';
        roadArea.appendChild(roadLines)
    }

}

init();
