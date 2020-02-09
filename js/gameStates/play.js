const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"
const KEY_SHIFT = 16; // "SHIFT"
const KEY_I = 73; // "I"
const KEY_P = 80; // "P"
const KEY_1 = 49; // "1"
const KEY_2 = 50; // "2"
const KEY_3 = 51; // "3"
const KEY_4 = 52; // "4"
const KEY_5 = 53; // "5"
const KEY_6 = 54; // "6"
const KEY_7 = 55; // "7"
const KEY_8 = 56; // "8"
const KEY_9 = 57; // "9"

const KEY_Z = 90; // "Z"
const KEY_X = 88; // "X"
const KEY_C = 67; // "C"
const KEY_V = 86; // "V"
const KEY_B = 66; // "B"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const INVENTORY_ICON_WIDTH=40;
const INVENTORY_ICON_HEIGHT=40;

const HUD_OPACITY= 0.7;

const PUNCH_COOLDOWN_TIME = 1;
const SWORD_COOLDOWN_TIME = 3;
const MACE_COOLDOWN_TIME = 4;
const FIREBALL_SPELL_COOLDOWN_TIME = 5;
const FLAME_SPELL_COOLDOWN_TIME = 5;
const HEAL_SPELL_COOLDOWN_TIME = 3;
const FREEZE_SPELL_COOLDOWN_TIME = 3;

const PUNCH_ATTACK_RANGE = 2;
const SWORD_ATTACK_RANGE = 3;
const MACE_ATTACK_RANGE = 2;
const FIREBALL_ATTACK_RANGE = 6;
const FLAME_ATTACK_RANGE = 4;
const FREEZE_ATTACK_RANGE = 5;

var punchCoolingDown = false;
var swordCoolingDown = false;
var maceCoolingDown = false;
var fireballCoolingDown = false;
var flameCoolingDown = false;
var healSpellCoolingDown = false;
var freezeSpellCoolingDown = false;

var punchCoolDownTimer = 0;
var swordCoolDownTimer = 0;
var maceCoolDownTimer = 0;
var fireballCoolDownTimer = 0;
var flameCoolDownTimer = 0;
var healSpellCoolDownTimer = 0;
var freezeSpellCoolDownTimer = 0;

var inventoryCoords = {
  healPotionXPos : 0,
  healPotionYPos : 0,
  manaPotionXPos : 0,
  manaPotionYPos : 0,
  goldXPos: 0,
  goldYPos: 0,
  keyXPos: 0,
  keyYPos: 0,
  punchXPos : 0,
  punchYPos: 0,
  swordXPos : 0,
  swordYPos : 0,
  maceXPos : 0,
  maceYPos: 0,
  fireballXPos: 0,
  fireballYPos: 0,
  healSpellXPos: 0,
  healSpellYPos: 0,
  flameSpellXPos: 0,
  flameSpellYPos: 0,
  freezeSpellXPos: 0,
  freezeSpellYPos: 0
}

var warningMessage="";

// Tooltip:
var tooltipTxt = '';
var tooltipPosX = 0;
var tooltipPosY = 0;

const NORMAL_KEY_MAP = {
  [KEY_W]: null,
  [KEY_S]: null,
  [KEY_A]: null,
  [KEY_I]: function(gameState) {
    gameState.inventory = !gameState.inventory;
  },
  [KEY_D]: null,
  [KEY_SHIFT]: null,
  [KEY_P]: function(gameState) {
    gameState.pause = !gameState.pause;
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
      playerOne.resetDirections();
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
  },
  [KEY_7]: function(gameState) {
    mapStack[currentMap].fog = false;

    for (var tileIndex = 0; tileIndex < mapStack[currentMap].level.length; tileIndex++) {
      mapStack[currentMap].level[tileIndex].setState(TileState.INVIEW);
      mapStack[currentMap].level[tileIndex].fog = false;
    }
  },
  [KEY_8]: function(){
    playerOne.takeDamage(1);
  }
};

var mouseClickX = 0;
var mouseClickY = 0;

var selectedEnemy = null;

const Maps = {
  //CASTLE: 0,
  TOWN: 0,
  CRYPT_ONE: 1,
  CRYPT_TWO: 2,
  CAVE_ONE: 3,
  CAVE_TWO: 4
};

