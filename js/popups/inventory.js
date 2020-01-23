class Inventory {
  static draw() {
    const blackTransparent = 'rgba(0,0,0,0.5)';
    colorRect( 0, 0, canvas.width, canvas.height, blackTransparent );
    canvasContext.drawImage(inventoryScreenPic, 0, 0);
    
    if( !playerOne ) {
      return;
    }

    const playerType = playerOne.constructor.name;
    
    if ( playerType == "Warrior" ) {
      this.drawPlayerHeadShot( warriorProfilePic );
    } else if ( playerType == "Cleric" ) {
      this.drawPlayerHeadShot( clericProfilePic );
    } else {
      this.drawPlayerHeadShot( wizardProfilePic );
    }
  }

  static drawPlayerHeadShot( image ) {
    const playerImageX = 380;
    const playerImageY = 50;
    canvasContext.save();
    canvasContext.globalAlpha = 1;
    colorRect( playerImageX, playerImageY, 150, 200, 'black' );
    canvasContext.drawImage( image, playerImageX, playerImageY );
    canvasContext.restore();
  }

}
