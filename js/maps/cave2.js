class Cave2 extends Map {
  constructor() {
    super(caveLevelTwo, false)
  }

  prepareLevel() {
    newLevelTitle.begin("The Cave Level 2");
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
	  case TILE_WIZARD_BOSS:
      case TILE_PLAYER:
	  // Floor Decors:
      case TILE_FIREPIT:
      case TILE_FIRE_PLACE_LIT:
      case TILE_ORC_FLAG:
	  case TILE_BOX:
	  case TILE_BARREL:
	  case TILE_BARREL_3:
        return TILE_ROAD;

      // Wall Decors
      case TILE_WALL_WITH_TORCH:
      case TILE_CRYPT_TORCH:
      case TILE_WALL_SHIELD:
      case TILE_WALL_SWORD:
        return TILE_WALL;

      // Returns tile if no base tile is found
      default:
        return tileIndex;
    }
  }
}
