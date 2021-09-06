var space, spaceImg;
var rocket, rocketImg;
var comet, cometImg, cometsGroup;
var gameState = "play";
var score = 0;
var restartBtn, restartImg;
var textBox;

function preload(){
    spaceImg = loadImage("space_1.png");
    rocketImg = loadImage("rocket_10.png");
    cometImg = loadImage("comet.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(570,600);
    
    space = createSprite(285,300,600,600);
    space.addImage("space", spaceImg);
    space.velocityY = 1;
    space.scale = 0.6;

    rocket = createSprite(300,380,10,10);
    rocket.addImage("rocketship", rocketImg);
    rocket.scale = 0.019;


    restartBtn = createSprite(300,380);
    restartBtn.addImage(restartImg);
    restartBtn.scale = 0.8;
    restartBtn.visible = false;

    cometsGroup = new Group();

    score = 0;
}

function draw() {
    background(255);
    
    
    drawSprites();
    text("Score: "+ score, 20,20); 
    
    if(gameState === "play") {
        score = score + Math.round(getFrameRate()/60);
        spawnComets();

        if(keyDown(LEFT_ARROW)) {
            rocket.x = rocket.x - 3;
        }

        if(keyDown(RIGHT_ARROW)) {
            rocket.x = rocket.x + 3;
        }
        
        if(space.y > 390) {
            space.y = 300;
        }

        if(cometsGroup.isTouching(rocket)) {
            //rocket.destroy();
            rocket.visible = false;
            gameState = "end";
        }
    }

    if(gameState === "end") {
        space.velocityY = 0;
        cometsGroup.setVelocityYEach(0);
        
        restartBtn.visible = true;
      
        if(keyDown("space")) {
            reset();
        }
    }
}

function spawnComets() {
    if(frameCount % 180 === 0) {
        var comet = createSprite(300,10,10,10);
        comet.x = Math.round(random(100,400));
        comet.addImage(cometImg);
        comet.velocityY = 1;
        comet.scale = 0.5;

        comet.lifetime = 600;

        comet.depth = rocket.depth;
        rocket.depth = rocket.depth + 1;

        cometsGroup.add(comet)
    }
}

function reset() {
    gameState = "play";
    space.velocityY = 1;
    cometsGroup.destroyEach();
    restartBtn.visible = false;
    rocket.visible = true;
    score = 0;

}