// dependencies
import * as PIXI from 'pixi.js';
import Kanye from './kanye';

class App {
  private static pixiApp: PIXI.Application;

  constructor() {
    // create new application with canvas and ticker
    App.pixiApp = new PIXI.Application(
      window.innerWidth,
      window.innerHeight,
    );

    // add canvas element to DOM
    document.body.appendChild(App.pixiApp.view);

    // create kanye face
    new Kanye();
  }

  public static getView = ():PIXI.Application => App.pixiApp;
}

// start app
new App();

export default App;
