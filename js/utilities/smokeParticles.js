const KEY_LETTER_W = 87;
const KEY_LETTER_S = 83;

var remX = 0, remY = 0;
var remW = 800, remH = 600;

function smokeClass() {
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
		colorCircle(this.x,this.y,
			(20 * this.cyclesLeft/130.0),
		 this.myColor);
	}
}

var smokeList = [];

var canvas, canvasContext;

function addSmoke(smokeX, smokeY, amount) {
	var tempSmoke;

	tempSmoke = new smokeClass();
	tempSmoke.x = smokeX;
	tempSmoke.y = smokeY;
	tempSmoke.velX = getRndInteger(-1, 1)
	tempSmoke.velY = getRndInteger(-3, -1)
	tempSmoke.cyclesLeft = 30 + Math.floor( Math.random() * 100 );
	tempSmoke.amountOfSmoke = amount;

	var colorOptions = Math.random();
	if(colorOptions < 0.25) {
		tempSmoke.myColor = "darkGray";
	} else if (colorOptions >= 0.25 && colorOptions <= 0.5) {
		tempSmoke.myColor = "rgba(100,149,237,.2)";
	} else if (colorOptions > 0.5 && colorOptions <= 0.6) {
		tempSmoke.myColor = "rgba(100,149,237,.4)";
	} else {
		tempSmoke.myColor = "lightGray";
	}

	smokeList.push(tempSmoke);
}

function getRndInteger(min, max) {
  return Math.random() * (max - min) + min;
}

function removeSmoke() {
	for(var i=0; i<smokeList.length; i++) {
		if(smokeList[i].x > remX &&
			smokeList[i].x < remX+remW &&
			smokeList[i].y > remY &&
			smokeList[i].y < remY+remH) {

			smokeList[i].readyToRemove = true;
		}
	}
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveSmoke() {
	for(var i=0;i<smokeList.length;i++) {
		smokeList[i].move();
	}
	for(var i=smokeList.length-1; i>=0; i--) {
		if(smokeList[i].readyToRemove) {
			smokeList.splice(i,1);
		}
	}
}

function drawSmoke() {
	for(var i=0;i<smokeList.length;i++) {
		smokeList[i].draw();
	}
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}
