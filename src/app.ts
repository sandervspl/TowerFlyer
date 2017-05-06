// dependencies
import * as PIXI from 'pixi.js';

// assets
const kanyeFace = require('./assets/images/kanye.png');

// create new application
const app = new PIXI.Application();

// create canvas element
document.body.appendChild(app.view);

PIXI.loader.add('kanye', kanyeFace).load((loader, resources) => {
  const kanye = new PIXI.Sprite(resources.kanye.texture);

  kanye.x = app.renderer.width / 2;
  kanye.y = app.renderer.height / 2;

  kanye.anchor.x = .5;
  kanye.anchor.y = .5;

  app.stage.addChild(kanye);

  app.ticker.add(() => {
    kanye.rotation += .01;
  });
});
