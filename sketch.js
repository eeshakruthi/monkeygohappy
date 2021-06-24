var backImage,backgr;
var player, player_running;
var ground,ground_img, bananaImage,obstacleImage;


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png");
obstacleImage=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,1000,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup = createGroup();
  obstacleGroup=createGroup();
  survivalTime=0;
}

function draw() { 
  background(0);
   
  stroke("white")
  textSize(30)
  fill("white")
  text("S C O R E :   "+survivalTime,0,50);
  survivalTime=Math.ceil(frameCount/frameRate())

  if(gameState===PLAY){
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }


  if (FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    survivalTime=survivalTime+1;
  }
  
  if (player.isTouching(obstacleGroup)){
        gameState = 0;
    }
    
    if (gameState===END){
    survivalTime=0;
  stroke("white")
  textSize(10)
  fill(rgb(255, 255, 255))
  text("G A M E  O V E R !",295,200)
      obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    //ground.velocityX=0;
    backgr.velocityX=0;
    }

spawnFruit();
spawnObstacles();
  drawSprites();
}
function spawnFruit() {
  if (frameCount%80===0){
    banana=createSprite(600,250,40,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=300;
    player.depth=banana.depth+1;
    FoodGroup.add(banana)
}
}

function spawnObstacles(){
  if (frameCount%300===0){
   obstacle=createSprite(240,355,40,40);
    obstacle.velocityX=-3;
    obstacle.collide(ground);
    obstacle.scale=0.2;
    obstacle.lifetime=200;
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle)
    
  }
}


