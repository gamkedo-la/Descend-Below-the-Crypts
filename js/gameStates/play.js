const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_P = 80; // "P"
const KEY_1 = 49; // "1"
const KEY_2 = 50; // "2"
const KEY_3 = 51; // "3"
const KEY_4 = 52; // "4"
const KEY_5 = 53; // "5"
const KEY_6 = 54; // "6"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const INVENTORY_ICON_WIDTH=40;
const INVENTORY_ICON_HEIGHT=40;

const HUD_OPACITY= 0.7;

var inventoryCoords = {
  healPotionXPos : 0,
  healPotionYPos : 0,
  manaPotionXPos : 0,
  manaPotionYPos : 0,
  punchXPos : 0,
  punchYPos: 0,
  swordXPos : 0,
  swordYPos : 0,
}

const NORMAL_KEY_MAP = {
  [KEY_W]: null,
  [KEY_S]: null,
  [KEY_A]: null,
  [KEY_D]: null,
  [KEY_P]: function(gameState) {
    gameState.pause = !gameState.pause;
    gameState.handlePauseMovement();
  },
  [KEY_1]: function(gameState) {
    gameState.debug = !gameState.debug;

    // Reset
    if (!gameState.debug) {
      gameState.displayTileX_Y = false;
      gameState.isInvulnerable = false;
      gameState.moveFast = false;
      gameState.hasUnlimitedKeys = false;
      gameState.noClipEnabled = false;

      playerOne.movementSpeed = playerOne.originalMovementSpeed;
    }
  }
};

const DEBUG_KEY_MAP = {
  [KEY_2]: function(gameState) {
    gameState.displayTileX_Y = !gameState.displayTileX_Y;
  },
  [KEY_3]: function(gameState) {
    gameState.isInvulnerable = !gameState.isInvulnerable;
  },
  [KEY_4]: function(gameState) {
    gameState.moveFast = !gameState.moveFast;

    playerOne.movementSpeed = gameState.moveFast ? playerOne.movementSpeed + 5 : playerOne.originalMovementSpeed;
  },
  [KEY_5]: function(gameState) {
    gameState.hasUnlimitedKeys = !gameState.hasUnlimitedKeys;
  },
  [KEY_6]: function(gameState) {
    gameState.noClipEnabled = !gameState.noClipEnabled;
  }
};

var mouseClickX = 0;
var mouseClickY = 0;

class Play extends GameState {
  constructor() {
    super();

    this.setup = false;
    this.level = 0;
    this.levelList = [ levelOne, levelTwo ];
    this.mapStack = [ new Map(levelOne),
                      new Map(levelTwo) ];

    this.pause = false;
    this.debug = false;

    // Debug options
    this.displayTileX_Y = false;
    this.isInvulnerable = false;
    this.moveFast = false;
    this.hasUnlimitedKeys = false;
    this.noClipEnabled = false;
  }

  draw() {
    if (!this.setup) {
      playerOne.setupControls(KEY_W, KEY_D, KEY_S, KEY_A);
      this.setup = true;
    }

    // Debug options
    playerOne.noClipMode = this.noClipEnabled;

    if (this.hasUnlimitedKeys)
      playerOne.keysHeld = 999;

    if (this.isInvulnerable)
      playerOne.health = playerOne.maxHealth;

    this.checkForSounds();

    super.draw();
    this.mapStack[this.level].draw(this.displayTileX_Y);
    this.mapStack[this.level].move();

    drawMouseIndicators();
    this.drawHUD();
    this.drawMinimap();

    if (this.debug)
      this.drawDebugMenu();

    // Default HUD
    /*
    canvasContext.drawImage(feedbackGUIPic,200, canvas.height-50);
		colorText("Keys: " + playerOne.keysHeld, 220, 582, "black", "14px Arial Black");
		colorText("Gold: " + playerOne.goldCoins, 300, 582, "black", "14px Arial Black");
		if(playerOne.sword) {
			colorText("Can use Sword", 360, 572, "black", "8px Arial Black");
		} else {
			colorText("CAN'T use Sword", 360, 572, "red", "8px Arial Black");
		}

		if(playerOne.mace) {
			colorText("Can use Mace", 360, 582, "black", "8px Arial Black");
		} else {
			colorText("CAN'T use Mace", 360, 582, "red", "8px Arial Black");
		}

		if(playerOne.flameSpell) {
			colorText("Can use Flame Spell", 360, 592, "black", "8px Arial Black");
		} else {
			colorText("CAN'T use Flame Spell", 360, 592, "red", "8px Arial Black");
    }*/
    
    if( this.pause )  {
       this.drawPause()
    }
  }
  onMouseClick(mouseX,  mouseY) {
    this.mapStack[this.level].onMouseClick(mouseX, mouseY);
    this.detectHUDClicks(mousePosX, mousePosY);
  }

