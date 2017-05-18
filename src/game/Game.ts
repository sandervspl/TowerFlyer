// dependencies
import Plane from './Plane';
import Background from './Background';
import App from '../app';

// game sprites
const gameSprites = [
  {
    name: 'background',
    url: 'assets/images/background.png',
  },
  {
    name: 'plane_sheet',
    url: 'assets/spriteSheets/plane/plane.json',
  },
];

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

  private initSprites = (): void => {
    PIXI.loader
      .add(gameSprites)
      .on('progress', this.loadProgressHandler)
      .load(this.onSpritesLoaded);
  }

  private loadProgressHandler = (loader, resource): void => {
    console.log(`Loading: ${resource.url}`);
    console.log(`Progress: ${loader.progress}%`);
  }

  private onSpritesLoaded = (loader, resources): void => {
    console.log('Done loading!');
    // console.log(resources);

    // deconstruct resources
    const { background, plane_sheet } = resources;

    // set background static size
    Background.size.height = background.texture.baseTexture.height;
    Background.size.width = background.texture.baseTexture.width;

    // init objects
    this.initBackgrounds(background.url);
    this.plane = new Plane(plane_sheet.url);
  }

  private initBackgrounds = (backgroundSpriteURL): void => {
    const backgroundsAmt = Math.ceil(App.getView().renderer.height / Background.size.height + 1);

    for (let i = 0; i < backgroundsAmt; i += 1) {
      this.backgrounds.push(new Background(i, backgroundSpriteURL));
    }
  }

  private init = (): void => {
    this.initSprites();
  }
}

export default Game;
