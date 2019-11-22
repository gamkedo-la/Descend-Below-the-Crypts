const KEY_LETTER_W = 87;
const KEY_LETTER_S = 83;

const START_SMOKE = 100;

const GRAVITY_PER_CYCLE = 0.1;

var remX = 300, remY = 200;
var remW = 300, remH = 200;

function smokeClass() {
	this.x = 75;
	this.y = 75;
	this.velX = 5;
	this.velY = -7;
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

function addSmoke(smokeX, smokeY) {
	var tempSmoke;
	console.log(smokeX, smokeY);

	tempSmoke = new smokeClass();
	tempSmoke.x = smokeX;
	tempSmoke.y = smokeY;
	tempSmoke.velX = getRndInteger(-1, 1)
	tempSmoke.velY = getRndInteger(-3, -1)
	tempSmoke.cyclesLeft = 30 + Math.floor( Math.random() * 100 );

	var colorOptions = Math.random();
	if(colorOptions < 0.25) {
		tempSmoke.myColor = "darkGray";
	} else if (colorOptions >= 0.25 && colorOptions <= 0.5) {
		tempSmoke.myColor = "DimGray";
	} else if (colorOptions > 0.5 && colorOptions <= 0.6) {
		tempSmoke.myColor = "black";
	} else {
		tempSmoke.myColor = "lightGray";
	}

	smokeList.push(tempSmoke);
}

function getRndInteger(min, max) {
  return Math.random() * (max - min) + min;
}

function removeBall() {
	for(var i=0; i<smokeList.length; i++) {
		if(smokeList[i].x > remX && 
			smokeList[i].x < remX+remW && 
			smokeList[i].y > remY && 
			smokeList[i].y < remY+remH) {
			
			smokeList[i].readyToRemove = true;
		}
	}
}

function keyPressed(evt) {
	if(evt.keyCode == KEY_LETTER_W) {
		for(var i=0; i < START_SMOKE; i++) {
			addSmoke(100, 300);
		}	
	}
	if(evt.keyCode == KEY_LETTER_S) {
		removeBall();
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	document.addEventListener("keydown", keyPressed);

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
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
