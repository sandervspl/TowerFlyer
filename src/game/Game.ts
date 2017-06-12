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
  private app: App;
  private plane: Plane;
  private backgrounds: Background[] = [];
  private obstacleMgr: ObstacleMgr;
  private distanceIndicator: DistanceIndicator;
  private gameOver: boolean;

  private resources = null;

  private static firstInstance: Game = null;
  private static gameSpeed: number = -5;

  constructor(app: App) {
    this.app = app;
  }

  public static getInstance(app?: App): Game {
    if (this.firstInstance === null) {
      this.firstInstance = new Game(app);
    }

    return this.firstInstance;
  }

  public static getGameSpeed = (): number => Game.gameSpeed;
  public static setGameSpeed = (speed: number) => Game.gameSpeed = speed;

  public getBackgrounds = (): Background[] => this.backgrounds;

  public isGameOver = (): boolean => this.gameOver;

  public setGameOver = (): void => {
    this.gameOver = true;

    App.getView().ticker.stop();

    const score = Score.getInstance().calculateDistanceInMeters();
    EndScreen.show(score);
  }

  public init(): void {
    if (this.resources) {
      this.startGame(null, this.resources);
    } else {
      this.initSprites();
    }
  }

  public isPaused = (): boolean => this.app.isPaused();

  private initSprites = (): void => {
    PIXI.loader
      .add(gameSprites)
      .on('progress', this.loadProgressHandler)
      .load(this.startGame);
  }

  private loadProgressHandler = (loader, resource): void => {
    env.log(`Loading: ${resource.name} (${resource.url})`);
    env.log(`Progress: ${loader.progress}%`);

    Preloader.update(loader.progress);
  }

  private startGame = (loader, resources): void => {
    env.log('Done loading!');

    if (this.app.isPaused()) {
      this.app.togglePause();
    }

    this.gameOver = false;

    if (this.resources === null) {
      this.resources = resources;
    }

    Game.setGameSpeed(-5);

    // deconstruct resources
    const { background, plane_sheet } = this.resources;

    // init objects
    this.initBackgrounds(background);

    if (this.plane) {
      this.plane.deconstruct();
    }
    this.plane = new Plane(plane_sheet.url);

    if (this.obstacleMgr) {
      this.obstacleMgr.deconstruct();
    }
    this.obstacleMgr = new ObstacleMgr(this.plane);

    if (this.distanceIndicator) {
      this.distanceIndicator.deconstruct();
    }
    this.distanceIndicator = new DistanceIndicator();

    Score.getInstance().init();

    // remove preloader overlay
    Preloader.end();
    EndScreen.hide();

    App.getView().ticker.start();
  }

  private initBackgrounds = (backgroundResource): void => {
    // set background static size
    Background.setSize(backgroundResource);

    // reset
    this.backgrounds.forEach((bg) => bg.deconstruct());
    this.backgrounds = [];

    // calculate the amount of backgrounds we need for it to properly loop
    const backgroundsAmt = Math.abs(Math.ceil(App.getAppSize().height / Background.size.height) + 1);

    for (let i = 0; i < backgroundsAmt; i += 1) {
      this.backgrounds.push(new Background(i, backgroundResource));
    }
  }
}

export default Game;
