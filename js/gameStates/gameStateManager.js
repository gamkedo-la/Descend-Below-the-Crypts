const State = {
  MENU: 0,
  CHARSELECT: 1,
  PLAY: 2,
  INSTRUCTIONS: 3,
  CREDITS: 4,
  CUTSCENE: 5,
  GAMEOVER: 6,
  GAMEWON: 7
};

class GameStateManager {
  constructor() {
    this.state = State.MENU;
    this.stateStack = [ new MainMenu(),
                        new CharacterSelection(),
                        new Play(),
                        new InstructionMenu(),
                        new Credits(),
                        new Cutscenes(),
						new GameOver(),
						new GameWon()];
  }

  setState(newState, newScene = 0) {
    this.state = newState;

    if (this.state == State.CUTSCENE)
      this.stateStack[State.CUTSCENE].setCutscene(newScene);
  }

  getState() {
    return this.stateStack[this.state];
  }
}
