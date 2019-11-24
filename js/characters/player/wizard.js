const WIZARD_MAX_HEALTH = 4;
const WIZARD_MOVEMENT_SPEED = 3;
const WIZARD_WIDTH = 30;
const WIZARD_HEIGHT = 30;

class Wizard extends Player {
  constructor() {
    super(WIZARD_MAX_HEALTH, WIZARD_MOVEMENT_SPEED, WIZARD_WIDTH, WIZARD_HEIGHT);
  }

  init() {
    super.init(wizardPic, "The Wizard");
  }
}