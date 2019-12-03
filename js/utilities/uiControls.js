const INVENTORY_ICON_WIDTH=40;
const INVENTORY_ICON_HEIGHT=40;

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

		var inventoryClick = detectInventoryClicks(mousePosX, mousePosY);

		if(inventoryClick=== false){
			gameStateManager.getState().onMouseClick(mousePosX, mousePosY);
		}
	});

	document.addEventListener("keydown", function(evt) {
		gameStateManager.getState().onKeyPress(evt);
	});

	document.addEventListener("keyup", function(evt) {
		gameStateManager.getState().onKeyRelease(evt);
	});
}


function detectInventoryClicks(mousePosX, mousePosY){
		if(mousePosX >= inventoryCoords.healPotionXPos &&
			mousePosX <= inventoryCoords.healPotionXPos+ INVENTORY_ICON_WIDTH &&
		   mousePosY >= inventoryCoords.healPotionYPos &&
			mousePosY <= inventoryCoords.healPotionYPos+ INVENTORY_ICON_HEIGHT &&
			playerOne.healPotionsHeld >0 ){
		   
		   playerOne.useHealPotion();
		   return true;
	   }
	   else if(mousePosX >= inventoryCoords.manaPotionXPos &&
		   mousePosX <= inventoryCoords.manaPotionXPos+ INVENTORY_ICON_WIDTH &&
		  mousePosY >= inventoryCoords.manaPotionYPos &&
		   mousePosY <= inventoryCoords.manaPotionYPos+ INVENTORY_ICON_HEIGHT &&
		   playerOne.manaPotionsHeld >0 ){
		  
		  playerOne.useManaPotion();
		  return true;
	  }
	  else{
		  return false;
	  }

}
