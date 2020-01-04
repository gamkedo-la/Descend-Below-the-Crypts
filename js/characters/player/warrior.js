const WARRIOR_MAX_HEALTH = 4;
const WARRIOR_MOVEMENT_SPEED = 3;
const WARRIOR_WIDTH = 30;
const WARRIOR_HEIGHT = 30;

// Attack power:
const PUNCH_POWER = 1;
const SWORD_POWER = 2;

class Warrior extends Player {
  constructor() {
    super(WARRIOR_MAX_HEALTH, WARRIOR_MOVEMENT_SPEED, WARRIOR_WIDTH, WARRIOR_HEIGHT);
    super.init(warriorPic, "The Warrior");
  }

  attackWithSword(enemy){
    console.log('Attacking with sword');
    enemy.receiveDamage(SWORD_POWER);
  }
  
  attackWithMace(){
    console.log('Attacking with mace');
  }
}
