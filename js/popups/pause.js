// Draws the pause screen

class Pause {
  static draw() {
    const blackTransparent = 'rgba(0,0,0,0.5)';
    colorRect( 0, 0, canvas.width, canvas.height, blackTransparent );
    canvasContext.drawImage(menuScreenPic, ( canvas.width / 2 ) - 150, 0 );
    colorText( "PAUSED", ( canvas.width / 2 ) - 100, canvas.height / 2 , 'black', "52px Arial  Black" );
  }
}
