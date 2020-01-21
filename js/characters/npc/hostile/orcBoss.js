//////////// SKELETON KING /////////////////////////////

const ORC_BOSS_MAX_HEALTH = 30;
const ORC_BOSS_MOVEMENT_SPEED = 5;
const ORC_BOSS_WIDTH = 50;
const ORC_BOSS_HEIGHT = 56;

class OrcBoss extends Enemy {
  constructor() {
    super(ORC_BOSS_MAX_HEALTH, ORC_BOSS_MOVEMENT_SPEED, ORC_BOSS_WIDTH, ORC_BOSS_HEIGHT);
    this.init();
  }

  init() {
    super.init(orcBossPic, "Kurden", TILE_ORC_BOSS);
	this.enableAnimation = false;
	this.canMove = true;
  }
}
