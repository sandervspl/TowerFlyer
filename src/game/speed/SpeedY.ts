// dependencies
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedY implements ISpeedType {
  public speed: Speed2D;

  constructor(y: number) {
    this.speed = new Speed2D(0, y);
  }

  public set = (y: number): void => {
    if (y === this.speed.y) {
      return;
    }

    this.speed.set(0, y);
  }

  public get = (): number => this.speed.y;
}

export default SpeedY;