  detectHUDClicks(mousePosX, mousePosY){
		if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.healPotionXPos, inventoryCoords.healPotionYPos) == true &&
			playerOne.healPotionsHeld >0 ){
		   
		   playerOne.useHealPotion();
	   }
	   else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.manaPotionXPos, inventoryCoords.manaPotionYPos) == true &&
		   playerOne.manaPotionsHeld >0 ){
		  
		  playerOne.useManaPotion();
    }
    else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.swordXPos, inventoryCoords.swordYPos) == true &&
      playerOne.sword){
     
     console.log('use sword');
   }
   else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.punchXPos, inventoryCoords.punchYPos) == true){
   
   console.log('punch');
 }

}

detectHUDHover(mousePosX, mousePosY){
  if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.punchXPos, inventoryCoords.punchYPos) == true){
    console.log('punch hover');
  }
}

checkMouseHover(mousePosX, mousePosY, iconXPos, iconYPos){
  if(mousePosX >= iconXPos &&
    mousePosX <= iconXPos + INVENTORY_ICON_WIDTH &&
   mousePosY >= iconYPos &&
    mousePosY <= iconYPos + INVENTORY_ICON_HEIGHT){
      return true;
    }
  else{
    return false;
  }
}

  onMouseMove(mouseX, mouseY) {
    this.mapStack[this.level].onMouseMove(mouseX, mouseY);
    this.detectHUDHover(mouseX, mouseY);
  }

  onKeyPress(evt) {
    this.setKeyHoldState(evt.keyCode, true);

    var gameUsedKey = false;
  	for (var key in NORMAL_KEY_MAP) {
  		if (key == evt.keyCode) {
  			gameUsedKey = true;
  			if (typeof NORMAL_KEY_MAP[key] === 'function') {
  				NORMAL_KEY_MAP[key](this);
  			}
  		}
  	}

  	if (this.debug) {
  		for (var key in DEBUG_KEY_MAP) {
  			if (key == evt.keyCode) {
  				gameUsedKey = true;
  				if (typeof DEBUG_KEY_MAP[key] === 'function') {
  					DEBUG_KEY_MAP[key](this);
  				}
  			}
  		}
  	}

  	if(gameUsedKey)
  		evt.preventDefault();
  	else
  		console.log("unused key pressed / unrecognized, " + evt.keyCode + "(does debugState need to be on? press Key 1)");
  }

  onKeyRelease(evt) {
    this.setKeyHoldState(evt.keyCode, false);
  }

  setKeyHoldState(thisKey, setTo) {
    switch (thisKey) {
      case (playerOne.controlKeyForNorth):
        playerOne.keyHeld_North = setTo;
        break;
      case (playerOne.controlKeyForEast):
        playerOne.keyHeld_East = setTo;
        break;
      case (playerOne.controlKeyForSouth):
        playerOne.keyHeld_South = setTo;
        break;
      case (playerOne.controlKeyForWest):
        playerOne.keyHeld_West = setTo;
        break;
    }
  }

  loadLevel(level) {
    this.level = level;
    if (this.level > this.mapStack.length)
      this.level = 0;
  }

  checkForSounds() {
  	if(playerOne.playWarriorsThoughtsForSecondLevel) {
  		soundDelay++;
  		//console.log(soundDelay);
  		if(soundDelay == 290){
  			warriorEnteringSecondLevel.play();
  			soundDelay = 0;
  			playerOne.playWarriorsThoughtsForSecondLevel = false;
  		}
  	}
  }

  /**
   *  Handles Pause Movement for enemies and player
   */
  handlePauseMovement() {
    var enemyList = this.mapStack[this.level].enemyList;
    for( var i = 0; i < enemyList.length; ++i ) {
      enemyList[i].canMove = !enemyList[i].canMove;
    }
    playerOne.canMove = !playerOne.canMove;
  }

  drawDebugMenu() {
    var debugLineY = 50;
    var debugLineSkipY = 20;
    var debugFont = "16px Arial Black";
    var debugColor = "white";
    var startX = 500;

    var rectColour = "rgba(255, 255, 255, 0.3)";
    var debugLineCount = 7;
    var statsLineCount = 2;

    var playerTile = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);

    // Debug Menu
    colorRect(startX, debugLineY - 20, 250, debugLineSkipY*debugLineCount+1 + 10, rectColour)

    colorText("DEBUG MENU", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("1. Show/Hide debug menu", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("2. Tile Coords: " + (this.displayTileX_Y ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("3. Godmode: "+ (this.isInvulnerable ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("4. Fast move: "+ (this.moveFast ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("5. Unlimited Keys: "+ (this.hasUnlimitedKeys ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("6. No Clip: "+ (this.noClipEnabled ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY*2;

    // Stats Menu
    colorRect(startX, debugLineY - 20, 250, debugLineSkipY*statsLineCount+1 + 10, rectColour)

    colorText("STATS", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("Player tile: " + playerTile, startX + 10, debugLineY, debugColor, debugFont);
  }

  /**
   *  Draws the pause screen and menu
   */
  drawPause() {
    const blackTransparent = 'rgba(0,0,0,0.5)';
    colorRect( 0, 0, canvas.width, canvas.height, blackTransparent );
    canvasContext.drawImage(menuScreenPic, ( canvas.width / 2 ) - 150, 0 );
    colorText( "PAUSED", ( canvas.width / 2 ) - 100, canvas.height / 2 , 'black', "52px Arial  Black" );
  }

  drawHUD() {
      
    // Set alpha:
    canvasContext.globalAlpha = HUD_OPACITY;

    // HP and MP:
  	canvasContext.drawImage(healthHUD,10, canvas.height-100);
  	canvasContext.drawImage(manaHUD,canvas.width-110, canvas.height-100);
    
    this.drawItemHUD();
    this.drawAbilityHUD();
  }

  drawItemHUD() {

  	// Inventory:
  	var font = "bold 17px Arial";

  	const iconXPos = 5;
  	const iconYPos = 160;
  	var iconVerticalSpacing = 45;
  	var currentYPos = iconYPos;

  	// Inventory BG:
  	canvasContext.drawImage(inventoryHUD,iconXPos, currentYPos);

  	if(playerOne.goldCoins >0){
  	canvasContext.drawImage(goldHUD,iconXPos+2, currentYPos+5);
  	canvasContext.globalAlpha = 1.0;
  	colorText("x"+playerOne.goldCoins, iconXPos+2+16 , currentYPos+35, 'red', font);
  	canvasContext.globalAlpha = HUD_OPACITY;
  	currentYPos +=iconVerticalSpacing;
  	}

  	if(playerOne.keysHeld >0){
  	canvasContext.drawImage(keyHUD,iconXPos+2, currentYPos+5);
  	canvasContext.globalAlpha = 1.0;
  	colorText("x"+playerOne.keysHeld,iconXPos+2+16 , currentYPos+35, 'red', font);
  	canvasContext.globalAlpha = HUD_OPACITY;
  	currentYPos +=iconVerticalSpacing;
    }
    
    if(playerOne.healPotionsHeld >0){
      inventoryCoords.healPotionXPos = iconXPos+2;
      inventoryCoords.healPotionYPos = currentYPos+5;

      canvasContext.drawImage(healPotionHUD,inventoryCoords.healPotionXPos, inventoryCoords.healPotionYPos);
      canvasContext.globalAlpha = 1.0;
      colorText("x"+playerOne.healPotionsHeld,inventoryCoords.healPotionXPos+16 , inventoryCoords.healPotionYPos+35, 'red', font);
      canvasContext.globalAlpha = HUD_OPACITY;
      currentYPos +=iconVerticalSpacing;
    }

    if(playerOne.manaPotionsHeld >0){
    inventoryCoords.manaPotionXPos = iconXPos+2;
    inventoryCoords.manaPotionYPos = currentYPos+5;

	  canvasContext.drawImage(manaPotionHUD,inventoryCoords.manaPotionXPos, inventoryCoords.manaPotionYPos);
	  canvasContext.globalAlpha = 1.0;
	  colorText("x"+playerOne.manaPotionsHeld,inventoryCoords.manaPotionXPos+16 , inventoryCoords.manaPotionYPos+35, 'red', font);
	  canvasContext.globalAlpha = HUD_OPACITY;
	  currentYPos +=iconVerticalSpacing;
	  }
  }

  drawAbilityHUD() {

    // Abilities:
    
    var iconHorizontalSpacing = 45;
    const iconXPos = 280;
  	const iconYPos = canvas.height-80;
    var currentXPos = iconXPos;
    
    // Inventory BG:
    canvasContext.drawImage(abilityHUD,280, canvas.height-80);
    
    inventoryCoords.punchXPos = currentXPos+3;
    inventoryCoords.punchYPos = iconYPos+2;

    canvasContext.drawImage(punchHUD,inventoryCoords.punchXPos, inventoryCoords.punchYPos);
    currentXPos +=iconHorizontalSpacing;
    
    if(playerOne.sword) {
      inventoryCoords.swordXPos = currentXPos+3;
      inventoryCoords.swordYPos = iconYPos+2;
  
      canvasContext.drawImage(swordHUD,inventoryCoords.swordXPos, inventoryCoords.swordYPos);
      currentXPos +=iconHorizontalSpacing;
    }
  }

  drawMinimap() {
    var roomGrid = this.mapStack[this.level].roomGrid;
    var enemyList = this.mapStack[this.level].enemyList;

    var miniMapPosX = 10;
  	var miniMapPosY = 30;

  	const rowSpacing= 4;
  	const colSpacing = 4;

  	// Get player tile index:
  	var playerTile = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);


  	for(var rowIndex=0; rowIndex< ROOM_ROWS; rowIndex++){

  		for(var colIndex= 0; colIndex< ROOM_COLS; colIndex++){

  			var tileIndex = colIndex + ROOM_COLS*rowIndex;

  			var renderDistance = 400;

  			var elementXPos = miniMapPosX+ colSpacing*colIndex;
  			var elementYPos = miniMapPosY+ rowSpacing*rowIndex;

  			// Player
  			if( tileIndex == playerTile) {
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "green");
  			}

  			// Enemies
  				for(var i = 0; i < enemyList.length; i++){
  					var enemyTile = getTileIndexAtPixelCoord(enemyList[i].x, enemyList[i].y);

  					// Calculate distance between enemy and player:
  					// I'm experiementing this feature, might remove it later
  					var x = playerOne.x - enemyList[i].x;
  					var y = playerOne.y - enemyList[i].y;
  					var distance = Math.sqrt( x*x + y*y );

  					if( tileIndex == enemyTile && distance <= renderDistance){
  						colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "purple");
  					}
  				}

  			// Walls:
  			if(roomGrid[tileIndex] == TILE_WALL ||
  			roomGrid[tileIndex] == TILE_WALL_WITH_TORCH ||
  			roomGrid[tileIndex] == TILE_CRYPT_WALL ||
  			roomGrid[tileIndex] == TILE_WALL_ART ||
  			roomGrid[tileIndex] == TILE_WALL_SHIELD ||
  			roomGrid[tileIndex] == TILE_CRYPT ||
  			roomGrid[tileIndex] == TILE_CRYPT_TORCH ||
  			roomGrid[tileIndex] == TILE_CRYPT_BODY) {
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "rgba(100, 100, 100, 0.5)");
  			}

  			// Yellow doors:
  			else if(roomGrid[tileIndex]== TILE_YELLOW_DOOR){
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "yellow");
  			}

  			// Red doors:
  			else if(roomGrid[tileIndex]== TILE_RED_DOOR){
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "red");
  			}

  			// Blue doors:
  			else if(roomGrid[tileIndex]== TILE_BLUE_DOOR){
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "blue");
  			}

  			// Background:
  			else {
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "rgba(255, 255, 255, 0.5)");
  			}
  		}
  	}
  }
}