var currentMap;
var mapStack;

class Play extends GameState {
  constructor() {
    super();

    this.setup = false;

    this.pause = false;
    this.debug = false;
    this.inventory = false;

    // Debug options
    this.displayTileX_Y = false;
    this.isInvulnerable = false;
    this.moveFast = false;
    this.hasUnlimitedKeys = false;
    this.noClipEnabled = false;

    currentMap = Maps.TOWN;
    mapStack = [ new Town(),
				 new Castle(),
				 new CryptIntro(),
                 new Crypt2(),
                 new Cave1(),
				 new Cave2()];

    this.coolDown();
  }

  draw() {
    if (!this.setup) {
      playerOne.setupControls(KEY_W, KEY_D, KEY_S, KEY_A, KEY_SHIFT);
      this.setup = true;
    }

    var npcList = mapStack[currentMap].npcList;
    for( var i = 0; i < npcList.length; ++i )
      npcList[i].canMove = !this.pause;
    playerOne.canMove = !this.pause;

    // Debug options
    playerOne.noClipMode = this.noClipEnabled;

    if (this.hasUnlimitedKeys)
      playerOne.keysHeld = 999;

    if (this.isInvulnerable)
      playerOne.health = playerOne.maxHealth;

    this.checkForSounds();

    super.draw();
    mapStack[currentMap].draw(this.displayTileX_Y);
    mapStack[currentMap].move();

    drawMouseIndicators();
    this.drawHUD();
    this.drawMinimap();
	  newLevelTitle.draw();

    if (this.debug)
      DebugMenu.draw(this.displayTileX_Y, this.isInvulnerable, this.moveFast, this.hasUnlimitedKeys, this.noClipEnabled);

    if(this.pause)
       Pause.draw();

    if( this.inventory && !this.pause )
      Inventory.draw();

    // Tooltip text:
    if(tooltipTxt != ''){
      var bufferSpace = 10;
      var toolTipFont = "16px Arial Black";
      toolTipText(tooltipTxt,toolTipFont, tooltipPosX + bufferSpace, tooltipPosY + bufferSpace );
    }
  }
  onMouseClick(mouseX,  mouseY) {
    mapStack[currentMap].onMouseClick(mouseX, mouseY);
    this.detectHUDClicks(mousePosX, mousePosY);
    this.detectEnemyClicks(mouseClickX, mouseClickY);
  }

