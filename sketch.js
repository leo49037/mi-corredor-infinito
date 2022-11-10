var corredor_running, corredor_collide ,fondo_Image ,obstaculo_Image ,gameOver_Image;
var corredor ,fondo ,obstaculo ,gameOver,energia;
var invisibleGround;
var longitud =0
var score =0
var rectangle;

//gameStates
var END = 0;
var PLAY = 1;
var gameState = 1;

function preload(){
    
    //cargar las imagenes
     corredor_running = loadAnimation("corredor5.png","corredor6.png");
     corredor_collide = loadImage("corredorCollide.png");
     fondo_Image = loadImage("camino.png");
     obstaculo_Image = loadImage("obstaculo.png");
     energia_Image = loadImage("energia.png");
     gameOver_Image = loadImage("gameOver.png")
    }

function setup() {
    createCanvas(1200,300); 
    
    //crear el fondo
    fondo = createSprite(100,140);
    fondo.addImage(fondo_Image);
    fondo.x = fondo.width /2;
    fondo.scale=1;
    fondo.velocityX=-9;
    
    //crear sprite del corredor
    corredor = createSprite(50,160,40,20,);
    corredor.addAnimation("corredor_running",corredor_running);
    corredor.addImage("collided",corredor_collide);
    corredor.scale=0.2
    
    //crear un suelo invisible
    invisibleGround = createSprite(600,295,1200,10);
    invisibleGround.visible = true;

    //crear el gameOver
    gameOver = createSprite(650,150);
    gameOver.addImage(gameOver_Image);
    gameOver.scale = 0.8;
    gameOver.visible=false
    
   
    score =0
    longitud =0
   
    energiaG =new Group();
    obstaculoG=new Group();
  
    corredor.setCollider("circle",0,0,250);
    corredor.debug=false 
   
   
}
function draw() {
     
   
   if(gameState === PLAY){
        background(180);  
        
        longitud = longitud + Math.round(getFrameRate()/50);
        fondo.velocityX = -(7 + 2*longitud/150);
        
        //hacer que el fondo se regenere
        if (fondo.x < 600){
            fondo.x = fondo.width/2;
        }
            
        //hacer que el corredor salte al presionar la barra espaciadora
        if(keyDown("space")&& corredor.y >= 235) {
            corredor.velocityY = -16;

        }
            
        //agregar gravedad
        corredor.velocityY = corredor.velocityY + 0.75

        //evitar que el corredor caiga
        corredor.collide(invisibleGround);
        
      
    
        //hacer que aparesca el obstaculo
        spawnObstacle();
        
        //hacer que aparesca la energia
        spawnEnergia();
    
        if (energiaG.isTouching(corredor)) {
            energiaG.destroyEach();
            score=score+1
        }
    
        if (obstaculoG.isTouching(corredor)) {
           gameState=END
           
           gameOver.visible=true
           
           
        }
        
       
        drawSprites();
    
        textSize(20);
        fill(255);
        text("energia: "+ score,50,30);
        
        textSize(20);
        fill(255);
        text("distancia: "+ longitud,1000,30);
    }    

    if(gameState === END){
        
        if(keyDown("Enter")) {
            reset();
        
        }
        
        
        
        fondo.velocityX=0
        corredor.velocityX=0
        
        obstaculoG.setVelocityXEach(0);
        obstaculoG.setLifetimeEach(-1);
      
        energiaG.setVelocityXEach(0);
        energiaG.setLifetimeEach(-1);
      
        textSize(20);
        fill(255);
        text("Presiona la tecla enter para reiniciar el juego", 450,200);
        
        
    }
    
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    energiaG.destroyEach();
    obstaculoG.destroyEach();
    score=0
    longitud = 0;
    corredor.x=50        
    corredor.y=240
}

function spawnObstacle() {
    //escribir aquí el código para aparecer los obstaculos 
    if (frameCount % 250 === 0) {
      var obstaculo = createSprite(1200,260,40,10);
      obstaculo.addImage(obstaculo_Image);
      obstaculo.scale = 0.25;
      obstaculo.velocityX = -10;
      obstaculoG.add(obstaculo);
       //asignar lifetime a la variable
       obstaculo.lifetime = 250;
    }
}

function spawnEnergia() {
    //escribir aquí el código para aparecer los obstaculos 
    if (frameCount % 550 === 0) {
      var energia = createSprite(1200,260,40,10);
      energia.addImage(energia_Image);
      energia.scale = 0.04;
      energia.velocityX = -10;
      energiaG.add(energia);

       //asignar lifetime a la variable
       energia.lifetime = 250;
    }
}
