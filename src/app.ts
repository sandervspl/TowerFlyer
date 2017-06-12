// dependencies
import IPoint2D from './game/interfaces/IPoint2D';
import ISize2D from './game/interfaces/ISize2D';
import * as PIXI from 'pixi.js';
import Game from './game/Game';
import Pause from './game/views/Pause';

// namespaces
import { env } from './namespaces/environment';
import TfMath from './utils/TfMath';

// styles
import './game/style/style.styl';

class App {
  private fpsText: PIXI.Text;
  private fpsLow: number = 1000;
  private fpsHigh: number = 0;
  private fpsAvg: number[] = [];
  private maxHeight: number = 1000;
  private maxWidth: number = 677;
  private gamePaused: boolean = false;
  private static pixiApp: PIXI.Application;
  private static appSize: ISize2D;

  constructor() {
    this.init();

    // add event listeners
    this.addEventListeners();
  }

  public static getView = ():PIXI.Application => App.pixiApp;

  public static getMiddleOfView = (): IPoint2D => ({
    x: App.getView().renderer.width / 2,
    y: App.getView().renderer.height / 2,
  })

  public static addChildToView(child: any) {
    App.getView().stage.addChild(child);
  }

  public static addToGameLoop(updater: () => void) {
    App.getView().ticker.add(updater);
  }

  public static removeFromGameLoop(updater: () => void) {
    App.getView().ticker.remove(updater);
  }

  public static getAppSize(): ISize2D {
    return App.appSize;
  }

  private init = (): void => {
    App.appSize = {
      width: window.innerWidth > this.maxWidth ? this.maxWidth : window.innerWidth,
      height: window.innerHeight > this.maxHeight ? this.maxHeight : window.innerHeight,
    };

    // create new application with canvas and ticker
    if (App.pixiApp) {
      document.body.removeChild(App.pixiApp.view);
    }

    App.pixiApp = new PIXI.Application(App.appSize.width, App.appSize.height);

    // add canvas element to DOM
    document.body.appendChild(App.pixiApp.view);

    if (env.shouldShowFPS()) {
      // add FPS display to gameloop
      App.addToGameLoop(this.fpsDisplay);
    }

    // retain pixelation on scaling
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // initialize game
    Game.getInstance().init();
  }

  private addEventListeners = () => {
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('blur', this.pauseGame);

    const restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', this.resetApp);

    const resumeBtn = document.querySelector('#resume');
    resumeBtn.addEventListener('click', this.togglePause);
  }

  private keydown = (e): void => {
    switch (e.keyCode) {
      case 80: this.togglePause(); break;
      case 82: this.init(); break;
      default: break;
    }
  }

  private resetApp = (): void => {
    this.init();
  }

  private togglePause = (): void => {
    if (Game.getInstance().isGameOver()) { return; }

    if (this.gamePaused) {
      this.resumeGame();
      Pause.hide();
    } else {
      this.pauseGame();
      Pause.show();
    }
  }

  private pauseGame = (): void => {
    App.getView().ticker.stop();
    this.gamePaused = true;

    env.log('Game paused.');
  }

  private resumeGame = (): void => {
    App.getView().ticker.start();
    this.gamePaused = false;

    env.log('Resuming game.');
  }

  private fpsDisplay = () => {
    // reset
    if (this.fpsText) {
      this.fpsText.destroy();
    }

    // math thingies
    const avg = TfMath.getAverageOfArray(this.fpsAvg).toFixed(3);
    const median = TfMath.getMedianOfArray(this.fpsAvg);

    // grab FPS and set/style its text
    const fps = Number(App.pixiApp.ticker.FPS.toFixed(3));
    this.fpsText = new PIXI.Text(`fps: ${fps}\nlow: ${this.fpsLow}\nhigh: ${this.fpsHigh}\navg: ${avg}\nmed: ${median}`,
      {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xFFFFFF,
      },
    );

    this.fpsText.x = 20;
    this.fpsText.y = 50;

    // add to view
    App.addChildToView(this.fpsText);

    // set min/max fps
    if (fps < this.fpsLow) { this.fpsLow = fps; }
    if (fps > this.fpsHigh) { this.fpsHigh = fps; }

    // limit fpsAvg array size to 100 indexes
    if (this.fpsAvg.length > 10) { this.fpsAvg.shift(); }
    this.fpsAvg.push(fps);
  }
}

// start app
new App();

export default App;
