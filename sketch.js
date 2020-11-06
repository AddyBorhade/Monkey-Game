var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var spawnBanana
var survivalTime = 0
var backGround
var deathCount = 0
var PLAY = 0, END = 1;
var gameState = PLAY
 


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle-trees-stock-illustrations-cliparts-and-royalty-free-jungle.jpg")

}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(40, 400)
  monkey.addAnimation("monkeyAni", monkey_running)
  monkey.scale = 0.2
  ground = createSprite(40, 550, 1500, 100)
  bananaGroup = new Group()
  obstacleGroup = new Group()
backGround = createSprite(300,300,20,20)

  backGround.addAnimation("back", backgroundImage)
}


function draw() {
  background("white")
  drawSprites()
  
  if(gameState === PLAY){
      spawnObstacle()
  survivalTime = survivalTime + Math.round(getFrameRate() / 60);
  if (keyDown("space") && monkey.y >= 438.6) {
    monkey.velocityY = -35
  }

  console.log(monkey.y)

  monkey.velocityY = monkey.velocityY + 1.8

  spawnBanana()
  
  backGround.velocityX = -4
  if (backGround.x<0){
    backGround.x = backGround.width/2
    
    
    
  }
    
    if (monkey.isTouching(bananaGroup)) {
    for (var i = 0; i < bananaGroup.length; i = i + 1) {
      if (bananaGroup.get(i).isTouching(monkey)) {
        bananaGroup.get(i).remove()
        survivalTime = survivalTime + 10
      }
    }
  }
    
    if(deathCount === 1){
          monkey.scale = 0.1
        }
        if(deathCount === 2){
          gameState = END
  }
    if(obstacleGroup.isTouching(monkey)){
      deathCount = deathCount +1
      obstacleGroup.destroyEach()
    }
  }
  
  else if(gameState === END){
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);  
    backGround.velocityX = 0
  }
  


  text("Survival Time: " + survivalTime, 500, 50)

  monkey.collide(ground)

  monkey.depth = monkey.depth + 1
 
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
    banana = createSprite(600, 20, 20, 20)
    banana.addImage("bananaAni", bananaImage)
    banana.scale = 0.1
    banana.velocityX = -7
    banana.y = Math.round(random(20, 450))
    banana.lifetime = 85
    bananaGroup.add(banana)
  }
}

function spawnObstacle() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(590, 475, 20, 20)
    obstacle.addImage("obstacleAni", obstacleImage)
    obstacle.scale = 0.2
    obstacle.velocityX = -7
    obstacle.lifetime = 80
    obstacleGroup.add(obstacle)
  }
}

switch(score){
  case 10: player.scale = 0.12;
    break;
  case 20: player.scale = 0.14;
    break;
  case 30: player.scale = 0.16;
    break;
  case 40: player.scale = 0.18;
    break;
    default: break;
    
}






