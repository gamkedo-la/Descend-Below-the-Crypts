class Crypt2 extends Map {
  constructor() {
    super(levelTwo, false);
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
      case TILE_ORC_BOSS:
      case TILE_PLAYER:
        return TILE_ROAD;

      case TILE_SKELETON_KING:
      case TILE_KINGS_TOMB:
        return TILE_GREEN_RUG_CEN;

      // Wall Decors
      case TILE_WALL_WITH_TORCH:
      case TILE_CRYPT_TORCH:
      case TILE_WALL_SHIELD:
      case TILE_WALL_SWORD:
        return TILE_WALL;

      // Floor Decors:
      case TILE_FIREPIT:
      case TILE_FIRE_PLACE_LIT:
      case TILE_ORC_FLAG:
        return TILE_ROAD;

      // Returns tile if no base tile is found
      default:
        return tileIndex;
    }
  }

  prepareLevel() {
    newLevelTitle.begin("The Crypts Level 2");
  }
}
