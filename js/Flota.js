class Flota{

	constructor(x, y, c, c2){
		this.x = x;
		this.y = y;
		this.w = 40;
		this.h = 40;
		this.flota = [];
		this.c = c;
		this.c2 = c2;
		this.speed = 3;
		this.nave;
		this.totalAliens = 0;
		this.bps = 2;
	}

	display(){
		for (let linea of this.flota){
			for (let alien of linea){
				alien.display();
			}
		}
		this.move();
		this.speedUp();
	}

	move(){
		for (let linea of this.flota){
			for (let alien of linea){
				if(alien.x+alien.w > width || alien.x < 0){
					this.down();
				}
			}
		}
	}

	down(){
		for (let linea of this.flota){
			for (let alien of linea){
				alien.moveDown(alien.x<width/2?this.speed:-this.speed, this.bps);
			}
		}
	}

	crearFlota(nave, row){
		this.bps = 2;
		this.speed = 3;
		for (let i = 0; i < 2*row; i++){
			let array = [];
			for (let j = 0; j < 10; j++){
				array.push(new Alien(this.w, this.h, this.x+(j)*this.w, this.y+(i)*this.h, i>1?this.c2:this.c, this.speed, nave, this.bps));
				this.totalAliens++;
			}
			this.flota.push(array);
		}
	}

	speedUp(){

		let aliensRest = 0;

		for (let linea of this.flota){
			aliensRest += linea.length;
		}
	
		if(aliensRest < this.totalAliens/2){
			this.speed = 3;
			this.bps = 3;
		}
		if(aliensRest < this.totalAliens/3){
			this.speed = 5;
			this.bps = 6;
		}
	}

	rest(){
		let aliensRest = 0;

		for (let linea of this.flota){
			aliensRest += linea.length;
		}
		return aliensRest;
	}

}