  calculateEnemyToPlayerDistance(enemy){
    var playerTileIndex = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);
    var enemyTileIndex = getTileIndexAtPixelCoord(enemy.x, enemy.y);
    var path = playerOne.pather.pathFrom_To_(playerTileIndex, enemyTileIndex, isNotAPassableTile);
    return path.length;
  }

  detectHUDClicks(mousePosX, mousePosY){
		if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.healPotionXPos, inventoryCoords.healPotionYPos) == true &&
			playerOne.healPotionsHeld > 0 ){

		   playerOne.useHealPotion();
	   }
	   else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.manaPotionXPos, inventoryCoords.manaPotionYPos) == true &&
		   playerOne.manaPotionsHeld >0 ){
       playerOne.useManaPotion();
    }
    else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.swordXPos, inventoryCoords.swordYPos) == true &&
      playerOne.sword){

          if(selectedEnemy == null){
            this.displayTargetNotSelectedMessage();
        }
        else if(swordCoolingDown == true){
            this.displayAbilityRechargingMessage();

        }
        else if(this.calculateEnemyToPlayerDistance(selectedEnemy)> SWORD_ATTACK_RANGE){
          this.displayWarningMessage( "Target is not in range!" );
        }
      else{
        swordCoolingDown = true;

        // Reset cooldown timer:
        swordCoolDownTimer = SWORD_COOLDOWN_TIME;

        playerOne.attackWithSword(selectedEnemy);

        this.removeDeadEnemiesFromStack();
      }
   }

   else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.maceXPos, inventoryCoords.maceYPos) == true &&
      playerOne.mace){

        if(selectedEnemy == null){
        this.displayTargetNotSelectedMessage();
    }
    else if(maceCoolingDown == true){
      this.displayAbilityRechargingMessage();
    }
    else if(this.calculateEnemyToPlayerDistance(selectedEnemy)> MACE_ATTACK_RANGE){
      this.displayWarningMessage( "Target is not in range!" );
    }
    else {
        maceCoolingDown = true;

        // Reset cooldown timer:
        maceCoolDownTimer = MACE_COOLDOWN_TIME;

        playerOne.attackMace(selectedEnemy);

        removeDeadEnemiesFromStack();
      }
   }

  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.fireballXPos, inventoryCoords.fireballYPos) == true &&
      playerOne.fireballSpell){

      if(selectedEnemy == null){
        this.displayTargetNotSelectedMessage();
      }
      else if(playerOne.mana<=FIREBALL_MANA_COST){
        this.displayNotEnoughManaMessage();
      }
      else if(fireballCoolingDown == true){
        this.displayAbilityRechargingMessage();
      }
      else if(this.calculateEnemyToPlayerDistance(selectedEnemy)> FIREBALL_ATTACK_RANGE){
        this.displayWarningMessage( "Target is not in range!" );
      }
      else{
        fireballCoolingDown = true;

        // Reset cooldown timer:
        fireballCoolDownTimer = FIREBALL_SPELL_COOLDOWN_TIME;

        playerOne.attackWithFireBallSpell(selectedEnemy);

        this.removeDeadEnemiesFromStack();
      }
   }

  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.flameSpellXPos, inventoryCoords.flameSpellYPos) == true &&
   playerOne.flameSpell){

   if(selectedEnemy == null){
    this.displayTargetNotSelectedMessage();
   }
   else if(playerOne.mana<=FLAME_MANA_COST){
    this.displayNotEnoughManaMessage();
  }
   else if(flameCoolingDown == true){
    this.displayAbilityRechargingMessage();
   }
   else if(this.calculateEnemyToPlayerDistance(selectedEnemy)> FLAME_ATTACK_RANGE){
    this.displayWarningMessage( "Target is not in range!" );
  }
   else{
    flameCoolingDown = true;

     // Reset cooldown timer:
     flameCoolDownTimer = FLAME_SPELL_COOLDOWN_TIME;

     playerOne.attackFlameSpell(selectedEnemy);

     this.removeDeadEnemiesFromStack();
   }
}

   else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.punchXPos, inventoryCoords.punchYPos) == true){
      if(selectedEnemy == null){
        this.displayTargetNotSelectedMessage();
      }
      else if(punchCoolingDown == true){
        this.displayAbilityRechargingMessage();
      }
      else if(this.calculateEnemyToPlayerDistance(selectedEnemy)> PUNCH_ATTACK_RANGE){
        this.displayWarningMessage( "Target is not in range!" );
      }
      else{
        punchCoolingDown = true;

        // Reset cooldown timer:
        punchCoolDownTimer = PUNCH_COOLDOWN_TIME;

        playerOne.attackWithPunch(selectedEnemy);

        this.removeDeadEnemiesFromStack();
      }
 }

 else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.healSpellXPos, inventoryCoords.healSpellYPos) == true){
    if(healSpellCoolingDown == true){
      this.displayAbilityRechargingMessage();
    }
    else if(playerOne.mana<=HEAL_MANA_COST){
      this.displayNotEnoughManaMessage();
    }
    else{
      healSpellCoolingDown = true;

      // Reset cooldown timer:
      healSpellCoolDownTimer = HEAL_SPELL_COOLDOWN_TIME;

      playerOne.cureSpell();
    }
}

else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.freezeSpellXPos, inventoryCoords.freezeSpellYPos) == true &&
playerOne.freezeSpell){

if(selectedEnemy == null){
  this.displayTargetNotSelectedMessage();
}
else if(playerOne.mana<=FREEZE_MANA_COST){
  this.displayNotEnoughManaMessage();
}
else if(freezeSpellCoolingDown == true){
  this.displayAbilityRechargingMessage();
}
else if(this.calculateEnemyToPlayerDistance(selectedEnemy)> FREEZE_ATTACK_RANGE){
  this.displayWarningMessage( "Target is not in range!" );
}
else{
  freezeSpellCoolingDown = true;

  // Reset cooldown timer:
  freezeSpellCoolDownTimer = FREEZE_SPELL_COOLDOWN_TIME;

  playerOne.attackFreezeSpell(selectedEnemy);

  this.removeDeadEnemiesFromStack();
}
}
}

