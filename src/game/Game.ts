// dependencies
import Plane from './Plane';
import Background from './Background';
import App from '../app';

class Game {
  private plane: Plane;
  private backgrounds: Background[] = [];

  private static firstInstance: Game = null;
  private static gameSpeed: number = -5;

  constructor() {
    this.init();
  }

  public static getInstance(): Game {
    if (this.firstInstance === null) {
      this.firstInstance = new Game();
    }

    return this.firstInstance;
  }

  public getBackgrounds = (): Background[] => this.backgrounds;

  public static getGameSpeed = (): number => Game.gameSpeed;
  public static setGameSpeed = (speed: number) => Game.gameSpeed = speed;

  private initBackgrounds = async (): Promise<any> => {
    const backgroundsAmt = Math.ceil(App.getView().renderer.height / Background.getHeight() + 1);

    for (let i = 0; i < backgroundsAmt; i += 1) {
      this.backgrounds.push(new Background(i));
    }
  }

  private init = async (): Promise<any> => {
    await this.initBackgrounds();
    this.plane = await new Plane();
  }
}

export default Game;
