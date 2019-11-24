const SPIDER_NAMES = [ "Splinter", "Bob" ];

const SPIDER_MAX_HEALTH = 2;
const SPIDER_MOVEMENT_SPEED = 3;
const SPIDER_WIDTH = 31;
const SPIDER_HEIGHT = 30;

class Spider extends Enemy {
  constructor() {
    super(SPIDER_MAX_HEALTH, SPIDER_MOVEMENT_SPEED, SPIDER_WIDTH, SPIDER_HEIGHT);
  }

  init() {
    super.init(spiderPic, randFromList(SPIDER_NAMES), TILE_SPIDER);
  }
}
