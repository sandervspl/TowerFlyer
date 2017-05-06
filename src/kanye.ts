// dependencies
import * as PIXI from 'pixi.js';
import App from './app';

// assets
const kanyeFace = require('./assets/images/kanye.png');

class Kanye {
  private face: PIXI.Sprite;

  constructor() {
    // create loader for image
    const spriteLoader = PIXI.loader.add('kanye', kanyeFace);

    // load hook
    spriteLoader.load(this.handleLoad);
  }

  private handleLoad = (loader, resources):void => {
    // grab canvas reference
    const view = App.getView();

    // create new sprite and save to instance
    this.face = new PIXI.Sprite(resources.kanye.texture);

    // position in middle of screen
    this.face.x = view.renderer.width / 2;
    this.face.y = view.renderer.height / 2;

    // set anchor point of both x & y to the middle
    // this makes it rotate from the middle
    this.face.anchor.set(.5);

    // add to stage
    view.stage.addChild(this.face);

    // rotate face on every update tick (should be 60 times per second (60 FPS))
    view.ticker.add(() => {
      this.face.rotation += .01;
    });
  }
}

export default Kanye;
