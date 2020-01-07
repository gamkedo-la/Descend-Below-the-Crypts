const CLERIC_MAX_HEALTH = 4;
const CLERIC_MOVEMENT_SPEED = 3;
const CLERIC_WIDTH = 25;
const CLERIC_HEIGHT = 30;

class Cleric extends Player {
  constructor() {
    super(CLERIC_MAX_HEALTH, CLERIC_MOVEMENT_SPEED, CLERIC_WIDTH, CLERIC_HEIGHT);
    super.init(clericPic, "The Cleric");
	  this.mana = 2;
    this.maxMana = 2;
    this.MACE_DAMAGE = 1;
  }

  attackMace() {
    if(! this.mace ) {
      return;
    }
    console.log('Attacked With Mace');
    enemy.receiveDamage(this.MACE_DAMAGE);
  }

  cureSpell() {
    if(! this.healSpell ) {
      return;
    }

    if( this.mana < 1 ) {
      this.notEnoughManaAlert();
      return;
    }

    if ( this.health >= CLERIC_MAX_HEALTH - 1 ) {
      this.health = CLERIC_MAX_HEALTH;
    } else {
      this.health += 2;
    }
    
    this.mana -= 1;
  }

  attackUndead() {
    console.log('Used Undead Attack');
  }

}
