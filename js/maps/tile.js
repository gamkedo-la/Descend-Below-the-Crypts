const TileState = {
  UNEXPLORED: 0,
  NOTINVIEW: 1,
  INVIEW: 2
}

class Tile {
  constructor(tileType, tileIndex, getBaseTile, hostileMap) {
    this.fog = hostileMap;
    this.tileIndex = tileIndex;
    this.state = this.fog ? TileState.UNEXPLORED : TileState.INVIEW;
    this.getBaseTileFunction = getBaseTile;
    this.needsRedraw = true;
    this.transparency = 1;
    this.changeTile(tileType);
  }

  changeTile(newTileType) {
    this.tileType = newTileType;
  }

  getTileType() {
    return this.tileType;
  }

  getTileIndex() {
    return this.tileIndex;
  }

  onRedraw() {
    this.needsRedraw = true;
  }

  offRedraw() {
    this.needsRedraw = false;
  }

  setState(newState) {
    this.state = newState;
  }

  getState() {
    return this.state;
  }

  draw(col, row, tileIndex) {
    var decor = trackPics[this.tileType];
    var bitmap = trackPics[this.getBaseTileFunction(this.tileType)];
    var decorAnim = isDecorAnimated(this.tileType);

    if (decor == bitmap)
      decor = null;

    if (this.needsRedraw) {
      if (isWallTransparent(playerOne, tileIndex) &&
            isAWall(this.getBaseTileFunction(this.tileType)))
        canvasContext.globalAlpha = 0.5;

      // Draw base
      if (!isAFloor(this.getBaseTileFunction(this.tileType)))
        canvasContext.drawImage(bitmap, isoDrawX - ISO_GRID_W / 2, isoDrawY - ISO_TILE_GROUND_Y);

      // Reset
      canvasContext.globalAlpha = 1;
    }

    // Draw decor (if any)
    if (decor != null) {
      if (decorAnim) {
        var objectFrames = 4;
        var animOffset = (col + row + Math.floor(sharedAnimCycle * 0.1)) % objectFrames;
        canvasContext.drawImage(decor,
            animOffset * ISO_TILE_DRAW_W, 0, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H,
            isoDrawX - ISO_GRID_W / 2, isoDrawY - ISO_TILE_GROUND_Y, ISO_TILE_DRAW_W, ISO_TILE_DRAW_H);
      } else
        canvasContext.drawImage(decor, isoDrawX - ISO_GRID_W / 2, isoDrawY - ISO_TILE_GROUND_Y);
    }

    /*if (this.state == TileState.NOTINVIEW)
      colorText("1", isoDrawX, isoDrawY, "black", "6px Arial Black");
    else if (this.state == TileState.INVIEW)
      colorText("2", isoDrawX, isoDrawY, "black", "6px Arial Black");*/

  }

  onMouseClick() {

  }

  onMouseOver() {

  }
}

// Check if decor is animated
function isDecorAnimated(tile) {
  return (tile == TILE_WALL_WITH_TORCH ||
          tile == TILE_CRYPT_TORCH ||
          tile == TILE_ORC_FLAG ||
          tile == TILE_FIREPIT ||
          tile == TILE_FIRE_PLACE_LIT);
}

// Check if tile is a wall
function isAWall(tile) {
  return (tile == TILE_WALL ||
          tile == TILE_WALL_SWORD ||
          tile == TILE_WALL_SHIELD ||
          tile == TILE_WALL_WITH_TORCH ||
          tile == TILE_CRYPT ||
          tile == TILE_CRYPT_WALL ||
          tile == TILE_CRYPT_TORCH ||
          tile == TILE_KINGS_CHAMBER_WALL ||
          tile == TILE_TOWN_WALL ||
          tile == TILE_CAVE_WALL ||
          tile == TILE_TOWN_WALL_NORTH ||
          tile == TILE_TOWN_WALL_SOUTH ||
          tile == TILE_CRYPT_WALL_NORTH ||
          tile == TILE_TOWN_WALL_WEST ||
          tile == TILE_TOWN_WALL_EAST ||
          tile == TILE_TOWN_WALL_NW ||
          tile == TILE_TOWN_WALL_NE ||
          tile == TILE_CRYPT_BODY);
}

// Check if tile is a half wall
function isAHalfWall(tile) {
  return (tile == TILE_TOWN_WALL_NORTH ||
          tile == TILE_TOWN_WALL_SOUTH ||
          tile == TILE_CRYPT_WALL_NORTH ||
          tile == TILE_TOWN_WALL_WEST ||
          tile == TILE_TOWN_WALL_EAST ||
          tile == TILE_TOWN_WALL_NW ||
          tile == TILE_TOWN_WALL_NE);
}

// Check if tile is a wall
function isAFloor(tile) {
  return (tile == TILE_ROAD ||
          tile == TILE_CRYPT_FLOOR ||
          tile == TILE_GRASS ||
          tile == TILE_TOWN_ROAD ||
          tile == TILE_RED_RUG_CEN ||
          tile == TILE_RED_RUG_TL ||
          tile == TILE_RED_RUG_TR ||
          tile == TILE_RED_RUG_BL ||
          tile == TILE_RED_RUG_BR ||
          tile == TILE_RED_RUG_TOP ||
          tile == TILE_RED_RUG_BOT ||
          tile == TILE_RED_RUG_CEN ||
          tile == TILE_RED_RUG_L ||
          tile == TILE_RED_RUG_R ||
          tile == TILE_BLUE_RUG_TL ||
          tile == TILE_BLUE_RUG_TR ||
          tile == TILE_BLUE_RUG_BL ||
          tile == TILE_BLUE_RUG_BR ||
          tile == TILE_BLUE_RUG_TOP ||
          tile == TILE_BLUE_RUG_BOT ||
          tile == TILE_BLUE_RUG_CEN ||
          tile == TILE_BLUE_RUG_L ||
          tile == TILE_BLUE_RUG_R ||
          tile == TILE_GREEN_RUG_TL ||
          tile == TILE_GREEN_RUG_TR ||
          tile == TILE_GREEN_RUG_BL ||
          tile == TILE_GREEN_RUG_BR ||
          tile == TILE_GREEN_RUG_TOP ||
          tile == TILE_GREEN_RUG_BOT ||
          tile == TILE_GREEN_RUG_CEN ||
          tile == TILE_GREEN_RUG_L ||
          tile == TILE_GREEN_RUG_R);
}

// Check if wall is transparent
function isWallTransparent(object, tileIndex) {
	return getTileIndexAtPixelCoord(object.x, object.y) == tileIndex ||
				 getTileIndexAtPixelCoord(object.x, object.y) + 1 == tileIndex ||
				 getTileIndexAtPixelCoord(object.x, object.y) + 40 == tileIndex ||
				 getTileIndexAtPixelCoord(object.x, object.y) + 41 == tileIndex;
}
