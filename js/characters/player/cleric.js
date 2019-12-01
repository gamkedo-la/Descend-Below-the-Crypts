const CLERIC_MAX_HEALTH = 4;
const CLERIC_MOVEMENT_SPEED = 3;
const CLERIC_WIDTH = 30;
const CLERIC_HEIGHT = 30;

class Cleric extends Player {
  constructor() {
    super(CLERIC_MAX_HEALTH, CLERIC_MOVEMENT_SPEED, CLERIC_WIDTH, CLERIC_HEIGHT);
    super.init(clericPic, "The Cleric");
  }
}
