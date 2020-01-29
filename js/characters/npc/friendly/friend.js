class Friend extends NPC {
  constructor(maxHealth, movementSpeed, width, height) {
    super(maxHealth, movementSpeed, width, height);

    // Assuming friendly npcs do not move
    this.canMove = false;
      //checking how to commit, will erase this - Alfonso Salinas
    this.questStarted = false;
    this.questOnGoing = false;
  }

  init(whichGraphic, whichName, whichTile) {
    super.init(whichGraphic, whichName, whichTile);
  }
}
