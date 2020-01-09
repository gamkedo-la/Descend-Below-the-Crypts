function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
	canvasContext.save(); //allows undo translate movement and rotate spin
	canvasContext.translate(atX,atY); //sets the point where the car graphic goes
	canvasContext.rotate(withAngle); //sets the rotation
	canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draws car
	canvasContext.restore(); //undoes the translation movement and rotation since save()
}

function colorText(showWords, textX, textY, fillColor, fontStyle) {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = fontStyle; //"14px Arial Black"
  canvasContext.fillText(showWords, textX, textY);
}

function drawTextWithShadow(text, x,y, color, font="13px sans-serif")
{
	canvasContext.textAlign = "center";
	canvasContext.font = font;
	canvasContext.shadowBlur = 8;
	canvasContext.shadowColor = "black";
	// if these are both 0, it's more like a "glow"
	canvasContext.shadowOffsetX = 0;
	canvasContext.shadowOffsetY = 0;
	canvasContext.fillStyle = color;
	canvasContext.fillText(text, x,y);
	canvasContext.shadowBlur = 0;
}

function toolTipText(txt, font, x, y) {
	/// lets save current state as we make a lot of changes        
	canvasContext.save();
	
    /// set font
    canvasContext.font = font;

    /// draw text from top - makes life easier at the moment
    canvasContext.textBaseline = 'top';

    /// color for background
    canvasContext.fillStyle = '#f50';

    /// get width of text
    var width = canvasContext.measureText(txt).width;

    /// draw background rect assuming height of font
    canvasContext.fillRect(x, y, width, parseInt(font, 10));

    /// text color
    canvasContext.fillStyle = '#000';

    /// draw text on top
    canvasContext.fillText(txt, x, y);

    /// restore original state
    canvasContext.restore();
}

function colorLine(fromX,fromY,toX, toY, strokeColor){
	canvasContext.strokeStyle = strokeColor;
	canvasContext.beginPath();
	canvasContext.moveTo(fromX,fromY);
	canvasContext.lineTo(toX,toY);
	canvasContext.lineWidth = 2;
	canvasContext.stroke();
}

function eyesAnimationClass(xPos,yPos, startFrame, whichPic){
	this.x = xPos;
	this.y = yPos;
	this.eyesPicHeight = 200;
	this.eyesPicWidth = 150;
	this.eyesFrames = 5;
	this.animCycle = 0;
	this.animCycleAdvance = startFrame;
	this.blink = false;
	this.eyesPicture = whichPic

	this.draw = function(){
		if(this.blink == false){
			var toBlink = Math.random();
			if(toBlink < .005){
				this.blink = true;
			} else {
				this.blink = false;
			}
		}

		if(this.blink){
			this.animCycle++;
			if(this.animCycle > 6){
				this.animCycle = 0;
				this.animCycleAdvance++
			}
			if(this.animCycleAdvance > this.eyesFrames){
				this.animCycleAdvance = 0;
				this.blink = false;
			}
		}



		canvasContext.drawImage(this.eyesPicture,
			this.animCycleAdvance * this.eyesPicWidth, 0, this.eyesPicWidth, this.eyesPicHeight,
			this.x, this.y, this.eyesPicWidth, this.eyesPicHeight);
	}
}

function torchFireClass(xPos, yPos, startFrame){
	this.x = xPos;
	this.y = yPos;
	this.torchFirePicHeight = 62;
	this.torchFirePicWidth = 64;
	this.torchFrames = 7;
	this.animCycle = 0;
	this.animCycleAdvance = startFrame;

	this.draw = function(){
		this.animCycle++;
		if(this.animCycle > 6){
			this.animCycle = 0;
			this.animCycleAdvance++
		}
		if(this.animCycleAdvance > this.torchFrames){
			this.animCycleAdvance = 0;
		}

		canvasContext.drawImage(torchFirePic,
			this.animCycleAdvance * this.torchFirePicWidth, 0, this.torchFirePicWidth, this.torchFirePicHeight,
			this.x, this.y, this.torchFirePicWidth, this.torchFirePicHeight);
	}
}
