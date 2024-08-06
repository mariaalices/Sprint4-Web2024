const robot1 = document.getElementById('robot1');
const robot2 = document.getElementById('robot2');
let lives1
let lives2
let collisions1
let collisions2
let arenaHeight=400
let arenaWidth=600
let robotHeight=50
resetGame(1)

document.addEventListener('keydown', (event) => {
    const key = event.key;
    moveRobot(key);
});

function moveRobot(key) {
    const speed = 10; // Define a velocidade de movimento dos robôs
    
    
    switch(key) {
        case 'ArrowUp':
            robot1.style.top = `${parseInt(robot1.style.top) - speed}px`;
            break;
        case 'ArrowDown':
            robot1.style.top = `${parseInt(robot1.style.top) + speed}px`;
            
            break;
        case 'ArrowLeft':
            robot1.style.left = `${parseInt(robot1.style.left) - speed}px`;
            break;
        case 'ArrowRight':
            robot1.style.left = `${parseInt(robot1.style.left) + speed}px`;
            break;
        case 'w':
            robot2.style.bottom = `${parseInt(robot2.style.bottom) + speed}px`;
            break;
        case 's':
            robot2.style.bottom = `${parseInt(robot2.style.bottom) - speed}px`;
            break;
        case 'a':
            robot2.style.right = `${parseInt(robot2.style.right) + speed}px`;
            break;
        case 'd':
            robot2.style.right = `${parseInt(robot2.style.right) - speed}px`;
            break;
    }
    checkCollision();
}

function checkCollision() {
    const robot1Rect = robot1.getBoundingClientRect();
    const robot2Rect = robot2.getBoundingClientRect();
    r1s = robot1.style
    r2s = robot2.style
    if (parseInt(r1s.top)<0){
        r1s.top = 0
    }
    if(parseInt(r1s.top)>arenaHeight-robotHeight){
        r1s.top = `${arenaHeight-robotHeight}px`
    }
    if(parseInt(r1s.left)<0){
        r1s.left= "0"
    }
    if(parseInt(r1s.left)+robotHeight>arenaWidth){
        r1s.left=`${arenaWidth-robotHeight}px`
    }
    if(parseInt(r1s.left)>arenaWidth-robotHeight){
        r1s.left = arenaWidth
    }
    if(parseInt(r2s.bottom) > arenaHeight-robotHeight){
        r2s.bottom= `${arenaHeight-robotHeight}px`
    }
    if(parseInt(r2s.bottom)<0){
        r2s.bottom = 0
    }
    if(parseInt(r2s.right)<0){
        r2s.right = 0;
    }
    if(parseInt(r2s.right)>arenaWidth-robotHeight){
        r2s.right = `${arenaWidth-robotHeight}px` 
    }

    if (!(robot1Rect.right < robot2Rect.left ||
        robot1Rect.left > robot2Rect.right ||
        robot1Rect.bottom < robot2Rect.top ||
        robot1Rect.top > robot2Rect.bottom)) {
        const damage1 = Math.floor(Math.random() * 21); // Valor aleatório entre 0 e 20 para o dano do robô 1
        const damage2 = Math.floor(Math.random() * 21); // Valor aleatório entre 0 e 20 para o dano do robô 2
        lives1 -= damage1;
        lives2 -= damage2;
        collisions1++;
        collisions2++;
        updateUI();
        resetGame()
        if (collisions1 >= 5 || collisions2 >= 5) {
            declareWinner();
        }
    }
}

function updateUI() {
    document.getElementById('collisions1').innerText = `Colisões: ${collisions1} | Vida: ${lives1}`;
    document.getElementById('collisions2').innerText = `Colisões: ${collisions2} | Vida: ${lives2}`;
}

function declareWinner() {
    let winner;
    if (lives1 > lives2) {
        winner = "Robô 1";
    } else if (lives2 > lives1) {
        winner = "Robô 2";
    } else {
        winner = "Empate";
    }
    alert(`O vencedor é: ${winner}`);
    //se não quiser que o jogo resete dps de anunciar o vencedor, só tirar essa linha de baixo
    resetGame(1)
}

function resetGame(fullreset){
    robot1.style.top = "50px"
    robot1.style.left = "50px"
    robot2.style.bottom="50px"
    robot2.style.right= "50px"
    if(fullreset == 1){
        collisions1 = 0;
        collisions2 = 0;
        lives1 = 100;
        lives2 = 100;
    }
    updateUI()
}