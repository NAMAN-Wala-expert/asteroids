var player,bg,bgImg,playerS
var asteroid,asteroidImg
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOver,g_img;
var go,go_img;
var suspense,suspense_wav;
var distance=0;
var ufo_img,ufo,bullet_img,bullet;

function preload(){
    bgImg = loadImage("space.jpg");
    playerS = loadImage("r.png");
    asteroidImg = loadImage("a.png");
    asteroidImg = loadImage("a.png");
    g_img = loadImage ("g.png");
    go_img = loadSound ("sad.wav");
    suspense = loadSound ("suspense.wav");
    ufo_img = loadImage ("UFO.png");
    bullet_img = loadImage ("bu.png")
}

function setup() {
    createCanvas(windowWidth/2,windowHeight);

    bg = createSprite(windowWidth/4,120);
    bg.addImage(bgImg);
    bg.scale = 2.3;
    bg.velocityY = 9;
  
    player = createSprite(windowWidth/4,windowHeight/1.5,30,30);
    player.addImage(playerS);
    player.scale = 0.5;
    player.velocityY = 1.5; 

    ufo = createSprite(windowWidth/4,windowHeight/1.01,30,30);
    ufo.addImage(ufo_img);
    ufo.scale = 0.4;
   
 asteroidGroup = new Group();
 bulletGroup = new Group();
}

function draw() {
    background(0);    
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance:" + distance, 500,windowHeight/10);

     if (gameState===PLAY) {

      distance = distance + Math.round(getFrameRate()/62);    

    if(bg.y > 570 ){
    bg.y = 120;
    bg.velocityY = 9;
    player.velocityY = 1.5
  }

  if (World.frameCount % 70 === 0) {
    asteroid_G();
    bullet_g();

    if (bulletGroup.isTouching(asteroidGroup) || asteroidGroup.isTouching(bulletGroup)) {
      bulletGroup.destroyEach();
      asteroidGroup.destroyEach();
    }

  }

  if(keyDown("RIGHT_ARROW")) {
    player.x = player.x+5
  }

  if(keyDown("LEFT_ARROW")) {
    player.x = player.x-5
  }   
  
  if(keyDown("UP_ARROW")) {
    player.y = player.y-9
  }   

  if(keyDown("DOWN_ARROW")) {
    player.y = player.y+5
  }

  if(player.isTouching(asteroidGroup) || player.isTouching(bulletGroup)) {
    gameState = 0
  } 

 

  edges= createEdgeSprites();
   player .collide(edges);

  if (gameState === END) {
    go_img.play();
  }


 






  


}else if (gameState === END) {

  text("GameOVER You Lost" , 200,windowHeight/2);

    player.velocityX = 0;
    player.velocityY = 0;
    bg.velocityY = 0;   



    if ( keyDown("space") && gameState===END) {
      reset();      
    }
    asteroidGroup.destroyEach();
    bulletGroup.destroyEach();   
    
  }
}

function asteroid_G(){
  asteroid =createSprite(Math.round(random(50, 500)),windowHeight/100);
  asteroid.scale =0.5;
  asteroid.velocityY = 4
  asteroid.addImage(asteroidImg);
  asteroidGroup.setLifetimeEach(99);
  asteroidGroup.add(asteroid);

  
}

function bullet_g(){
  bullet = createSprite(Math.round(random(50, 500)),windowHeight/1.01);
  bullet.addImage(bullet_img);
  bullet.scale = 0.1;
  bullet.velocityY = -14;
  bulletGroup.setLifetimeEach(19);
  ufo.x = bullet.x;
  bulletGroup.add(bullet);
 
  
}

function reset(){
  gameState = PLAY; 
  
  asteroidGroup.destroyEach();
  bg.velocityY = 9;
  player.velocityY = 4;  
  distance = 0;

  player.x = windowWidth/4;
  player.y = windowHeight/1.3
 

     
  
 }