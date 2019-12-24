const WARRIOR_MAX_HEALTH = 4;
const WARRIOR_MOVEMENT_SPEED = 3;
const WARRIOR_WIDTH = 30;
const WARRIOR_HEIGHT = 30;

// Attack power:
const PUNCH_POWER = 1;

class Warrior extends Player {
  constructor() {
    super(WARRIOR_MAX_HEALTH, WARRIOR_MOVEMENT_SPEED, WARRIOR_WIDTH, WARRIOR_HEIGHT);
    super.init(warriorPic, "The Warrior");
  }

  attackWithSword(){
    console.log('Attacking with sword');
  }

  attackWithPunch(enemy){
    console.log('Attacking with punch');
    enemy.receiveDamage(PUNCH_POWER);
  }
  
  attackWithMace(){
    console.log('Attacking with mace');
  }
}
