class QuestOne extends GameState {
  constructor() {
    super();
  }

  draw() {
    super.draw();

    canvasContext.drawImage(questOneBackgroundPic,0, 0);
  }
}
