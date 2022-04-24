var fondo;

var persona, personacorriendo, edges;
var persona3;

var pisoinvisible;

var jaguar, jaguarcorriendo;

var obstaculo1;
var obstaculo3;
var obstaculo4;
var obstaculo5;
var obstaculos;

var grupodeobstaculos;
var PLAY = 1;
var END = 0;
var estadodejuego = PLAY;

var gameover;
var restart;

var GameOver;
var Restart;

var sonidosaltar;
var sonidofin;
var sonidocheck;


function preload()

{
    fondo1 = loadImage("fondoselva.png")

    personacorriendo = loadAnimation("running2.png", "running1.png")
    persona3 = loadImage("resbalarse.png");

    jaguarcorriendo = loadAnimation("jaguar1.png", "jaguar2.png");

    obstaculo1 = loadImage("obstaculo1.png");
    obstaculo3 = loadImage("obstaculo3.png");
    obstaculo4 = loadImage("obstaculo4.png");
    obstaculo5 = loadImage("obstaculo5.png");

    gameover = loadImage("gameOver.png");

    restart = loadImage("restart.png");

    sonidosaltar = loadSound("Jump.mp3");
    sonidofin = loadSound("Gameover.mp3");
    sonidocheck = loadSound("Checkpoint.mp3");

}

function setup() {
    createCanvas(310, 305);
    //crear fondo 
    fondo = createSprite(300, 165, 600, 1);
    fondo.addImage(fondo1);
    fondo.velocityX = -4;
    //crear persona
    persona = createSprite(140, 247, 10, 20);
    persona.addAnimation("running", personacorriendo);
    persona.addAnimation("choque", persona3);
    persona.scale = 0.4;
    //crear jaguar
    jaguar = createSprite(50, 261, 10, 10);
    jaguar.addAnimation("running", jaguarcorriendo);
    jaguar.scale = 0.2;

    edges = createEdgeSprites();
    //crear gameover y restart
    GameOver = createSprite(150, 150);
    Restart = createSprite(160, 180);
    GameOver.addImage(gameover);
    Restart.addImage(restart);
    GameOver.visible = false;
    Restart.visible = false;
    GameOver.scale = 0.6;
    Restart.scale = 0.5;

    //sprite piso invisible
    pisoinvisible = createSprite(155, 280, 310, 3);
    pisoinvisible.visible = false;
    //persona.debug = true;
    //jaguar.debug = true;


    grupodeobstaculos = new Group();

}

function draw()

{
    background("blue");

    //código para reiniciar el fondo

    if (estadodejuego == PLAY)

    {
        if (keyDown("space") && persona.y >= 240)

        {
            persona.velocityY = -10;
            sonidosaltar.play();
        }

        persona.velocityY = persona.velocityY + 0.5;
        if (fondo.x < 10)

        {
            fondo.x = 300;
        }

        obstaculosenmovimiento();
        if (grupodeobstaculos.isTouching(persona))

        {
            estadodejuego = END;
            sonidofin.play();
        }

    } else if (estadodejuego == END)

    {
        pisoinvisible.velocityX = 0;
        grupodeobstaculos.setVelocityXEach(0);
        grupodeobstaculos.setLifetimeEach(-1);
        persona.changeAnimation("choque", persona3);
        fondo.velocityX = 0;
        persona.velocityY = 0;
        GameOver.visible = true;
        Restart.visible = true;
        if (mousePressedOver(Restart))

        {
            Reinicio();
        }
    }

    persona.collide(pisoinvisible);
    drawSprites();
}

function obstaculosenmovimiento() {
    if (frameCount % 120 == 0) {
        obstaculos = createSprite(305, 280, 13, 5);
        obstaculos.velocityX = -3;
        obstaculos.lifetime = 120;
        grupodeobstaculos.add(obstaculos);
        obstaculos.scale = 0.05;

        var cambio = Math.round(random(1, 5));
        switch (cambio) {
            case 1:
                obstaculos.addImage(obstaculo1);
                break;

            case 2:
                obstaculos.addImage(obstaculo3);
                break;

            case 3:
                obstaculos.addImage(obstaculo4);
                break;

            case 4:
                obstaculos.addImage(obstaculo5);
                break;

            default:
                break;
        }
    }
}

function Reinicio() {
    estadodejuego = PLAY;
    grupodeobstaculos.destroyEach();
    GameOver.visible = false;
    Restart.visible = false;
    persona.changeAnimation("running", personacorriendo);

}