var bg,bgImg;
var player, shooterImg, shooter_shooting;
var kill
var highestkill
var gameState=1
var heartImage,heart2Image,heart1Image
function preload(){
  

  shooterImg = loadImage("assets/shooter_2.png")
  shooter2=loadImage("assets/shooter_1.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombieImage=loadImage("assets/zombie.png")
bulletImage=loadImage("assets/bullet.png")
heartImage=loadImage("assets/heart_3.png")
heart2Image=loadImage("assets/heart_2.png")
heart1Image=loadImage("assets/heart_1.png")
gunSound=loadSound("assets/shoot.mp3")
winSound=loadSound("assets/win.mp3")
loseSound=loadSound("assets/lose.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite

player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  
   player.setCollider("rectangle",0,0,300,300)
   zombieG=new Group()
bulletG=new Group()

kill=0
highestkill=0
edges=createEdgeSprites()
}

function draw() {
  background(0); 
  if(gameState===1){

  
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
player.collide(edges)

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyDown("space")){
 
  player.addImage(shooter_shooting)
  
  bullet=createSprite(displayWidth-1150, player.y, 50, 10)
  bullet.addImage(bulletImage)
  bullet.scale=0.1
  bullet.velocityX=10
  
  
  bulletG.add(bullet)
  bullet.lifetime=500
  gunSound.play()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
createZombie()
if(zombieG.isTouching(player)){
  for(var i=0;i<zombieG.length;i++){
    if(zombieG[i].isTouching(player)){
     player.destroy()
      zombieG.destroyEach()
      gameState=2
    }
    
  
}
}

if(zombieG.isTouching(bulletG)){
for(var i=0;i<zombieG.length;i++){
  if(zombieG[i].isTouching(bulletG)){
  zombieG[i].destroy()
  bulletG.destroyEach()
 
  kill=kill+1
}
}
}}
drawSprites();
textSize(30)
fill("purple")

text("KILLS:"+kill,displayWidth-500,10,30,30)
text("HIGHESTKILLS:"+highestkill,displayWidth-900,10,30,30)

 if(gameState===2){ 
  if(kill>highestkill){
    winSound.play()
    highestkill=kill
  }
  if(highestkill>kill){
loseSound.play()
  }
 
  zombieG.destroyEach()
player.destroy()
text("OOPS U HAVE LOST NOW GO AND STUDY",300,400)
text("Just Kidding Press Right Arrow to reset the game",300,500) 

}
if(keyDown(RIGHT_ARROW)&&gameState===2){
  reset()
}
}  

function createZombie(){
  if(frameCount%100===0){
    zombie=createSprite(Math.round(random(600,1000)),Math.round(random(100,500)),25,25)
zombie.addImage(zombieImage)
zombie.scale=0.2
zombie.velocityX=-5


zombieG.add(zombie)
zombie.lifetime=1000
  }
}
function reset(){
  gameState=1
  kill=0
  player.destroy()
  createPlayer()

   
}
function createPlayer(){
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooter2)
   player.scale = 0.3
}