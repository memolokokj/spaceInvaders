class Nave{

	constructor(w, h, x, y, c, aliens){
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		this.c = c;
		this.disparos = [];
		this.aliens = aliens;
		this.vida = 3;
		this.score = 0;
	}

	display(){
		image(this.c, this.x, this.y-this.h, this.w, this.h);
		this.deleteBullet();
		for (let [j,disparo] of this.disparos.entries()) {
	  		disparo.display();

	  		for (let linea of this.aliens){
				for (let [i,alien] of linea.entries()){
					if(disparo.x-disparo.w < alien.x && disparo.x >= alien.x-alien.w/2 && 
					   disparo.y < alien.y+alien.h && disparo.y >= alien.y-alien.h/2)
				    {
				    	this.disparos.splice(j, 1);
				    	linea.splice(i, 1);
				    	this.score += 10;
				    }
				}
			}
		}
	}

	move(x){

	    if(x < 0 && this.x > 0)
	    	this.x += x;
	    if(x > 0 && this.x+this.w < width)
	     	this.x += x;
  	}

  	disparo(d){
  		this.disparos.push(d);
  	}

  	deleteBullet(){
  		for (let i = 0; i < this.disparos.length; i++) {
		  	if(this.disparos[i].y <= 0)
		  		this.disparos.splice(i, 1);
		}
  	}

  	dead(){
  		this.vida--;
  	}
}