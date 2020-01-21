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
      this.level[i] = new Tile(this.level[i], this.getBaseTile, this.fog);
  }

  // Add Npcs here
  loadNpcs() {
    for (var i = 0; i < this.level.length; i++) {
      switch (this.level[i]) {
        // Hostile NPCs
        case TILE_GOBLIN:
            this.addChar(i, new Goblin());
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

        // Friendly NPCs

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

        // Reset draw state
        this.level[tileIndex].resetDrawn();

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
          this.level[tileIndex].setDrawn();
        }
        else if (isAFloor(this.getBaseTile(tileTypeHere)))
          floor = trackPics[this.getBaseTile(tileTypeHere)];

        // If a floor exist
        if (floor != null) {
          canvasContext.drawImage(floor, isoDrawX - ISO_GRID_W / 2, isoDrawY - ISO_TILE_GROUND_Y);

          if (displayTileX_Y)
            colorText("X: " + isoDrawX, isoDrawX, isoDrawY, "black", "6px Arial Black");
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

        this.level[tileIndex].draw(eachCol, eachRow, tileIndex);

        if (getTileIndexAtPixelCoord(playerOne.x, playerOne.y) == tileIndex)
          playerOne.draw();

        for (var npc of this.npcList)
          if(getTileIndexAtPixelCoord(npc.x, npc.y) == tileIndex)
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
        playerOne.wayPointMovement(this.highlightedTileIndex);
  }

  onMouseMove(mouseX, mouseY) {
    this.highlightedTileIndex = screenCoordToGameCoord(mouseX, mouseY).indexUnderPixel;

    // Check if npc is hovered
    //for (var npc of this.npcList)
    //  if (getTileIndexAtPixelCoord(npc.x, npc.y) == highlightedIndex)
    //    this.highlighted = npc;

    // Check if floor is hovered
    //if (isFloor(this.level[highlightedIndex]))
    //  this.highlightedTileIndex = highlightedIndex;

    // TO-DO: An item is hovered
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
