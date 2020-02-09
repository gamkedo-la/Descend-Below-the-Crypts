class Map {
  constructor(level, landingMap = false, fogOfWar = true) {
    this.npcList = [];
    this.level = level;
    this.fog = fogOfWar; // Assume if true = hostile map
    this.highlightedTileIndex = null;
    this.stairsUpLocation = null;
    this.stairsDownLocation = null;
    this.initialPlayerLocation = null;
    this.landingMap = landingMap;
    this.loadNpcs();

    // Repopulate array with Tile objects
    for (var i = 0; i < this.level.length; i++)
      this.level[i] = new Tile(this.level[i], i, this.getBaseTile, this.fog);
  }

  // Add Npcs here
  loadNpcs() {
    for (var i = 0; i < this.level.length; i++) {
      switch (this.level[i]) {
        // Hostile NPCs
        case TILE_GOBLIN:
            this.addChar(i, new Goblin());
            break;
		case TILE_SKELETON:
            this.addChar(i, new Skeleton());
            break;
        case TILE_ORC:
            this.addChar(i, new Orc());
            break;
        case TILE_OGRE:
            this.addChar(i, new Ogre());
            break;
        case TILE_RAT:
            this.addChar(i, new Rat());
            break;
        case TILE_SPIDER:
            this.addChar(i, new Spider());
            break;
        case TILE_KINGS_TOMB:
            this.addChar(i, new SkeletonKingsTomb());
            break;
        case TILE_SKELETON_KING:
            this.addChar(i, new SkeletonKing());
            break;
        case TILE_ORC_BOSS:
            this.addChar(i, new OrcBoss());
            break;
		case TILE_WIZARD_BOSS:
            this.addChar(i, new WizardBoss());
            break;
		case TILE_TENTACLE:
			this.addChar(i, new TentacleBoss());
			break;

        // Friendly NPCs
		case TILE_BARTENDER:
			this.addChar(i, new Bartender());
			break;
		case TILE_FORTUNE_TELLER:
			this.addChar(i, new FortuneTeller());
			break;
        // Player
        case TILE_PLAYER:
            this.initialPlayerLocation = i;
            this.addChar(i);
            break;

        case TILE_STAIRS:
            this.stairsUpLocation = i+40;
            break;
        case TILE_STAIRS_DOWN:
            this.stairsDownLocation = i-40;
            break;
      }
    }
  }

  // Helper function to add NPC or set Player location
  addChar(index, npc = null) {
    this.level[index] = this.getBaseTile(this.level[index]);

    if (npc != null) {
      npc.setLocation(index);
      this.npcList.push(npc);
    }
  }

  playerAscending() {
    if (this.stairsDownLocation != null)
      playerOne.setLocation(this.stairsDownLocation);
    else {
      playerOne.setLocation(this.initialPlayerLocation);
      console.log("Stairs down not found!");
    }
  }

  playerDescending() {
    if (this.stairsUpLocation != null)
      playerOne.setLocation(this.stairsUpLocation);
    else {
      playerOne.setLocation(this.initialPlayerLocation);
      console.log("Stairs up not found!");
    }
  }

  dropItem(index, item) {
    this.level[index].changeTile(item);
  }

  replaceTile(index, item) {
    this.level[index].changeTile(item);
  }

  getTileType(index) {
    return this.level[index].getTileType();
  }

  draw(displayTileX_Y) {
    if (this.landingMap) {
      playerOne.setLocation(this.initialPlayerLocation);
      this.prepareLevel();
      this.landingMap = false;
    }
    sharedAnimCycle++;

    shiftForCameraPan();
    // Layered draw to ensure floor is always below all objects including Player
    this.drawFloor(displayTileX_Y);
    this.drawEverythingElse();
    finishedCameraPan();
  }

  drawFloor(displayTileX_Y) {
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;
    var isoTileLeftEdgeX = 0;
    var isoTileTopEdgeY = 0;

    for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
      tileLeftEdgeX = 0;
      for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
        var tileTypeHere = this.level[tileIndex].getTileType();
        tileLeftEdgeX += ROOM_W;
        isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY) / 2;
        isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY) / 4;
        tileCoordToIsoCoord(eachCol, eachRow);

        this.level[tileIndex].onRedraw();

        // Reset tile state
        if (this.fog) {
          if (tileIsInPlayerVision(tileIndex))
            this.level[tileIndex].setState(TileState.INVIEW);
          else if (this.level[tileIndex].getState() == TileState.INVIEW)
              this.level[tileIndex].setState(TileState.NOTINVIEW);
        }

        // draw only if explored
        if (this.level[tileIndex].getState() != TileState.UNEXPLORED) {
          var floor = null;

          if (tileTypeHasRoadTransparency(tileTypeHere))
            floor = trackPics[TILE_ROAD];
          else if (tileTypeHasCryptFloorTransparency(tileTypeHere))
            floor = trackPics[TILE_CRYPT_FLOOR];
          else if (tileTypeHasRedRugTransparency(tileTypeHere))
            floor = trackPics[TILE_RED_RUG_CEN];
          else if (tileTypeHasBlueRugTransparency(tileTypeHere))
            floor = trackPics[TILE_BLUE_RUG_CEN];
          else if (tileTypeHasGrassTransparency(tileTypeHere))
            floor = trackPics[TILE_GRASS];
          else if (isAFloor(tileTypeHere) || tileTypeHere == TILE_STAIRS_DOWN) {
            if (this.highlightedTileIndex == tileIndex)
              canvasContext.globalAlpha = 0.8;

            floor = trackPics[tileTypeHere];
            // Do not draw this tile later in drawEverythingElse()
            this.level[tileIndex].offRedraw();
          }
          else if (isAFloor(this.getBaseTile(tileTypeHere)))
            floor = trackPics[this.getBaseTile(tileTypeHere)];

          // If a floor exist
          if (floor != null) {
            canvasContext.drawImage(floor, isoDrawX - ISO_GRID_W / 2, isoDrawY - ISO_TILE_GROUND_Y);

            if (this.fog && this.level[tileIndex].getState() == TileState.NOTINVIEW)
              darkenFloor(isoDrawX - ISO_GRID_W / 2, isoDrawY - ISO_TILE_GROUND_Y);

            if (displayTileX_Y)
              colorText("X: " + isoDrawX, isoDrawX, isoDrawY, "black", "6px Arial Black");
          }
        }

        // Reset
        canvasContext.globalAlpha = 1.0;

        tileIndex++;
      } // end of each col
      tileTopEdgeY += ROOM_H;
    } // end of each row
  }

  drawEverythingElse() {
    var tileIndex = 0;
    var tileLeftEdgeX = 0;
    var tileTopEdgeY = 0;
    var isoTileLeftEdgeX = 0;
    var isoTileTopEdgeY = 0;

    for (var eachRow = 0; eachRow < ROOM_ROWS; eachRow++) {
      tileLeftEdgeX = 0;
      for (var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
        tileLeftEdgeX += ROOM_W;
        isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY) / 2;
        isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY) / 4;
        tileCoordToIsoCoord(eachCol, eachRow);

        // Draw only if explored
        if (this.level[tileIndex].getState() != TileState.UNEXPLORED)
            this.level[tileIndex].draw(eachCol, eachRow, tileIndex);

        if (getTileIndexAtPixelCoord(playerOne.x, playerOne.y) == tileIndex)
          playerOne.draw();

        for (var npc of this.npcList)
          if(getTileIndexAtPixelCoord(npc.x, npc.y) == tileIndex)
            if(tileIsInPlayerVision(tileIndex) || !this.fog)
              npc.draw();

        tileIndex++;
      } // end of each col
      tileTopEdgeY += ROOM_H;
    } // end of each row
  }

  move() {
    for (var npc of this.npcList)
      npc.movement();
    playerOne.movement();
    updatedCameraPosition();
  }

  onMouseClick(mouseX, mouseY) {
    mouseClickX = mouseX;
    mouseClickY = mouseY;

    if (this.highlightedTileIndex != null)
      if (isAFloor(this.level[this.highlightedTileIndex].getTileType()))
      {
        playerOne.finishedMoving = false;
        playerOne.destinationTileIndex= this.highlightedTileIndex;
      }
  }

  onMouseMove(mouseX, mouseY) {
    this.highlightedTileIndex = screenCoordToGameCoord(mouseX, mouseY).indexUnderPixel;
  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }
}

