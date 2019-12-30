const Scene = {
  QUESTONE: 0,
  QUESTTWO: 1
};

class Cutscenes extends GameState {
  constructor() {
    super();

    this.scene = Scene.QUESTONE;
    this.cutsceneStack = [ new QuestOne(),
                           new QuestTwo() ];
  }

  setCutscene(newScene) {
    this.scene = newScene;
  }

  draw() {
    super.draw();

    this.cutsceneStack[this.scene].draw();

    // cutscene draw finish handler
    if (this.cutsceneStack[this.scene].state == SceneState.FINISHED) {
      console.log("Cutscene finished");
    }
  }

  onMouseClick(mouseX, mouseY) {

  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {
    // Probably can do keypress to skip cutscene here
  }
}
