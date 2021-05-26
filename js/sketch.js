let nave;
let flota;
let speed = 10;
let start = false;
let row = 1;
let victory = false;
let lost = false;
let pause = false;

function preload(){
	fin = loadImage("assets/img/fin.png");
	fondo = loadImage("assets/img/fondo.png");
	naveImg = loadImage("assets/img/nave.png");
	inicio = loadImage("assets/img/inicio.png");
	yamete = loadImage("assets/img/yamete.png");
	alienImg = loadImage("assets/img/enemigo1.png");
	victoria = loadImage("assets/img/victoria.png");
	alien2Img = loadImage("assets/img/enemigo2.png");
	alien3Img = loadImage("assets/img/enemigo3.png");
	disparoImg = loadImage("assets/img/disparo.png");
	disparo2Img = loadImage("assets/img/disparo2.png");
	naveLaser = loadSound('assets/sounds/navelaser.mp3');
	alienLaser = loadSound('assets/sounds/alienlaser.mp3');
	fondoSound = loadSound('assets/sounds/musicadefondo.mp3');
	lostSound = loadSound('assets/sounds/musicadederrota.mp3');
	victoriaSound = loadSound('assets/sounds/musicadevictoria.mp3');

}

function setup() {
	createCanvas(windowWidth/1.6, windowHeight);
	flota = new Flota(0, 80, alienImg, alien2Img, alien3Img);
	nave = new Nave(40, 40, width/2, height-20, naveImg, flota.flota);
	flota.crearFlota(nave, row);
	row++;

	victoriaSound.setVolume(0.02);
	lostSound.setVolume(0.02);
	fondoSound.setVolume(0.02);
	alienLaser.setVolume(0.01);
	naveLaser.setVolume(0.01);
}

function draw() {
	background("black");
	if(start){
		if(!victory && !lost)
		{
			if(pause){
				if(!fondoSound.isPlaying()){
				  fondoSound.play();
				}
				background(fondo);
				textSize(40);
				fill("white");
				text(nave.vida, 10, 50);
				for(let i = 0; i < nave.vida; i++)
					image(naveImg, 50*(i+1), 20, 30, 30);
				text("SCORE: "+nave.score, width-270, 50);
				stroke("white");
				line(0, 70, width, 70);
				nave.display();
				flota.display();
				if(flota.rest() == 0){
					flota.crearFlota(nave,row);
					row++;
					if(row > 4)
						victory = true;
				}
				if(nave.vida <= 0)
					lost = true;
				move();
			}
			else{
				background(yamete)
			}
		}
		else{
			fondoSound.stop();
			if(victory){
				background(victoria);
				if(!victoriaSound.isPlaying()){
				  victoriaSound.play();
				}
			}
			else{
				background(fin);
				if(!lostSound.isPlaying()){
				  lostSound.play();
				}
			}
		}
	}
	else{
		background(inicio);
	}
	
}

function move(){
	if(keyIsDown(LEFT_ARROW))
		nave.move(-speed);
	else if(keyIsDown(RIGHT_ARROW))
		nave.move(speed);
	
}

function keyPressed(){
	if(start && !victory && !lost && pause)
		if (keyCode === 32){
			nave.disparo(new Disparo(40, 40, nave.x, nave.y-nave.h, disparoImg, -10));
			naveLaser.play();
		}

	if(keyIsDown(ENTER))
		start = true;

	if(keyIsDown(ENTER) && start){
		pause = !pause;
		if(!fondoSound.isPlaying()){
		  fondoSound.play();
		}
		else{
			fondoSound.stop();
		}
	}

	if(keyIsDown(ENTER) && (lost || victory))
		restart();
}

function restart(){
	nave.vida = 3;
	nave.score = 0;
	row = 1;
	flota.restart();
	flota.crearFlota(nave, row);
	row++;
	lost = false;
	victory = false;
	start = false;
	fondoSound.stop();
	lostSound.stop();
	victoriaSound.stop();
}
