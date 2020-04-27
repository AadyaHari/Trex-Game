var trex, trexRunning, trexCollided, ground, groundImg, cloudsGroup, cloudImg, invisibleGround, obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, gameState, PLAY,END, count, gameOver,gameOverImg, restart, restartImg;

function preload(){
trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundImg = loadImage("ground2.png");
trexCollided = loadImage("trex_collided.png");
cloudImg = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
trex = createSprite(50,140,10,40);
trex.addAnimation("t1", trexRunning);
trex.scale = 0.45;
  
obstaclesGroup = createGroup();
cloudsGroup = createGroup();
  
ground = createSprite(300,180,600,20);
ground.addImage(groundImg);
ground.x = ground.width/2;
ground.velocityX = -6

invisibleGround = createSprite(300,185,600,5);
invisibleGround.visible = false;
PLAY = 1;
END = 0;
gameState = PLAY;
count = 0;
gameOver = createSprite(300,60) ;
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;
gameOver.visible = false;
restart = createSprite(300,100);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;
}

function draw() {
  background(242);
  
  text("Score: "+ count, 510, 80);
  
  if(gameState === PLAY){
    ground.velocityX = -6;
    count = count + Math.round(getFrameRate()/60);
  if (ground.x < 0){
      ground.x = ground.width/2;
}
  if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12;
} 
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
    
  if(obstaclesGroup.isTouching(trex)){
      gameState = END;
}
}
  
  else if(gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
        trex.addImage(trexCollided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
}
  if (mousePressedOver(restart)) {
   reset();
}
trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,140,40,10);
    cloud.y = Math.round(random(115,145));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -2;
    cloud.lifetime = 300;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 85 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -5;
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }
    obstacle.scale = 0.45;
    obstacle.lifetime = 124;
    obstaclesGroup.add(obstacle);
  }
}
function reset() {
  restart.visible = false;
  gameOver.visible = false;
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  count = 0;
  trex.addAnimation("t2",trexRunning);
}
