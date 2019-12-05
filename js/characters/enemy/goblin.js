const GOBLIN_NAMES = [ "Lalx", "Hosterz", "Wruc", "Arx", "Plex", "Brong", "Bogz",
				"Stror", "Klerk", "Rizz", "Lals", "Urt", "Xagz", "Slirm",
				"Kiok", "Wrokx", "Fiog", "Goziord"];

const GOBLIN_MAX_HEALTH = 2;
const GOBLIN_MOVEMENT_SPEED = 3;
const GOBLIN_WIDTH = 30;
const GOBLIN_HEIGHT = 31;

class Goblin extends Enemy {
  constructor() {
    super(GOBLIN_MAX_HEALTH, GOBLIN_MOVEMENT_SPEED, GOBLIN_WIDTH, GOBLIN_HEIGHT)
  }

  init() {
    super.init(goblinPic, randFromList(GOBLIN_NAMES), TILE_GOBLIN);
	this.enableAnimation = true;
  }
}
