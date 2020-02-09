class Enemy extends NPC {
    constructor(maxHealth, movementSpeed, width, height) {
        super(maxHealth, movementSpeed, width, height);

        // Drops:
        this.drops = [
            TILE_HEALING_POTION,
            TILE_MANA_POTION,
            TILE_SHIELD
        ]
    }

    init(whichGraphic, whichName, whichTile) {
        super.init(whichGraphic, whichName, whichTile);
    }

    receiveDamage(damagePoints) {
        this.health -= damagePoints;
        if (this.health <= 0) {

            // play death animation etc..

            var dropChance = Math.floor(Math.random() * 100) + 0;

            if (this instanceof WizardBoss) {
                mapStack[currentMap].replaceTile(50, TILE_TENTACLE);
                loadNpcs();
                playerOne.finalBossKilled = true;
            } else if (this instanceof SkeletonKing) {
                playerOne.skeletonKingKilled = true;
            } else if (this instanceof OrcBoss) {
                playerOne.orcKingKilled = true;
            } else if (this instanceof Goblin) {
                playerOne.goblinKilled++;
            } else if (this instanceof Orc) {
                playerOne.orcKilled++;
            } else if (this instanceof Spider) {
                playerOne.spiderKilled++;
            } else if (this instanceof Ogre) {
                playerOne.orgeKilled++;
            } else if (this instanceof TentacleBoss) {
                playerOne.tentacleKilled++;
            } else if (this instanceof Spider) {
                playerOne.spiderKilled++;
            }



            // 50% drop chance:
            if (dropChance <= 10) {
                // Fetch a random item:
                var droppedItemIndex = Math.floor(Math.random() * this.drops.length) + 0;
                // this.roomGrid[this.walkIntoTileIndex] = this.drops[droppedItemIndex];
                mapStack[currentMap].dropItem(getTileIndexAtPixelCoord(this.x, this.y), this.drops[droppedItemIndex]);
            }
            selectedEnemy = null;
        }
		
		if(playerOne.tentacleKilled >= 8){
			gameStateManager.setState(State.GAMEWON);
		}
		
    }
}