// dependencies
import IWallShape from '../interfaces/IWallShape';
import IPoint2D from '../interfaces/IPoint2D';
import WallShape from './WallShape';
import Wall from '../Wall';

class Straight extends WallShape implements IWallShape {
  constructor(wall: Wall) {
    super(wall);

    // save last draw point to Wall for next shape to use
    const drawPoint = this.draw(true) as IPoint2D;
    wall.setLastDrawLocation(drawPoint);
  }

  public draw(init = false): IPoint2D | void {
    const { graphics } = this;
    const { width, height } = this.size;
    const { x, y } = this.getLocation();

    const cornerXDist = 10;
    const cornerYDist = 10;

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

    if (init) {
      return {
        x,
        y: y + height + cornerYDist,
      };
    }
  }

  public update() {
    super.update();
  }
}

export default Straight;
