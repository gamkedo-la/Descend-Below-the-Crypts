const WARRIOR_MAX_HEALTH = 4;
const WARRIOR_MOVEMENT_SPEED = 3;
const WARRIOR_WIDTH = 30;
const WARRIOR_HEIGHT = 30;

class Warrior extends Player {
  constructor() {
    super(WARRIOR_MAX_HEALTH, WARRIOR_MOVEMENT_SPEED, WARRIOR_WIDTH, WARRIOR_HEIGHT);
    super.init(warriorPic, "The Warrior");
  }
}
