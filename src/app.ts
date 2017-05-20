// dependencies
import * as PIXI from 'pixi.js';
import Game from './game/Game';
import IPoint2D from './game/interfaces/IPoint2D';
import _ from 'lodash';

class App {
  private static pixiApp: PIXI.Application;

  constructor() {
    this.init();
  }

  private init = async (): Promise<boolean> => {
    // create new application with canvas and ticker
    try {
      App.pixiApp = await new PIXI.Application(
        window.innerWidth,
        window.innerHeight,
      );

      // add canvas element to DOM
      await document.body.appendChild(App.pixiApp.view);

      // retain pixelation on scaling
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

      // add event listeners
      this.addEventListeners();

      // init game
      Game.getInstance();
    } catch (err) {
      console.log(err);

      return false;
    }

    return true;
  }

  private addEventListeners = () => {
    window.addEventListener('resize', _.debounce((e) => {
      e.preventDefault();

      App.pixiApp.renderer.view.width = window.innerWidth;
      App.pixiApp.renderer.view.height = window.innerHeight;
    }, 500));
  }

  public static getView = ():PIXI.Application => App.pixiApp;

  public static getMiddleOfView = (): IPoint2D => ({
    x: App.getView().renderer.width / 2,
    y: App.getView().renderer.height / 2,
  })
}

// start app
new App();

export default App;
