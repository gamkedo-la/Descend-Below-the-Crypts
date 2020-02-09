class DebugMenu {
  static draw(displayTileX_Y, isInvulnerable, moveFast, hasUnlimitedKeys, noClipEnabled) {
    var debugLineY = 50;
    var debugLineSkipY = 20;
    var debugFont = "16px Arial Black";
    var debugColor = "white";
    var startX = 500;

    var rectColour = "rgba(255, 255, 255, 0.3)";
    var debugLineCount = 9;
    var statsLineCount = 2;

    var playerTile = getTileIndexAtPixelCoord(playerOne.x, playerOne.y);

    // Debug Menu
    colorRect(startX, debugLineY - 20, 250, debugLineSkipY*debugLineCount+1 + 10, rectColour)

    colorText("DEBUG MENU", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("1. Show/Hide debug menu", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("2. Tile Coords: " + (displayTileX_Y ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("3. Godmode: "+ (isInvulnerable ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("4. Fast move: "+ (moveFast ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("5. Unlimited Keys: "+ (hasUnlimitedKeys ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("6. No Clip: "+ (noClipEnabled ? "On" : "Off"), startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("7. Reveal this map", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("8. Receive 1 damage point", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY*2;

    // Stats Menu
    colorRect(startX, debugLineY - 20, 250, debugLineSkipY*statsLineCount+1 + 10, rectColour)

    colorText("STATS", startX + 10, debugLineY, debugColor, debugFont);
    debugLineY += debugLineSkipY;
    colorText("Player tile: " + playerTile, startX + 10, debugLineY, debugColor, debugFont);
  }
}
