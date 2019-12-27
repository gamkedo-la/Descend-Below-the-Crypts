const State = {
  MENU: 0,
  CHARSELECT: 1,
  PLAY: 2,
  INSTRUCTIONS: 3,
  CREDITS: 4,
  QUESTONE: 5
};

class GameStateManager {
  constructor() {
    this.state = State.MENU;
    this.stateStack = [ new MainMenu(),
                        new CharacterSelection(),
                        new Play(),
                        new InstructionMenu(),
                        new Credits() ,
						new QuestOne()
                      ];
  }

  setState(newState) {
    this.state = newState;
  }

  getState() {
    return this.stateStack[this.state];
  }
}
