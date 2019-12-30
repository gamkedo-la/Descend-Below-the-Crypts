class QuestOne extends GameState {
    constructor() {
        super();
		
		addCloud(50, 60); 
		addCloud(120, 400); 
		addCloud(140, 300); 
		addCloud(300, 200); 
		addCloud(400, 300); 
		addCloud(500, 500); 

    }
	
    draw() {
        super.draw();

        canvasContext.drawImage(questOneBackgroundPic, 0, 0);
		drawCloud();	
		moveCloud();
		canvasContext.drawImage(scryingPic, 0, 0);	
    }
	


    onMouseClick(mouseXPosition, mouseYPosition) {
        this.mouseXClickPosition = mouseXPosition;
        this.mouseYClickPosition = mouseYPosition;
        this.handleStateSelection();
    }

    onMouseMove(mouseX, mouseY) {

    }

    onKeyPress(evt) {

    }

    onKeyRelease(evt) {

    }
}

var cloudList = [];

function cloudClass(xPos, yPos){		
		this.x = xPos;
        this.y = yPos;
        this.pic = cloudPic;
        
		this.draw = function() {
			 canvasContext.drawImage(this.pic, this.x, this.y);
		}
		
		this.move = function(){
			
			this.x += this.vel;
			
			if(this.x > canvas.width || this.x < 0){
				this.vel = this.vel * -1;
			}
			
		}
		
		
}

function addCloud(cloudX, cloudY) {
	var tempCloud;

	tempCloud = new cloudClass();
	tempCloud.x = cloudX;
	tempCloud.y = cloudY;
	tempCloud.velX = getRndInteger(-2, 2)
	tempCloud.velY = getRndInteger(-1, 1)

	cloudList.push(tempCloud);
}

function moveCloud() {
	for(var i=0;i<cloudList.length;i++) {
		cloudList[i].move();
	}
}

function drawCloud() {
	for(var i=0;i<cloudList.length;i++) {
		cloudList[i].draw();
	}
}

