const ORC_NAMES = [ "Orc 1", "Orc 2", "Orc 3", "Orc 4", "Orc 5", "Orc 6" ];

const ORC_MAX_HEALTH = 2;
const ORC_MOVEMENT_SPEED = 3;
const ORC_WIDTH = 30;
const ORC_HEIGHT = 30;

class Orc extends Enemy {
  constructor() {
    super(ORC_MAX_HEALTH, ORC_MOVEMENT_SPEED, ORC_WIDTH, ORC_HEIGHT);
  }

  init() {
    super.init(orcPic, randFromList(ORC_NAMES), TILE_ORC);
  }
}
