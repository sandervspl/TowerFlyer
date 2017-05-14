// dependencies
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedY implements ISpeedType {
  public speed: Speed2D;

  constructor(y: number) {
    this.speed = new Speed2D(0, y);
  }

  public set = (y: number): void => {
    console.log(`Current speed: ${this.speed.getX()}, ${this.speed.getY()}`);

    console.log('Updating speed Y');
    this.speed.set(0, y);

    console.log(`Updated speed: ${this.speed.getX()}, ${this.speed.getY()}`);
  }

  public get = (): number => this.speed.getY();
}

export default SpeedY;
