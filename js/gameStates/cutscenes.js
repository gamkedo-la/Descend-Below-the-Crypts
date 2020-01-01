const Scene = {
  QUESTONE: 0,
  QUESTTWO: 1
};

// Global array
var cutscenePlayed = [];

class Cutscenes extends GameState {
  constructor() {
    super();

    this.scene = Scene.QUESTONE;
    this.cutsceneStack = [ new QuestOne(),
                           new QuestTwo() ];

    for (var cutscene in this.cutsceneStack)
      cutscenePlayed.push(false);
  }

  setCutscene(newScene) {
    this.scene = newScene;
  }

  draw() {
    super.draw();

    this.cutsceneStack[this.scene].draw();

    // cutscene draw finish handler
    if (this.cutsceneStack[this.scene].state == SceneState.FINISHED)
      gameStateManager.setState(State.PLAY);
  }

  onMouseClick(mouseX, mouseY) {
    this.skipCutscene();
  }

  onMouseMove(mouseX, mouseY) {

  }

  onKeyPress(evt) {

  }

  onKeyRelease(evt) {

  }

  skipCutscene() {
    this.cutsceneStack[this.scene].state = SceneState.FINISHED;
    cutscenePlayed[this.scene] = true;
  }
}
