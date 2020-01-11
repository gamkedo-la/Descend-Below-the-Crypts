const WIZARD_MAX_HEALTH = 4;
const WIZARD_MOVEMENT_SPEED = 3;
const WIZARD_WIDTH = 25;
const WIZARD_HEIGHT = 30;

const FIREBALL_MANA_COST =1;
const FLAME_MANA_COST = 2;
const FREEZE_MANA_COST = 1;

class Wizard extends Player {
  constructor() {
    super(WIZARD_MAX_HEALTH, WIZARD_MOVEMENT_SPEED, WIZARD_WIDTH, WIZARD_HEIGHT);
    super.init(wizardPic, "The Wizard");
	  this.mana = 4;
	  this.maxMana = 4;
    this.enableAnimation = true;
    this.FIREBALL_DAMAGE = 1;
    this.FLAME_DAMAGE = 2;
    this.FREEZE_DAMAGE = 2;
  }
  
  attackWithFireBallSpell(enemy){
    if( !this.fireballSpell ) {
      return;
    }

    console.log('Attacking with Fireball Spell');
    this.mana -= FIREBALL_MANA_COST;
    enemy.receiveDamage(this.FIREBALL_DAMAGE);
    
  }

  
  attackFlameSpell(enemy) {
    if( !this.flameSpell ) {
      return;
    }
    
    console.log('Attacking with Flame Spell');
    this.mana -= FLAME_MANA_COST;
    enemy.receiveDamage(this.FLAME_DAMAGE);
  }

  attackFreezeSpell(enemy) {
    if( !this.freezeSpell ) {
      return;
    }
    
    console.log('Attacking with Freeze Spell');
    this.mana -= FREEZE_MANA_COST;
    enemy.receiveDamage(this.FREEZE_DAMAGE);
  }
}