displayNotEnoughManaMessage() {
  this.displayWarningMessage( "Not enough mana!" );
}

displayAbilityRechargingMessage() {
  this.displayWarningMessage( "Ability is still recharging!" );
}

displayTargetNotSelectedMessage() {
  this.displayWarningMessage( "Target is not selected!" );
}

displayWarningMessage( message ) {
  warningMessage = message;
  warningSFX.play();
  setTimeout(function(){
    warningMessage="";
  }, 1500);
}

removeDeadEnemiesFromStack() {
    // Check if enemy died. If it did, remove it from the enemy list:
    mapStack[currentMap].npcList = mapStack[currentMap].npcList.filter(function(npc) {
      return npc.health >0;
    });
}

detectEnemyClicks(mousePosX, mousePosY){
  var npcList = mapStack[currentMap].npcList;
  var mouseClickWorldX = screenCoordToGameCoord(mousePosX, mousePosY).unIsoX;
  var mouseClickWorldY = screenCoordToGameCoord(mousePosX, mousePosY).unIsoY;

  var buffer = 30;

  for(let i=0; i< npcList.length; i++){
    if(npcList[i].x > mouseClickWorldX - buffer && npcList[i].x < mouseClickWorldX +npcList[i].width + buffer &&
      npcList[i].y > mouseClickWorldY - buffer && npcList[i].y < mouseClickWorldY +npcList[i].height + buffer){

      // Deselect current enemy:
      for(let j=0; j< npcList.length; j++){
        npcList[j].selected = false;
        selectedEnemy = null;
      }

      // Select new enemy:
      npcList[i].selected = true;
      selectedEnemy = npcList[i];
    }
  }
}

