let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{
    x: 8 * box,
    y: 8 * box
}];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let level = 1;
let speed = 200;
let points = 0
let count = 10;
let play = "";
const levelLabel = document.getElementById("levelLabel");
const pointsLabel = document.getElementById("pointsLabel");

    //Cria o plano de fundo canvas
function createBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
    //Renderiza a cobra
function createSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box );
    }
}

    //Renderiza a comida na posição aleatória determinada através do objeto food
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

    //Função para definir a direção da cobra após teclar o botão
function update(event){
    // 37-esquerda - 38-baixo - 39-direita - 40-cima
    if(event.keyCode ==37 && direction != "right"){
        direction = "left"
    }
    if(event.keyCode ==38 && direction != "down"){
        direction = "up"
    }
    if(event.keyCode ==39 && direction != "left"){
        direction = "right"
    }
    if(event.keyCode ==40 && direction != "up"){
        direction = "down"
    }
}

    createBG();
    createSnake();
    drawFood();

function main(){

    //Condição para cobra atravessar o mapa de um lado e aparecer do outro
    function crossMap(){

        if(snake[0].x > 15 * box && direction == "right"){
            snake[0].x = 0;
        }
        if(snake[0].x < 0 * box && direction == "left"){
            snake[0].x = 16 * box;
        }
        if(snake[0].y > 15 * box && direction == "down"){
            snake[0].y = 0;
        }
        if(snake[0].y < 0 && direction == "up"){
            snake[0].y = 16 * box;
        }

    }crossMap();

    //Verifica se a cabeça da cobra ocupa o mesmo espaço que o corpo (fim de jogo)
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(main);
            alert("Game Over! ;-;")
            level=1;
            speed=350;
            play="";
            snake = [{
                x: 8 * box,
                y: 8 * box
            }];
            location.reload();
        }
    }

    createBG();
    createSnake();
    drawFood();

    //Movimento da cobra e atualização dos pontos
    function snakeMovement(){

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y)
    {
        snake.pop();

    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        points = (count * (snake.length))
        pointsLabel.innerHTML = ('PONTOS: ' + points)
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // Adiciona um elemento no inicio   

    }snakeMovement();

    //Definição o nivel
    function level(){
        if(snake.length>5 && snake.length<=10){
            speed=160;
            level=2;
            levelLabel.innerHTML = ('NÍVEL: ' + level)
            count = 20;
            return speed, count;
        } else if(snake.length>10 && snake.length<=15){
            speed=130;
            level=3;
            levelLabel.innerHTML = ('NÍVEL: ' + level)
            count = 30;
            return speed, count;
        }else if(snake.length>15 && snake.length<=20){
            speed=800;
            level=4;
            levelLabel.innerHTML = ('NÍVEL: ' + level)
            count = 40;
            return speed, count;
        }else if(snake.length>20){
            speed=30;
            level=5;
            levelLabel.innerHTML = ('NÍVEL: ' + level)
            count = 50;
            return speed, count;
        }
    }level();

}

document.addEventListener('keydown', update);

function start(){
 play=setInterval(main, speed);
}


