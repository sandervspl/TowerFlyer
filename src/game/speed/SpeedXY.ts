// dependencies
import IPoint2D from '../interfaces/IPoint2D';
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedXY implements ISpeedType {
  public speed: Speed2D;

  constructor(speedX: number, speedY: number) {
    this.speed = new Speed2D(speedX, speedY);
  }

  public set = (x: number, y: number): void => {
    if (x === this.speed.x && y === this.speed.y) {
      return;
    }

    this.speed.set(x, y);
  }

  public get = (): IPoint2D => this.speed.get();
}

export default SpeedXY;
