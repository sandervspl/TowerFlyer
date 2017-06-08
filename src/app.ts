// dependencies
import IPoint2D from './game/interfaces/IPoint2D';
import * as PIXI from 'pixi.js';
import Game from './game/Game';
import _ from 'lodash';

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
  private static pixiApp: PIXI.Application;

  constructor() {
    this.init();
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

  private init = async (): Promise<any> => {
    // create new application with canvas and ticker
    try {
      const appWidth = window.innerWidth;
      const appHeight = (window.innerHeight <= this.maxHeight) ? window.innerHeight : this.maxHeight;

      App.pixiApp = await new PIXI.Application(appWidth, appHeight);

      App.pixiApp.stage.y = (window.innerHeight - appHeight) / 2;

      // add canvas element to DOM
      await document.body.appendChild(App.pixiApp.view);

      if (env.isDebug()) {
        // add FPS display to gameloop
        App.addToGameLoop(this.fpsDisplay);
      }

      // retain pixelation on scaling
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

      // add event listeners
      this.addEventListeners();

      // init game
      Game.getInstance();
    } catch (err) {
      env.log(err);
    }
  }

  private addEventListeners = () => {
    window.addEventListener('resize', _.debounce((e) => {
      e.preventDefault();

      App.pixiApp.renderer.view.width = window.innerWidth;
      App.pixiApp.renderer.view.height = (window.innerHeight <= this.maxHeight) ? window.innerHeight : this.maxHeight;
    }, 500));
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
    App.pixiApp.stage.addChild(this.fpsText);

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
