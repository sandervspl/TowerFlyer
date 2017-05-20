// dependencies
import * as PIXI from 'pixi.js';
import App from '../app';
import GameObject from './GameObject';
import Game from './Game';
import Background from './Background';
import { MOVEMENT_TYPE } from './defines';

class Wall extends GameObject {
  private graphics: PIXI.Graphics;

  constructor() {
    super(
      Background.getLeftBound(),
      App.getView().renderer.height,
      MOVEMENT_TYPE.MOVE_Y,
      0,
      Game.getGameSpeed(),
      false,
    );

    this.graphics = new PIXI.Graphics();
    App.getView().stage.addChild(this.graphics);
    this.loadWithoutSprite();
  }

  // draw shapes with rounded corners
  // more info: https://www.toptal.com/c-plus-plus/rounded-corners-bezier-curves-qpainter
  protected draw = (): void => {
    const { graphics } = this;
    const { x, y } = this.getLocation();

    // remove current shape before redrawing
    graphics.clear();

    // 50% alpha white fill
    graphics.beginFill(0xFFFFFF, .5);

    // 5px line width 75% alpha white
    graphics.lineStyle(5, 0xFFFFFF, .75);

    const width = 200;
    const height = 300;
    const cornerXDist = 10;
    const cornerYDist = 15;

    // start pos
    graphics.moveTo(
      x,
      y,
    );

    // horizontal line
    graphics.lineTo(
      x + width,
      y,
    );

    // corner top right
    graphics.bezierCurveTo(
      x + width,
      y,

      x + width + cornerXDist,
      y,

      x + width + cornerXDist,
      y + cornerYDist,
    );

    // vertical line
    graphics.lineTo(
      x + width + cornerXDist,
      y + height,
    );

    // corner bottom right
    graphics.bezierCurveTo(
      x + width + cornerXDist,
      y + height,

      x + width + cornerXDist,
      y + height + cornerYDist,

      x + width,
      y + height + cornerYDist,
    );

    // horizontal line and end pos
    graphics.lineTo(
      x,
      y + height + cornerYDist,
    );
    graphics.endFill();
  }

  protected update(): void {
    super.update();
    this.draw();
  }
}

export default Wall;
