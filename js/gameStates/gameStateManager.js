const State = {
  MENU: 0,
  CHARSELECT: 1,
  PLAY: 2
};

class GameStateManager {
  constructor() {
    this.state = State.MENU;
    this.stateStack = [ new MainMenu(),
                        new CharacterSelection(),
                        new Play() ];
  }

  setState(newState) {
    this.state = newState;
  }

  getState() {
    return this.stateStack[this.state];
  }
}
