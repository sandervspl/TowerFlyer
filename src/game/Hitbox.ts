// dependencies
import IPoint2D from './interfaces/IPoint2D';
import App from '../app';
import GameObject from './GameObject';
import ObstacleShape from './obstacles/ObstacleShape';

class Hitbox extends GameObject {
  private parentObject: GameObject;
  private graphics: PIXI.Graphics;
  private style = {
    lineWidth: 3,
    lineColor: 0x9A2EFE,  // purple
    lineAlpha: .75,
    fillColor: 0x9A2EFE,
    fillAlpha: .3,
  };

  constructor(go: GameObject | ObstacleShape, speed1?: number, speed2?: number) {
    super(
      go.getLocation().x,
      go.getLocation().y,
      go.getMovementType(),
      speed1 || (go.getSpeed() as IPoint2D).x,
      speed2 || (go.getSpeed() as IPoint2D).y,
    );

    this.parentObject = go;

    this.graphics = new PIXI.Graphics();
    App.addChildToView(this.graphics);

    this.loadWithoutSprite();
  }

  public deconstruct(): void {
    this.removeUpdater();
    // this.graphics.destroy();
  }

  public draw(): void {
    // remove current shape before redrawing
    this.graphics.clear();

    // base shape styling
    const { lineWidth, lineColor, lineAlpha, fillColor, fillAlpha } = this.style;

    this.graphics.lineStyle(lineWidth, lineColor, lineAlpha);
    this.graphics.beginFill(fillColor, fillAlpha);

    let width;
    let height;
    let realX;
    let realY;

    // get current location
    const { x, y } = this.parentObject.getLocation();

    // check if we are working with a sprite or pixi graphic
    const sprite = this.parentObject.getSprite();

    // get custom shape if it's available
    const customShape = this.parentObject.getHitboxShape();

    if (sprite) {
      if (customShape) {
        width = customShape.width;
        height = customShape.height;
      } else {
        width = sprite.width;
        height = sprite.height;
      }

      realX = x - width / 2;
      realY = y - height / 2;
    } else {
      const shape = (this.parentObject as ObstacleShape);

      if (customShape) {
        width = customShape.width;
        height = customShape.height;
        realX = shape.getLocation().x + (shape.size.width / 2 - width / 2);
        realY = shape.getLocation().y + (shape.size.height / 2 - height / 2);
      } else {
        width = shape.size.width;
        height = shape.size.height;
        realX = shape.getLocation().x;
        realY = shape.getLocation().y;
      }
    }

    // draw rectangle as rectangular shape
    this.graphics.drawRect(realX, realY, width, height);
    this.graphics.endFill();
  }

  public update(): void {
    // update location
    if (this.parentObject instanceof GameObject && !(this.parentObject instanceof ObstacleShape)) {
      super.update();
    }

    if (this.parentObject instanceof ObstacleShape) {
      this.updateLocation();
    }

    this.draw();
  }
}

export default Hitbox;
