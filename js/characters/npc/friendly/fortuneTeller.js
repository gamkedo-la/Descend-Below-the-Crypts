const FORTUNE_TELLER_MAX_HEALTH = 2;
const FORTUNE_TELLER_MOVEMENT_SPEED = 0;
const FORTUNE_TELLER_WIDTH = 21;
const FORTUNE_TELLER_HEIGHT = 28;

class FortuneTeller extends Friend {
  constructor(location) {
    super(FORTUNE_TELLER_MAX_HEALTH, FORTUNE_TELLER_MOVEMENT_SPEED, FORTUNE_TELLER_WIDTH, FORTUNE_TELLER_HEIGHT);
		this.init();
  }

  init() {
    super.init(fortuneTellerPic, 'Em', TILE_FORTUNE_TELLER);
		this.enableAnimation = false;
  }
}
