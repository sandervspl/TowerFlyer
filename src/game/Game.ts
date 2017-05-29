// dependencies
import * as PIXI from 'pixi.js';
import Plane from './Plane';
import Background from './Background';
import App from '../app';
import Preloader from './Preloader';
import ObstacleMgr from './ObstacleMgr';
import DistanceIndicator from './DistanceIndicator';
import Score from './Score';
import EndScreen from './views/EndScreen';

// namespaces
import { env } from '../namespaces/environment';

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
  private obstacleMgr: ObstacleMgr;
  private distanceIndicator: DistanceIndicator;

  private static firstInstance: Game = null;
  private static gameSpeed: number = -5;

  constructor() {
    this.initSprites();
  }

  public static getInstance(): Game {
    if (this.firstInstance === null) {
      this.firstInstance = new Game();
    }

    return this.firstInstance;
  }

  public static getGameSpeed = (): number => Game.gameSpeed;
  public static setGameSpeed = (speed: number) => Game.gameSpeed = speed;

  public getBackgrounds = (): Background[] => this.backgrounds;

  public gameOver = (): void => {
    App.getView().ticker.stop();

    const score = Score.calculateDistanceInMeters();
    EndScreen.show(score);
  }

  private initSprites = (): void => {
    PIXI.loader
      .add(gameSprites)
      .on('progress', this.loadProgressHandler)
      .load(this.onSpritesLoaded);
  }

  private loadProgressHandler = (loader, resource): void => {
    env.log(`Loading: ${resource.name} (${resource.url})`);
    env.log(`Progress: ${loader.progress}%`);

    Preloader.update(loader.progress);
  }

  private onSpritesLoaded = (loader, resources): void => {
    env.log('Done loading!');
    // env.log(resources);

    // deconstruct resources
    const { background, plane_sheet } = resources;

    // init objects
    this.initBackgrounds(background);
    this.plane = new Plane(plane_sheet.url);
    this.obstacleMgr = new ObstacleMgr(this.plane);
    this.distanceIndicator = new DistanceIndicator();
    Score.getInstance();

    // remove preloader overlay
    Preloader.end();
  }

  private initBackgrounds = (backgroundResource): void => {
    // set background static size
    Background.setSize(backgroundResource);

    // calculate the amount of backgrounds we need for it to properly loop
    const backgroundsAmt = Math.abs(Math.ceil(App.getView().renderer.height / Background.size.height + 1));

    for (let i = 0; i < backgroundsAmt; i += 1) {
      this.backgrounds.push(new Background(i, backgroundResource));
    }
  }
}

export default Game;
