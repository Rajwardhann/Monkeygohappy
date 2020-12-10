
var monkey 
var monkey_running
var banana;
var bananaImage
var obstacle
var obstacleImage
var bananaGroup
var obsGroup
var survivalt = 0;
var banacollect = 0;
var monkey_collided
var gamestate = "waiting";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_5.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bgImage = loadImage("game-background-flat-style-2d-260nw-477346534.webp");
 
}



function setup() {
  createCanvas(600, 400);
  
  bg = createSprite(220,200,1000,200);
  bg.addImage(bgImage);
  bg.scale = 1.8
  bg.velocityX = -8; 
  
  monkey = createSprite(45,320,20,20);
  monkey.addAnimation("monkeyy",monkey_running);
  monkey.addAnimation("monkeycollide",monkey_collided);
  monkey.scale = 0.15;
  
  ground = createSprite(300,390,1200,45);
  ground.velocityX = -8;
  
  
  banana = createSprite(600,170,20,20);
  banana.addAnimation("goal",bananaImage);
  banana.scale = 0.15;
  banana.velocityX = -8;
  
  obstacle = createSprite(600,340,40,60);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.25;
  obstacle.velocityX = -8;
  
  
  
  bananaGroup = new Group();
  obsGroup = new Group();

}
function draw() {
  background("skyblue");
  drawSprites();
  //monkey.debug = true
  monkey.setCollider ("rectangle",0,0,500,500)
  bananaa();
  obsfun();
  
  fill("black");
  textSize(15);
  text("Survival Time : " + survivalt + "sec",450,50);
  
  text("Bananas Collected : " + banacollect,10,50)
  
  
  if(gamestate === "waiting")
  {
    textSize(30)
    text("Press space to start",150,200)
    ground.velocityX = 0;
    bg.velocityX = 0;
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    monkey.changeAnimation("monkeycollide",monkey_collided)
    if(keyDown("space"))
    {
      gamestate = "play";
      obsGroup.destroyEach();
      bananaGroup.destroyEach();
    }
  }
  
  if(gamestate === "play")
  {
    
    monkey.changeAnimation("monkeyy",monkey_running)
    
    if(frameCount%10 === 0)
    {
    survivalt = survivalt + 1;
    }
    if(keyDown("space") && monkey.y > 140 )
  {
    monkey.velocityY = -12;
  }
  if(ground.x < 0)
  {
    ground.x = ground.x + 600
  }
 
  if(bg.x < 120)
  {
    bg.x = bg.x + 300
    
  }
    
    if(obsGroup.isTouching(monkey))
  {
    gamestate = "end";
  } 
  }
  
  monkey.collide(ground);
  
  if(monkey.y <  190)
  {
    monkey.velocityY = monkey.velocityY + 1 ;
  }
  
  if(gamestate === "end")
  {
    ground.velocityX = 0;
    bg.velocityX = 0;
    obstacle.velocityX = 0;
    banana.velocityX = 0;
    monkey.changeAnimation("monkeycollide",monkey_collided);
    textSize(30);
    text("Press R to Restart",200,100);
    
    
    
    
  }
  
  if(keyDown("r") && gamestate=== "end")
  {
    gamestate = "waiting";
    monkey.changeAnimation(monkey_collided);
    survivalt = 0;
    banacollect = 0;
  }
  
  if(bananaGroup.isTouching(monkey))
  {
    banacollect = banacollect + 1; 
    bananaGroup.destroyEach();
  }
  
 if(frameCount%50 ===0 && gamestate === "play")
 {
   obstacle.velocityX = obstacle.velocityX - 3;
   banana.velocityX = banana.velocityX - 3;
 }
  
}


  

function bananaa() {
  
  if(frameCount%80 === 0) 
  {
    banana = createSprite(700,170,20,20);
    banana.addAnimation("goal",bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -6;
  }
    banana.lifetime = -100
    bananaGroup.add(banana);
}

function obsfun() {
  if(frameCount%150 === 0) 
  {
    obstacle = createSprite(700,340,40,60);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -8;
    obstacle.setCollider("rectangle",0,0,400,400);
    
  }
    obstacle.lifetime = -100
    obsGroup.add(obstacle);
    
}


