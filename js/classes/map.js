class Map {
  constructor(level) {
    this.enemyList = [];
    this.loaded = false;
    this.roomGrid = level;

    for (var tile of this.roomGrid) {
      switch(tile) {
        case TILE_GOBLIN:
          this.enemyList.push(new Goblin());
          break;
        case TILE_ORC:
          this.enemyList.push(new Orc());
          break;
        case TILE_OGRE:
          this.enemyList.push(new Ogre());
          break;
        case TILE_RAT:
          this.enemyList.push(new Rat());
          break;
      }
    }
  }

  draw(displayTileX_Y) {
    if (!this.loaded) {
      for (var enemy of this.enemyList) {
        enemy.init();
        enemy.reset(this.roomGrid);
      }
      playerOne.reset(this.roomGrid);
      this.loaded = true;
    }

    this.roomGrid = playerOne.roomGrid;

    this.checkAllPlayerAndEnemyCollisions();
    shiftForCameraPan();
    this.drawMap(displayTileX_Y);
    finishedCameraPan();
  }

  move() {
    for (var enemy of this.enemyList)
      enemy.movement();
    playerOne.movement();
    updatedCameraPosition();
  }

  onMouseClick(mouseX, mouseY) {
    mouseClickX = mouseX;
		mouseClickY = mouseY;
  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }

  drawMap(displayTileX_Y) {
    var tileIndex = 0;
    var tileLeftEdgeX = 700;
    var tileTopEdgeY = 0;
    var isoTileLeftEdgeX = 0;
    var isoTileTopEdgeY = 0;

    sharedAnimCycle++;

    for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
  		tileLeftEdgeX = 7;

  		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
  			var tileTypeHere = this.roomGrid[tileIndex];
  			tileLeftEdgeX += ROOM_W;
  			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
  			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
  			tileCoordToIsoCoord(eachCol, eachRow);

        if( tileTypeHasRoadTransparency(tileTypeHere)) {
  				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  			}
  			else if( tileTypeHasCryptFloorTransparency(tileTypeHere) ) {
  				canvasContext.drawImage(trackPics[TILE_CRYPT_FLOOR], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  			}
  			else if( tileTypeHasWallTransparency(tileTypeHere) ) {
  				if (isWallTransparent(playerOne, tileIndex)) {
  					canvasContext.globalAlpha = 0.4;
  				}

  				canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  				canvasContext.globalAlpha = 1.0;
  			}
  			else if( tileTypeHasRedRugTransparency(tileTypeHere) ) {
  				canvasContext.drawImage(trackPics[TILE_RED_RUG_CEN], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  			}
  			else if( tileTypeHasBlueRugTransparency(tileTypeHere) ) {
  				canvasContext.drawImage(trackPics[TILE_BLUE_RUG_CEN], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  			}


  			//need a helper function here to eliminate the else if
  			if(tileTypeHere == TILE_WALL_WITH_TORCH){
  				if (isWallTransparent(playerOne, tileIndex)) {
  					canvasContext.globalAlpha = 0.4;
  				}

  				canvasContext.drawImage(trackPics[TILE_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  				canvasContext.globalAlpha = 1.0;

  				var torchFrames = 4;
  				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;

  				canvasContext.drawImage(trackPics[TILE_WALL_WITH_TORCH],
  				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H,
  				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
  			} else if (tileTypeHere == TILE_CRYPT_TORCH){
  				if (isWallTransparent(playerOne, tileIndex)) {
  					canvasContext.globalAlpha = 0.4;
  				}

  				canvasContext.drawImage(trackPics[TILE_CRYPT_WALL], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  				canvasContext.globalAlpha = 1.0;

  				var torchFrames = 4;
  				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;

  				canvasContext.drawImage(trackPics[TILE_WALL_WITH_TORCH],
  				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H,
  				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
  			} else if(tileTypeHere == TILE_GOLD_COINS){
  				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);

  				var torchFrames = 4;
  				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;

  				canvasContext.drawImage(trackPics[TILE_GOLD_COINS],
  				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H,
  				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);


  			} else if (tileTypeHere == TILE_FIRE_PLACE_LIT){
  				canvasContext.drawImage(trackPics[TILE_ROAD], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);

  				var torchFrames = 4;
  				var animOffset = (eachCol + eachRow + Math.floor(sharedAnimCycle * 0.1) ) % torchFrames;

          canvasContext.drawImage(trackPics[TILE_FIRE_PLACE_LIT],
  				animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H,
  				isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);

  			} else {
  				if (isWallTransparent(playerOne, tileIndex) && (tileTypeHere == TILE_WALL || tileTypeHere == TILE_CRYPT_WALL)) {
  					canvasContext.globalAlpha = 0.4;
  				}

          canvasContext.drawImage(trackPics[tileTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
  				canvasContext.globalAlpha = 1.0;

  				if(displayTileX_Y) {
  					//colorText("X: " + isoDrawX + " Y: " + isoDrawY, isoDrawX, isoDrawY, "black", "6px Arial Black");
  					colorText("X: " + isoDrawX, isoDrawX, isoDrawY, "black", "6px Arial Black");
  				}
  			}

        if (getTileIndexAtPixelCoord(playerOne.x, playerOne.y) == tileIndex)
  				playerOne.draw();


        for (var enemy of this.enemyList)
          if (getTileIndexAtPixelCoord(enemy.x, enemy.y) == tileIndex)
    				enemy.draw();

  			tileIndex++;
  		} // end of each col
  		tileTopEdgeY += ROOM_H;
  	} // end of each row
  }

  //This checks player and enemy collisions.  This is called every frame.
  //This requires refactoring.  Too many individual lines checking monsters to players
  checkAllPlayerAndEnemyCollisions() {
  	//check goblins
  	for(var i = 0; i < this.enemyList.length; i++){
  		playerOne.checkCollisionsAgainst(this.enemyList[i]);
  		for(var ii = i+1; ii < this.enemyList.length; ii++){
  			enemyList[i].checkCollisionsAgainst(this.enemyList[ii]);
  			enemyList[i].checkCollisionsAgainst(playerOne);
  		}
  	}
  }
}
