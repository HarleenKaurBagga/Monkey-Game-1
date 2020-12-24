var bananaImg, bananaGroup;
var obstaclesImg, obstaclesGroup;
var score, ground;
var player, monkey;

function preload() {

 player = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  obstaclesImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
}

function setup() {
  createCanvas(500, 400);

  
  monkey = createSprite(40, 280, 20, 20);
  monkey.addAnimation("Player", player);
  monkey.scale = 0.1;

  ground = createSprite(200, 320, 600, 5);
  ground.visible = true;

  obstaclesGroup = new Group();
  bananaGroup = new Group();

  score = 0;
}

function draw() {
  background("lightblue");
  
  
  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -17;
  }
 // console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(ground);

  if (frameCount % 300 === 0) {
    var stone = createSprite(500, 280, 20, 20);
    stone.addImage(obstaclesImg);
    stone.scale = 0.2;
    stone.velocityX = -8;
    stone.lifetime = 100;
    obstaclesGroup.add(stone);
  }

  if (World.frameCount % 80 === 0) {
    var banana = createSprite(500, random(110, 190), 20, 20);
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -8;
    banana.lifetime = 60;
    bananaGroup.add(banana);
  }

  if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    monkey.scale = 0.1;
    score = 0;
  }

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    case 50:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }

  drawSprites();
  stroke("white");
  textSize(22);
  fill("white");
  text("Survival Time : " + score, 300, 80)
}