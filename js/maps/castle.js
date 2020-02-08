class Castle extends Map {
  constructor() {
     super(castleLevel, false);
  }

  prepareLevel() {
    basementMusic.startOrStopMusic();
    newLevelTitle.begin("The Castle");
    console.log("stairs");
  }

  // Function to retrieve NPC replacement tile or decoration tile base
  getBaseTile(tileIndex) {
    switch(tileIndex) {
      // NPCs
      case TILE_GOBLIN:
      case TILE_ORC:
      case TILE_OGRE:
      case TILE_RAT:
      case TILE_SPIDER:
      case TILE_SKELETON_KING:
      case TILE_ORC_BOSS:
      case TILE_PLAYER:
	  case TILE_BARTENDER:
        return TILE_ROAD;

      // Wall Decors
      case TILE_WALL_WITH_TORCH:
      case TILE_CRYPT_TORCH:
      case TILE_WALL_SHIELD:
      case TILE_WALL_SWORD:
	  case TILE_WALL_ART:
        return TILE_WALL;

      // Floor Decors:
      case TILE_FIREPIT:
      case TILE_FIRE_PLACE_LIT:
      case TILE_ORC_FLAG:
	  case TILE_BOX:
	  case TILE_BARREL:
	  case TILE_BARREL_3:
	  case TILE_CHAIR_2:
	  case TILE_BLUE_DOOR:
	  case TILE_BLUE_DOOR_SIDE:
	  case TILE_CAVE_MINE_CAR:
	  case TILE_YELLOW_KEY:
	  case TILE_HEALING_POTION:
	  case TILE_MANA_POTION:
        return TILE_ROAD;

      // Returns tile if no base tile is found
      default:
        return tileIndex;
    }
  }
}
