class QuestTwo extends Cutscene {
  constructor() {
    super();
  }

  draw() {
    super.draw();

    if (this.state == SceneState.STARTED) {
      canvasContext.drawImage(questTwoBackgroundPic,0, 0);

      // change this.state to SceneState.FINISHED when cutscene is done
    }
  }
}
