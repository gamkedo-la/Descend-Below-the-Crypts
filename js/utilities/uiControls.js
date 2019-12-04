function initInput() {

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);

		mousePosX = mousePos.x;
		mousePosY = mousePos.y;

		gameStateManager.getState().onMouseMove(mousePosX, mousePosY);
	});

	canvas.addEventListener('click', function(evt) {
		var mousePos = calculateMousePos(evt);

		mousePosX = mousePos.x;
		mousePosY = mousePos.y;

		gameStateManager.getState().onMouseClick(mousePosX, mousePosY);
	});

	document.addEventListener("keydown", function(evt) {
		gameStateManager.getState().onKeyPress(evt);
	});

	document.addEventListener("keyup", function(evt) {
		gameStateManager.getState().onKeyRelease(evt);
	});
}
