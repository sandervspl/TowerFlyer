// dependencies
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedX implements ISpeedType {
  public speed: Speed2D;

  constructor(x: number) {
    this.speed = new Speed2D(x, 0);
  }

  public set = (x: number): void => {
    if (x === this.speed.x) {
      return;
    }

    this.speed.set(x, 0);
  }

  public get = (): number => this.speed.x;
}

export default SpeedX;
