const mario = document.querySelector('.mario');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
//console.log(mario);

function handlKeyUp(event)
{
    if (event.keyCode === 32 || event.keyCode === 38)
    {
        //console.log('Pressionado Tecla Espaço');
        if(!isJumping){jump();}
        
    }
};

function jump(){
    isJumping = true;
    let upinterval = setInterval( () => {
        if (position > 180){
           clearInterval(upinterval); 
           //Descendo
           let downInterval = setInterval( () => {
           if (position <= 0){
                clearInterval(upinterval);
                isJumping = false;
            }else{
             position -= 30;
             mario.style.bottom = position + 'px';
            }
           }, 20);
        }else{
         //Subindo
         position += 30;
         mario.style.bottom = position + 'px';
        }
    }, 20);
};

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1200;
    let randomTime = Math.random() * 6000;
    console.log(randomTime);
    
    cactus.classList.add('cactus');
    cactus.style.left = 1200 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval( () => {

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handlKeyUp);