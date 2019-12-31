class QuestOne extends Cutscene {
	constructor() {
		super();

		addCloud(5, 20);
		addCloud(50, 400);
		addCloud(70, 300);
		addCloud(150, 200);
		addCloud(200, 500);
		addCloud(250, 600);
		addCloud(300, 100);
		addCloud(325, 300);
		addCloud(370, 150);
		addCloud(420, 400);
		addCloud(460, 100);
		addCloud(530, 600);
	  }

	draw() {
		super.draw();

		if (this.state == SceneState.STARTED) {
			canvasContext.drawImage(questOneBackgroundPic, 0, 0);
			drawCloud();
			moveCloud();
			canvasContext.drawImage(scryingPic, 0, 0);
			colorRect(50, 50, 300, 500, "White")

			colorText("A", 55, 125, 'black', '72px Arial Black');
			colorText("s you scry into the crystal ball,", 105, 90, 'black', '12px Arial Black');
			colorText("you see Kurden, the Orc Boss" , 110, 107, 'black', '12px Arial Black'); 
			colorText("comfortable in his stolen space." , 115, 125, 'black', '12px Arial Black'); 
			
			colorText("A bit of Anger is felt in your veins as you", 55, 161, 'black', '12px Arial Black');
			colorText("see your King's chamber occupied by this " , 55, 179, 'black', '12px Arial Black'); 
			colorText("murderer." , 55, 197, 'black', '12px Arial Black'); 
			
			colorText('"I must find a way to vanquish this Villain!', 55, 233, 'black', '12px Arial Black');
			colorText('How dare does he sit in the King\'s thrown. ' , 55, 251, 'black', '12px Arial Black'); 
			colorText('There must be a way...."' , 55, 269, 'black', '12px Arial Black'); 
						
			colorText('Spoken with a deep breath, "Mary! ', 55, 305, 'black', '12px Arial Black');
			colorText('Mary has a key.  Mary must provide me ', 55, 323, 'black', '12px Arial Black');
			colorText("with the key to enter the castle through"  , 55, 341, 'black', '12px Arial Black'); 
			colorText('the servant\'s quarters."'  , 55, 359, 'black', '12px Arial Black'); 
			
			
			colorText("All the training provided by your parents", 55, 395, 'black', '12px Arial Black');
			colorText("will be put to the test.  Before you can  ", 55, 413, 'black', '12px Arial Black');
			colorText("enter, find Mary to obtain" , 55, 431, 'black', '12px Arial Black'); 
			colorText("the key.  Enter through the Servant's" , 55, 449, 'black', '12px Arial Black'); 
			colorText("chamber and make your way through the " , 55, 467, 'black', '12px Arial Black'); 
			colorText("kitchen. The Orc Boss is strong, but with" , 55, 485, 'black', '12px Arial Black'); 
			colorText("your training and with a weapon, " , 55, 503, 'black', '12px Arial Black'); 
			colorText("you can revenge your king, parents, " , 55, 521, 'black', '12px Arial Black'); 
			colorText("and friends." , 55, 539, 'black', '12px Arial Black'); 
			

			// change this.state to SceneState.FINISHED when cutscene is done
		}
	}

	onMouseClick(mouseX, mouseY) {
		this.state = SceneState.FINISHED;
	}

	onMouseMove(mouseX, mouseY) {

	}

	onKeyPress(evt) {
		this.state = SceneState.FINISHED;
	}

	onKeyReleased(evt) {

	}
}

var cloudList = [];

function cloudClass(){
	this.x;
	this.y;
	this.velX;
	this.velY;
	this.pic = cloudPic;

	this.draw = function() {
		 canvasContext.drawImage(this.pic, this.x, this.y);
	}

	this.move = function(){

		this.x += this.velX;

		if(this.x > (canvas.width + 300) || this.x < -300){
			this.velX = this.velX * -1;
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
