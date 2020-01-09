var newLevelTitle = new function(){

	const FADING = 0.01;
	var levelName = "";
	var transparency = 0;
	
	this.begin = function(levelDisplay){
	
		transparency = 1.2;
		levelName = levelDisplay;
		console.log("reached begin");
	}
	
	this.draw = function(){
		console.log(transparency);
		if(transparency > 0){
			
			var centerX = Math.round(canvas.width/2);
			var centerY = Math.round(canvas.height/2);
			var color = "rgba(255,255,255," + transparency + ")";
			
			drawTextWithShadow(levelName,centerX,centerY,color,"64 px sans");
			
			transparency -= FADING
		}
	
	}

}