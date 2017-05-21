// dependencies
import * as PIXI from 'pixi.js';
import Plane from './Plane';
import Background from './Background';
import App from '../app';
import Preloader from './Preloader';
import Wall from './Wall';

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
  private wall: Wall;
  private loader: Preloader;

  private static firstInstance: Game = null;
  private static gameSpeed: number = -5;

  constructor() {
    this.loader = new Preloader();
    this.initSprites();
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
    console.log(`Loading: ${resource.name} (${resource.url})`);
    console.log(`Progress: ${loader.progress}%`);

    this.loader.update(loader.progress);
  }

  private onSpritesLoaded = (loader, resources): void => {
    console.log('Done loading!');
    // console.log(resources);

    // deconstruct resources
    const { background, plane_sheet } = resources;

    // init objects
    this.initBackgrounds(background);
    this.plane = new Plane(plane_sheet.url);
    this.wall = new Wall();

    // remove preloader overlay
    this.loader.end();
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
