class Alien{

	constructor(w, h, x, y, c, speed, nave, bps){
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		this.c = c;
		this.disparos = [];
		this.stepX = speed;
		this.nave = nave;
		this.bps = bps;
	}

	display(){
		image(this.c, this.x, this.y, this.w, this.h);
		this.deleteBullet();
		this.moveSide();
		
		for (let [j,disparo] of this.disparos.entries()) {
	  		disparo.display();

			if(disparo.x-disparo.w < this.nave.x && disparo.x >= this.nave.x-this.nave.w/2 && 
			   disparo.y < this.nave.y+this.nave.h && disparo.y >= this.nave.y-this.nave.h/2)
		    {
		    	this.disparos.splice(j, 1);
		    	nave.dead();
		    }
		}
	}

	disparo(d){
  		this.disparos.push(d);
  	}

	moveSide(){
		this.x += this.stepX;
		if(Math.random()*500 < this.bps){
			this.disparo(new Disparo(40, 40, this.x, this.y+this.h, disparo2Img, 10));
			alienLaser.play();
		}
	}

	moveDown(stepX, bps){
		this.y += this.h;
		this.stepX = stepX;
		this.bps = bps;
		if(this.y >= height-70)
			lost = true;
	}

	deleteBullet(){
  		for (let i = 0; i < this.disparos.length; i++) {
		  	if(this.disparos[i].y > height)
		  		this.disparos.splice(i, 1);
		}
  	}

  	
}