detectHUDHover(mousePosX, mousePosY){
  if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.punchXPos, inventoryCoords.punchYPos) == true){
    tooltipTxt = "Punch is bla bla..";
    tooltipPosX = mousePosX;
    tooltipPosY = mousePosY;
  }
  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.swordXPos, inventoryCoords.swordYPos) == true
  && playerOne.sword){
    tooltipTxt = "Sword is bla bla..";
    tooltipPosX = mousePosX;
    tooltipPosY = mousePosY;
  }
  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.keyXPos, inventoryCoords.keyYPos) == true
  && playerOne.keysHeld > 0){
    tooltipTxt = "Key is bla bla..";
    tooltipPosX = mousePosX;
    tooltipPosY = mousePosY;
  }
  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.goldXPos, inventoryCoords.goldYPos) == true
  && playerOne.goldCoins > 0){
    tooltipTxt = "Gold is bla bla..";
    tooltipPosX = mousePosX;
    tooltipPosY = mousePosY;
  }
  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.healPotionXPos, inventoryCoords.healPotionYPos) == true
  && playerOne.healPotionsHeld > 0){
    tooltipTxt = "Heal Potion recovers 25% of your health";
    tooltipPosX = mousePosX;
    tooltipPosY = mousePosY;
  }
  else if(this.checkMouseHover(mousePosX, mousePosY,inventoryCoords.manaPotionXPos, inventoryCoords.manaPotionYPos) == true
  && playerOne.manaPotionsHeld >0){
    tooltipTxt = "Mana Potion is bla bla..";
    tooltipPosX = mousePosX;
    tooltipPosY = mousePosY;
  }
  else{
    tooltipTxt = '';
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
    mapStack[currentMap].onMouseMove(mouseX, mouseY);
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
		if(evt.keyCode == KEY_9){
			gameUsedKey = true;
			var currentTile = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);
			var destinationTile = gameStateManager.getState().mapStack[gameStateManager.getState().level].highlightedTileIndex;
			//pathDebugIndexList = [currentTile, destinationTile];
			pathDebugIndexList = playerOne.pather.pathFrom_To_(currentTile,destinationTile, isPassableTile);
		}
    }

    // Ability keyboard keys:
    if(evt.keyCode == KEY_Z){
      gameUsedKey = true;
      // simulate clicks:
      this.detectHUDClicks(300,540);
    }
    if(evt.keyCode == KEY_X){
      gameUsedKey = true;
      // simulate clicks:
      this.detectHUDClicks(350,540);
    }
    if(evt.keyCode == KEY_C){
      gameUsedKey = true;
      // simulate clicks:
      this.detectHUDClicks(380,540);
    }
    if(evt.keyCode == KEY_V){
      gameUsedKey = true;
      // simulate clicks:
      this.detectHUDClicks(420,540);
    }
    if(evt.keyCode == KEY_B){
      gameUsedKey = true;
      // simulate clicks:
      this.detectHUDClicks(470,540);
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
	  case (playerOne.controlKeyForRun):
        playerOne.keyHeld_Run = setTo;
        break;
    }
  }

  loadLevel(level) {
    currentMap = level;
		if (currentMap > mapStack.length){
		  currentMap = 0;
		}
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

  drawHUD() {

    // Warning messages:
    var font = "bold 20px Arial";
    colorText(warningMessage,canvas.width/2 - 100, canvas.height/2 , 'red', font);

    // Set alpha:
    canvasContext.globalAlpha = HUD_OPACITY;

    // HP and MP:
	this.fillHealthOrMana(22, 510, 46, 73, "red", playerOne.health / playerOne.maxHealth);
	this.fillHealthOrMana(canvas.width-68, 510, 46, 73, "blue", playerOne.mana / playerOne.maxMana);
  	canvasContext.drawImage(healthHUD,10, canvas.height-100);
    canvasContext.drawImage(manaHUD,canvas.width-80, canvas.height-100);

    if(playerOne.hasShield==true){
      canvasContext.drawImage(shieldHUD,18, canvas.height-80)
      colorText(playerOne.calculateRemainingShieldDurablity()+"%",18, canvas.height-40 , 'white', font);
    }

    this.drawItemHUD();
    this.drawAbilityHUD();
  }

  fillHealthOrMana(leftX, topY, width, height, fillColor, fillPerc){
		canvasContext.fillStyle = fillColor;
		var heightLeft = Math.floor((1.0-fillPerc)*height);
		canvasContext.fillRect(leftX, topY+heightLeft, width, height-heightLeft);
	//	colorRect(20, 512, 50,(playerOne.health / playerOne.maxHealth) * 72, "red");
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
      inventoryCoords.goldXPos = iconXPos+2;
      inventoryCoords.goldYPos = currentYPos+5;

      canvasContext.drawImage(goldHUD,inventoryCoords.goldXPos, inventoryCoords.goldYPos);
      canvasContext.globalAlpha = 1.0;
      colorText("x"+playerOne.goldCoins, inventoryCoords.goldXPos+16 , inventoryCoords.goldYPos+35, 'red', font);
      canvasContext.globalAlpha = HUD_OPACITY;
      currentYPos +=iconVerticalSpacing;
  	}

  	if(playerOne.keysHeld >0){
      inventoryCoords.keyXPos = iconXPos+2;
      inventoryCoords.keyYPos = currentYPos+5;

      canvasContext.drawImage(keyHUD,inventoryCoords.keyXPos, inventoryCoords.keyYPos);
      canvasContext.globalAlpha = 1.0;
      colorText("x"+playerOne.keysHeld,inventoryCoords.keyXPos+16 , inventoryCoords.keyYPos+35, 'red', font);
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
    var coolDownTimerfont = "bold 25px Arial";

    var iconHorizontalSpacing = 45;
    const iconXPos = 280;
  	const iconYPos = canvas.height-80;
    var currentXPos = iconXPos;

    inventoryCoords.punchXPos = currentXPos+3;
    inventoryCoords.punchYPos = iconYPos+2;

    canvasContext.drawImage(punchHUD,inventoryCoords.punchXPos, inventoryCoords.punchYPos);
    currentXPos +=iconHorizontalSpacing;

    if(punchCoolingDown==true){
      canvasContext.drawImage(coolDownHUD,inventoryCoords.punchXPos, inventoryCoords.punchYPos);
      colorText(punchCoolDownTimer,
        inventoryCoords.punchXPos+ 15,
        inventoryCoords.punchYPos+ 30, 'red', coolDownTimerfont);
    }

    if(playerOne.sword) {
      inventoryCoords.swordXPos = currentXPos+3;
      inventoryCoords.swordYPos = iconYPos+2;

      canvasContext.drawImage(swordHUD,inventoryCoords.swordXPos, inventoryCoords.swordYPos);
      currentXPos +=iconHorizontalSpacing;

	if(swordCoolingDown==true){
		canvasContext.drawImage(coolDownHUD,inventoryCoords.swordXPos, inventoryCoords.swordYPos);
		colorText(swordCoolDownTimer,
		  inventoryCoords.swordXPos+ 15,
		  inventoryCoords.swordYPos+ 30, 'red', coolDownTimerfont);
      }
    }
	if(playerOne.mace) {
      inventoryCoords.maceXPos = currentXPos+3;
      inventoryCoords.maceYPos = iconYPos+2;

      canvasContext.drawImage(maceHUD,inventoryCoords.maceXPos, inventoryCoords.maceYPos);
      currentXPos +=iconHorizontalSpacing;

		if(maceCoolingDown==true){
			canvasContext.drawImage(coolDownHUD,inventoryCoords.maceXPos, inventoryCoords.maceYPos);
			colorText(maceCoolDownTimer,
			inventoryCoords.maceXPos+ 15,
			inventoryCoords.maceYPos+ 30, 'red', coolDownTimerfont);
		}
    }
	if(playerOne.fireballSpell) {
      inventoryCoords.fireballXPos = currentXPos+3;
      inventoryCoords.fireballYPos = iconYPos+2;

      canvasContext.drawImage(fireballSpellHUD,inventoryCoords.fireballXPos, inventoryCoords.fireballYPos);
      currentXPos +=iconHorizontalSpacing;

		if(fireballCoolingDown==true){
			canvasContext.drawImage(coolDownHUD,inventoryCoords.fireballXPos, inventoryCoords.fireballYPos);
			colorText(fireballCoolDownTimer,
			inventoryCoords.fireballXPos+ 15,
			inventoryCoords.fireballYPos+ 30, 'red', coolDownTimerfont);
		}
    }

    if(playerOne.healSpell== true) {
      inventoryCoords.healSpellXPos = currentXPos+3;
      inventoryCoords.healSpellYPos = iconYPos+2;

      canvasContext.drawImage(healSpellHUD,inventoryCoords.healSpellXPos, inventoryCoords.healSpellYPos);
      currentXPos +=iconHorizontalSpacing;

		if(healSpellCoolingDown==true){
			canvasContext.drawImage(coolDownHUD,inventoryCoords.healSpellXPos, inventoryCoords.healSpellYPos);
			colorText(healSpellCoolDownTimer,
			inventoryCoords.healSpellXPos+ 15,
			inventoryCoords.healSpellYPos+ 30, 'red', coolDownTimerfont);
		}
    }

    if(playerOne.flameSpell== true) {
      inventoryCoords.flameSpellXPos = currentXPos+3;
      inventoryCoords.flameSpellYPos = iconYPos+2;

      canvasContext.drawImage(flameSpellHUD,inventoryCoords.flameSpellXPos, inventoryCoords.flameSpellYPos);
      currentXPos +=iconHorizontalSpacing;

		if(flameCoolingDown==true){
			canvasContext.drawImage(coolDownHUD,inventoryCoords.flameSpellXPos, inventoryCoords.flameSpellYPos);
			colorText(flameCoolDownTimer,
			inventoryCoords.flameSpellXPos+ 15,
			inventoryCoords.flameSpellYPos+ 30, 'red', coolDownTimerfont);
		}
    }

    if(playerOne.freezeSpell== true) {
      inventoryCoords.freezeSpellXPos = currentXPos+3;
      inventoryCoords.freezeSpellYPos = iconYPos+2;

      canvasContext.drawImage(freezeSpellHUD,inventoryCoords.freezeSpellXPos, inventoryCoords.freezeSpellYPos);
      currentXPos +=iconHorizontalSpacing;

		if(freezeSpellCoolingDown==true){
			canvasContext.drawImage(coolDownHUD,inventoryCoords.freezeSpellXPos, inventoryCoords.freezeSpellYPos);
			colorText(freezeSpellCoolDownTimer,
			inventoryCoords.freezeSpellXPos+ 15,
			inventoryCoords.freezeSpellYPos+ 30, 'red', coolDownTimerfont);
		}
    }

    // Inventory BG:
    canvasContext.drawImage(abilityHUD,280, canvas.height-80);

  }

  coolDown(){
    setInterval(function() {
      if(punchCoolDownTimer >0){
        punchCoolDownTimer--;
      }
      else{
        punchCoolingDown = false;
      }
      if(swordCoolDownTimer >0){
        swordCoolDownTimer--;
      }
      else{
        swordCoolingDown = false;
      }
      if(fireballCoolDownTimer >0){
        fireballCoolDownTimer--;
      }
      else{
        fireballCoolingDown = false;
      }
      if(healSpellCoolDownTimer >0){
        healSpellCoolDownTimer--;
      }
      else{
        healSpellCoolingDown = false;
      }
      if(maceCoolDownTimer >0){
        maceCoolDownTimer--;
      }
      else{
        maceCoolingDown = false;
      }
      if(flameCoolDownTimer >0){
        flameCoolDownTimer--;
      }
      else{
        flameCoolingDown = false;
      }
      if(freezeSpellCoolDownTimer >0){
        freezeSpellCoolDownTimer--;
      }
      else{
        freezeSpellCoolingDown = false;
      }
    }, 1000);
  }

  drawMinimap() {
    var map = mapStack[currentMap];
    var npcList = mapStack[currentMap].npcList;

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
  				for(var i = 0; i < npcList.length; i++){
  					var enemyTile = getTileIndexAtPixelCoord(npcList[i].x, npcList[i].y);

  					// Calculate distance between enemy and player:
  					// I'm experiementing this feature, might remove it later
  					var x = playerOne.x - npcList[i].x;
  					var y = playerOne.y - npcList[i].y;
  					var distance = Math.sqrt( x*x + y*y );

  					if( tileIndex == enemyTile && distance <= renderDistance){
  						colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "purple");
  					}
  				}

  			// Walls:
  			if(map.getTileType(tileIndex) == TILE_WALL ||
  			map.getTileType(tileIndex) == TILE_WALL_WITH_TORCH ||
  			map.getTileType(tileIndex) == TILE_CRYPT_WALL ||
  			map.getTileType(tileIndex) == TILE_WALL_ART ||
  			map.getTileType(tileIndex) == TILE_WALL_SHIELD ||
  			map.getTileType(tileIndex) == TILE_CRYPT ||
  			map.getTileType(tileIndex) == TILE_CRYPT_TORCH ||
			map.getTileType(tileIndex) == TILE_CRYPT_BODY ||
			map.getTileType(tileIndex) == TILE_CAVE_WALL ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL_NORTH ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL_SOUTH ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL_WEST ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL_EAST ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL_NW ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL_NE ||
			map.getTileType(tileIndex) == TILE_TOWN_WALL) {
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "rgba(100, 100, 100, 0.5)");
  			}

  			// Yellow doors:
  			else if(map.getTileType(tileIndex) == TILE_YELLOW_DOOR){
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "yellow");
  			}

  			// Red doors:
  			else if(map.getTileType(tileIndex) == TILE_RED_DOOR){
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "red");
  			}

  			// Blue doors:
  			else if(map.getTileType(tileIndex) == TILE_BLUE_DOOR || map.getTileType(tileIndex) == TILE_BLUE_DOOR_SIDE){
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "blue");
        }

        // Stairs
        else if(map.getTileType(tileIndex) == TILE_STAIRS ||
        map.getTileType(tileIndex) == TILE_STAIRS_DOWN ||
        map.getTileType(tileIndex) == TILE_STAIRS_DOWN_LEVEL_2 ){
          colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "pink");
        }

  			// Background:
  			else {
  				colorRect(elementXPos,elementYPos,rowSpacing,colSpacing, "rgba(255, 255, 255, 0.5)");
  			}
  		}
  	}
  }
}
