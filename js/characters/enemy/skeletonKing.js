//////////// SKELETON KING /////////////////////////////

const SKELETON_KING_MAX_HEALTH = 2;
const SKELETON_KING_MOVEMENT_SPEED = 5;
const SKELETON_KING_WIDTH = 33;
const SKELETON_KING_HEIGHT = 56;

class SkeletonKing extends Enemy {
  constructor() {
    super(SKELETON_KING_MAX_HEALTH, SKELETON_KING_MOVEMENT_SPEED, SKELETON_KING_WIDTH, SKELETON_KING_HEIGHT);
  }

  init() {
    super.init(skeletonKingPic, "Lazarus", TILE_SKELETON_KING);
	this.enableAnimation = true;
	this.canMove = true;
  }
}

///////// SKELETON KING'S TOMB  //////////////////////////////

const SKELTONKINGS_TOMB_MAX_HEALTH = 1000;
const SKELTONKINGS_TOMB_MOVEMENT_SPEED = 0;
const SKELTONKINGS_TOMB_WIDTH = 70;
const SKELTONKINGS_TOMB_HEIGHT = 59;

class SkeletonKingsTomb extends Enemy {
  constructor() {
    super(SKELTONKINGS_TOMB_MAX_HEALTH, SKELTONKINGS_TOMB_MOVEMENT_SPEED, SKELTONKINGS_TOMB_WIDTH, SKELTONKINGS_TOMB_HEIGHT)
  }

  init() {
    super.init(kingsTombPic, "", TILE_KINGS_TOMB);
	this.canMove = false;
  }
  
  draw(){
	super.draw();
	
	var toAddParticle = getRndInteger(0, 10);
	if(toAddParticle > 9.5){
		addGreenMagic(317, 82, 20);
		addGreenMagic(347, 95, 20);
	}
	moveGreenMagic();
    drawGreenMagic();
	
  }
}

////////////PARTICLES FOR THE SKELETON KING'S TOMB //////////////////////////////////////

function SkeletonKingParticleClass(){
	this.x = 75;
	this.y = 75;
	this.velX = 5;
	this.velY = -7;
	this.amountOfSmoke = 100;
	this.readyToRemove = false;
	this.cyclesLeft = 300;
	this.myColor;

	this.move = function() {
		this.cyclesLeft--;

		if(this.cyclesLeft < 0) {
			this.readyToRemove = true;
		}

		this.x += this.velX;
		this.y += this.velY;
	}

	this.draw = function() {
		canvasContext.drawImage(greenParticlePic,this.x,this.y);
	}
}

var greenMagicList = [];

function addGreenMagic(greenMagicX, greenMagicY, amount) {
	var tempSmoke;

	tempSmoke = new SkeletonKingParticleClass();
	tempSmoke.x = greenMagicX;
	tempSmoke.y = greenMagicY;
	tempSmoke.velX = getRndInteger(-.2, .2)
	tempSmoke.velY = getRndInteger(-0.5, -0.2)
	tempSmoke.cyclesLeft = 30 + Math.floor( Math.random() * 100 );
	tempSmoke.amountOfSmoke = amount;

	var colorOptions = Math.random();
	if(colorOptions < 0.25) {
		tempSmoke.myPic = greenParticlePic;
	/*} else if (colorOptions >= 0.25 && colorOptions <= 0.5) {
		tempSmoke.myColor = "green";
	} else if (colorOptions > 0.5 && colorOptions <= 0.6) {
		//tempSmoke.myColor = "rgba(100,149,237,.4)";
		tempSmoke.myColor = "black";
	} else {
		tempSmoke.myColor = "green"; */
	} 

	greenMagicList.push(tempSmoke);
}

function removeGreenMagic() {
	for(var i=0; i<greenMagicList.length; i++) {
		if(greenMagicList[i].x > remX &&
			greenMagicList[i].x < remX+remW &&
			greenMagicList[i].y > remY &&
			greenMagicList[i].y < remY+remH) {
			
			greenMagicList[i].readyToRemove = true;
		}
	}
}


function moveGreenMagic() {
	for(var i=0;i<greenMagicList.length;i++) {
		greenMagicList[i].move();
	}
	for(var i=greenMagicList.length-1; i>=0; i--) {
		if(greenMagicList[i].readyToRemove) {
			greenMagicList.splice(i,1);
		}
	}
}

function drawGreenMagic() {
	for(var i=0;i<greenMagicList.length;i++) {
		greenMagicList[i].draw();
	}
}

