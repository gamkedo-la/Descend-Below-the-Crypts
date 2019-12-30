const SceneState = {
  NOTSTARTED: 0,
  STARTED: 1,
  FINISHED: 2
};

class Cutscene {
  constructor() {
    this.state = SceneState.NOTSTARTED;
  }

  draw() {
    if (this.state == SceneState.NOTSTARTED)
      this.state = SceneState.STARTED;
  }
}
