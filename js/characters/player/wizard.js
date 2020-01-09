const WIZARD_MAX_HEALTH = 4;
const WIZARD_MOVEMENT_SPEED = 3;
const WIZARD_WIDTH = 25;
const WIZARD_HEIGHT = 30;

class Wizard extends Player {
  constructor() {
    super(WIZARD_MAX_HEALTH, WIZARD_MOVEMENT_SPEED, WIZARD_WIDTH, WIZARD_HEIGHT);
    super.init(wizardPic, "The Wizard");
	  this.mana = 4;
	  this.maxMana = 4;
    this.enableAnimation = true;
    this.FIREBALL_DAMAGE = 1;
    this.FLAME_DAMAGE = 2;
  }
  
  attackWithFireBallSpell(enemy){
    if( !this.fireballSpell ) {
      return;
    }

    if( this.mana < 1 ) {
      this.notEnoughManaAlert();
      return;
    }

    console.log('Attacking with Fireball Spell');
    this.mana -= 1;
    enemy.receiveDamage(this.FIREBALL_DAMAGE);
    
  }

  
  attackFlameSpell() {
    if( !this.flameSpell ) {
      return;
    }

    if( this.mana < 2 ) {
      this.notEnoughManaAlert();
      return;
    }
    
    console.log('Attacking with Flame Spell');
    this.mana -= 2;
    enemy.receiveDamage(this.FLAME_DAMAGE);
  }
}
