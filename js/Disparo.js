class Disparo{

	constructor(w, h, x, y, c, stepY){
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		this.c = c;
		this.stepY = stepY;
	}

	display(){
		image(this.c, this.x, this.y-this.h, this.w, this.h);
		this.move();
	}

	move(){
		this.y += this.stepY;
	}
}