class Town extends Map {
  constructor() {
    super(townArea, true, false);
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
	  case TILE_BARTENDER:
      case TILE_PLAYER:
	  //Inside building floor decoration
	  case TILE_BOX:
	  case TILE_BARREL:
	  case TILE_BARREL_3:
	  case TILE_CHAIR_2:
	  case TILE_YELLOW_KEY:
	  case TILE_HEALING_POTION:
	  case TILE_MANA_POTION:
        return TILE_ROAD;

      // Wall Decors
      case TILE_WALL_WITH_TORCH:
      case TILE_CRYPT_TORCH:
      case TILE_WALL_SHIELD:
      case TILE_WALL_SWORD:
	  case TILE_WALL_ART:

        return TILE_WALL;

      // Grass Decors:
      case TILE_FIREPIT:
        return TILE_GRASS;

      // Returns tile if no base tile is found
      default:
        return tileIndex;
    }
  }

  prepareLevel() {
    basementMusic.startOrStopMusic();
    newLevelTitle.begin("The Town");
  }
}
