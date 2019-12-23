var camPanX = 0;
var camPanY = 0;
var zoom = false; // disabled since complicating calculation of screen->tile inverse, adding back later
var zoomFactor = 1.8;

function updatedCameraPosition(){
	gameCoordToIsoCoord(playerOne.x,playerOne.y);

	if (zoom) {
		camPanX = isoDrawX - canvas.width/3;
		camPanY = isoDrawY - canvas.height/3;
	} else {
		camPanX = isoDrawX - canvas.width/2;
		camPanY = isoDrawY - canvas.height/2;
	}
}

function shiftForCameraPan(){
	canvasContext.save();
	if (zoom)
		canvasContext.scale(zoomFactor, zoomFactor);
	canvasContext.translate(-camPanX, -camPanY);
}

function finishedCameraPan(){
	canvasContext.restore();
}