function levelDescend() {
  currentMap++;
  mapStack[currentMap].prepareLevel();
  mapStack[currentMap].playerDescending();
}

function levelAscend() {
  currentMap--;
  mapStack[currentMap].prepareLevel();
  mapStack[currentMap].playerAscending();
}

function tileIsInPlayerVision(tileIndex) {
  var playerIndex = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);

  if ((tileIndex >= playerIndex - playerOne.vision*42 && (tileIndex <= playerIndex + playerOne.vision*42))) {
    var left = playerIndex - playerOne.vision;
    while (left <= playerIndex + playerOne.vision) {
      if(left%40 == tileIndex%40)
        return true;
      left++;
    }
  }

  return false;
}

function darkenWall(x, y) {
  canvasContext.globalAlpha = 0.5;

  // offset
  x += 26;
  y -= 13;

  var increment = 12;

  canvasContext.fillStyle = '#000';
  canvasContext.beginPath();
  canvasContext.moveTo(x, y + increment);
  canvasContext.lineTo(x + increment*2, y + increment*2);
  canvasContext.lineTo(x + increment*2, y + increment*4 + 2);
  canvasContext.lineTo(x, y + increment*5 + 4);
  canvasContext.lineTo(x - increment*2 - 2, y + increment*4 + 3);
  canvasContext.lineTo(x - increment*2 - 2, y + increment*2 + 1);
  canvasContext.fill();
  canvasContext.closePath();

  // Reset
  canvasContext.globalAlpha = 1;
}

function darkenFloor(x, y) {
  canvasContext.globalAlpha = 0.5;

  // offset
  x += 26.5;
  y -= 12;

  var increment = 12;

  canvasContext.fillStyle = '#000';

  canvasContext.beginPath();
  canvasContext.moveTo(x+1, y + increment - 0.5);
  canvasContext.lineTo(x + increment*2 + 1.5, y + increment*2);
  canvasContext.lineTo(x, y + increment*3 + 1);
  canvasContext.lineTo(x - increment*2 - 1, y + increment*2);
  canvasContext.fill();
  canvasContext.closePath();

  canvasContext.globalAlpha = 0.5;

  // offset
  /*x += 26.5;
  y += 36;

  var increment = 12;

  canvasContext.fillStyle = '#000';

  canvasContext.beginPath();
  canvasContext.moveTo(x+1, y + increment - 0.5);
  canvasContext.lineTo(x + increment*2 + 1.5, y + increment*2);
  canvasContext.lineTo(x, y + increment*3 + 1);
  canvasContext.lineTo(x - increment*2 - 1, y + increment*2);
  canvasContext.fill();
  canvasContext.closePath();*/

  // Reset
  canvasContext.globalAlpha = 1;
}
