class Credits extends GameState {
  constructor() {
    super();
  }
  
  /**
   *  Draw all content
   */
  draw() {
    super.draw();
    this.drawImages();
  }

  /**
   *  Mouse click event handler
   * 
   * @param {number} mouseXPosition 
   * @param {number} mouseYPosition
   */
  onMouseClick( mouseXPosition, mouseYPosition ) {
    if ( this.isMouseOnCanvas( mouseXPosition, mouseYPosition ) ) {
  	   this.returnToMainMenu();
  	}
  }

  /**
   *  Draw all Images
   */
  drawImages() {
    canvasContext.drawImage( mainMenuPic, 0, 0 );
    canvasContext.drawImage( instructionScreenPic, 10, 100 );
    canvasContext.drawImage( titleBarPic, 10, 25 );
    drawCredits();
  }

  /**
   * Check if mouse is on canvas 
   *
   * @param {number} mouseXPosition
   * @param {number} mouseYPosition
   * 
   * @returns {boolean}
   */
  isMouseOnCanvas( mouseXPosition, mouseYPosition ) {
    return mouseXPosition > 0 && mouseXPosition < canvas.width &&
           mouseYPosition > 0 && mouseYPosition < canvas.height;
  }

  /**
   *  Sets State to main menu
   */
  returnToMainMenu() {
    gameStateManager.setState(State.MENU);
  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }
}

// code below is adapted from JS game credits as I'd implemented them for another club game, Little Racers -cdeleon
function drawCredits() {
    canvasContext.globalAlpha = 0.7;
    colorRect(0,0, canvas.width, canvas.height, 'black');
    canvasContext.globalAlpha = 1.0;
    var creditsFontSize = "14px Arial";
    canvasContext.font = creditsFontSize; // reminder: must set before measureText!
    var creditsWidth = canvasContext.measureText(creditsText[0]).width; // assumption: top/first line of text is full-ish
    var creditLineHeightApprox = 12;
    var creditsHeight = creditLineHeightApprox * creditsText.length;
    var textLeftX = canvas.width/2-creditsWidth/2;
    var textTopY = canvas.height/2-creditsHeight/2;
    var lineSkip = 15;
    for(var i=0;i<creditsText.length;i++) {
        var chunks = creditsText[i].split(" - ");
        var justTheName = chunks[0];
        // shadow under the name
        if (chunks[1]) colorText(justTheName,textLeftX+1,textTopY+lineSkip*i+1,"black", creditsFontSize); 
        // full line of text
        colorText(creditsText[i],textLeftX,textTopY+lineSkip*i,"white", creditsFontSize); 
        // decorate each name just for fun
        if (chunks[1]) colorText(justTheName,textLeftX,textTopY+lineSkip*i,"orange", creditsFontSize); 
    }
}

var creditsText =
[
"Vince McKeown - Project lead, core gameplay, most environment and character art (including portraits), AI waypoint system, enemy code, assorted integration, main menu, coins support skeleton king, pathfinding, crypt and town levels, game over screen,",
"Rami Bukhari - Minimap, fast walk debug feature, invulnerable cheat, character positions on minimap, HP/MP HUD bars, key & gold display, inventory mouse support, level loading bug fix, animation code improvements, tooltip feature, abilities cooldown, assorted bug fixes, heal effect, melee attacks, abilities key shortcuts, shield item, enemy treasure drop, fireball spell, cleric heal unlock, heal effect, freeze spell, attack range",
"Yong Wei - Debug menu features, depth layering, wall transparency effect, enemy subclass refactor, key detection improvement, level one design, game state manager, camera tracking, cutscene support, AI bug fix, noclip cheat support",
"Justin Chin - 2nd and 3rd quest, skeleton king voice, evil laugh, conclusion quest story, door closing sound, level for stage between between town and crypt",
"Allan Regush - Linux support fix, help screen, menu state improvements, pause support, credits display, heal spell, cleric attacks, inventory headshot integration, typo fix",
"Kirvee - Run key, design for UI, HUD, and inventory, additional art improvements to title screen and character selection, inventory hookup",
"Jaime Rivas - Basement music",
"Vaan Hope Khani - Potion images",
"Chris DeLeon - Mouse to tile index lookup function, compiled credits",
"Ricardo Velez - Unlimited keys debug cheat",
"Practice commits by Victor Albenor, Alfonso Salinas, Rami Bukhari, and Justin Chin",
" ",
"   Made by members of HomeTeam GameDev (Outpost!), join at HomeTeamGameDev.com to make games with us",
" ",
"                                                               -- CLICK ANYWHERE TO RETURN --"
];

function lineWrapCredits() { // note: gets calling immediately after definition!
    var newCut = [];
    var maxLineChar = 114;
    var findEnd;
    for(var i=0;i<creditsText.length;i++) {
        while(creditsText[i].length > 0) {
            findEnd = maxLineChar;
            if(creditsText[i].length > maxLineChar) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditsText[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditsText[i].substring(0, findEnd));
            creditsText[i] = creditsText[i].substring(findEnd, creditsText[i].length);
        }
    }   
    creditsText = newCut;
}
lineWrapCredits(); // note: calling immediately as part of init
