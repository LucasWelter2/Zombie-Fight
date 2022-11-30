var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var shootExplosion;
var edges;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;
var life = 3;

var score = 0;

var gameState = "fight"

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  shootExplosion = loadSound("assets/explosion.mp3")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = false
  player.setCollider("rectangle",0,0,300,300)
  
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4

  edges = createEdgeSprites();

  bulletGroup = new Group();
  zombieGroup = new Group(); 

}

function draw() {
  background(0); 

  fill("white")
  textSize(20)
  text("Balas: " + bullets, displayWidth-210, displayHeight/2-250)
  text("Score: " + score, displayWidth-200, displayHeight/2-220)

  

if(gameState === "fight"){

  if(life===3){
    heart3.visible = true;
    heart1.visible = false;
    heart2.visible = false;
  }

  if(life===2){
    heart2.visible = true;
    heart1.visible = false;
    heart3.visible = false;
  }

  if(life===1){
    heart1.visible = true;
    heart3.visible = false;
    heart2.visible = false;
  } 

  if(life===0){
    heart3.visible = false;
    heart1.visible = false;
    heart2.visible = false;
    player.destroy();
    gameState = "lost"
  }

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW")){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")){
  player.y = player.y+30
  }

  if(keyDown("LEFT_ARROW")){
    player.x = player.x-30
  }

  if(keyDown("RIGHT_ARROW")){
  player.x = player.x+30
  }

//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  if(keyWentDown("space")){
    bullet = createSprite(player.x-50, player.y-30, 20, 10)
    bullet.velocityX = 20

    bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    player.addImage(shooter_shooting)
    
    bullets = bullets-1
    shootExplosion.play();
    shootExplosion.setVolume(0.25);

  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyDown("space")){
    player.addImage(shooterImg)
  }

  if(bullets==0){
    gameState = "bullet"
  }
  
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){     
        //escreva uma condição para quando o zombiegroup (grupo de zumbi) tocar bulletGroup (grupo de bala)
     if(zombieGroup[i].isTouching(bulletGroup)){
  //destruir o zumbi
          bulletGroup.destroyEach()
          zombieGroup[i].destroy()
          score = score+2;
        } 
    
    }
  
  }
}
  player.bounceOff(edges);

if(zombieGroup.isTouching(player)){
 

  for(var i=0;i<zombieGroup.length;i++){     
         
    if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life = life-1;
      } 
    
    }
  }

enemy();

drawSprites();

if(gameState == "lost"){
  
  textSize(100)
  fill("red")

  //use texto para mostrar que você perdeu
  text("Player Losted...", 400, 400)
  //destrua o grupo de zumbis
  zombieGroup.destroyEach();
  //destrua o jogador
  player.destroy();

}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Você Ganhou ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("Você ficou sem balas!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}


function enemy(){
  if(frameCount%50===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(500, 1100) ,random(100, 500), 40, 40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}










}