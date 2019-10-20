ratNames = [ "rat"];

ratClass.prototype = new enemyClass();
function ratClass() {
	this.width = 58; // This should go into the Rat Init
	this.height = 33; 
	this.maxHealth = 4;
	this.speed = 4;
	
	this.superClassReset = this.enemyReset;
	this.ratReset = function() {
		this.superClassReset();
		this.speed = 4;
		this.hitPoints = this.maxHitPoints;
	}
					
	this.superClassInitialize = this.init;
	this.init = function(whichGraphic, whichName, whichTile) {
		this.superClassInitialize(whichGraphic, whichName, whichTile);		
		this.ratReset();
	}	
	 
	this.superClassMove = this.movement;
	this.movement = function() {	
	}
	
	this.superClassDraw = this.draw;
	this.draw = function(){
		this.superClassDraw();
	}
}