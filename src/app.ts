// dependencies
import { Application } from 'pixi.js';
import Game from './game/Game';

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

    // init game
    new Game();
  }

  public static getView = ():Application => App.pixiApp;
}

// start app
new App();

export default App;
