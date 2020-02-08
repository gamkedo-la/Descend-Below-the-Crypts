const BARTENDER_MAX_HEALTH = 2;
const BARTENDER_MOVEMENT_SPEED = 0;
const BARTENDER_WIDTH = 21;
const BARTENDER_HEIGHT = 28;

class Bartender extends Friend {
  constructor(location) {
    super(BARTENDER_MAX_HEALTH, BARTENDER_MOVEMENT_SPEED, BARTENDER_WIDTH, BARTENDER_HEIGHT);
		this.init();
  }

  init() {
    super.init(bartenderPic, 'Mick', TILE_BARTENDER);
		this.enableAnimation = false;
  }
}
