const OGRE_NAMES = [ "Ogre 1", "Ogre 2", "Ogre 3", "Ogre 4", "Ogre 5", "Ogre 6" ];

const OGRE_MAX_HEALTH = 2;
const OGRE_MOVEMENT_SPEED = 3;
const OGRE_WIDTH = 31;
const OGRE_HEIGHT = 30;

class Ogre extends Enemy {
  constructor() {
    super(OGRE_MAX_HEALTH, OGRE_MOVEMENT_SPEED, OGRE_WIDTH, OGRE_HEIGHT);
    this.init();
  }

  init() {
    super.init(ogrePic, randFromList(OGRE_NAMES), TILE_OGRE);
  }
}
