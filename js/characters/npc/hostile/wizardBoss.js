const WIZARD_BOSS_MAX_HEALTH = 50;
const WIZARD_BOSS_MOVEMENT_SPEED = 8;
const WIZARD_BOSS_WIDTH = 42;
const WIZARD_BOSS_HEIGHT = 57;

class WizardBoss extends Enemy {
  constructor() {
    super(WIZARD_BOSS_MAX_HEALTH, WIZARD_BOSS_MOVEMENT_SPEED, WIZARD_BOSS_WIDTH, WIZARD_BOSS_HEIGHT);
    this.init();
  }

  init() {
    super.init(wizardBossPic, "Nameless", TILE_WIZARD_BOSS);
	this.enableAnimation = false;
	this.canMove = false;
  }
}

