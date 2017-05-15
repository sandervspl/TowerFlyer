// dependencies
import { Application } from 'pixi.js';
import Game from './game/Game';
import _ from 'lodash';

class App {
  private static pixiApp: Application;

  constructor() {
    // create new application with canvas and ticker
    App.pixiApp = new Application(
      window.innerWidth,
      window.innerHeight,
    );

    // add canvas element to DOM
    document.body.appendChild(App.pixiApp.view);

    // add event listeners
    this.addEventListeners();

    // init game
    Game.getInstance();
  }

  private addEventListeners = () => {
    window.addEventListener('resize', _.debounce((e) => {
      e.preventDefault();

      App.pixiApp.renderer.view.width = window.innerWidth;
      App.pixiApp.renderer.view.height = window.innerHeight;
    }, 500));
  }

  public static getView = ():Application => App.pixiApp;
}

// start app
new App();

export default App;
