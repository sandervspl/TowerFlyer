// dependencies
import Plane from './Plane';

class Game {
  private plane: Plane;

  private static firstInstance: Game = null;

  constructor() {
    this.plane = new Plane();
  }

  public static getInstance(): Game {
    if (this.firstInstance === null) {
      this.firstInstance = new Game();
    }

    return this.firstInstance;
  }
}

export default Game;
