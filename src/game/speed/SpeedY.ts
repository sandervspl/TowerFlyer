// dependencies
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedY implements ISpeedType {
  public speed: Speed2D;

  constructor(y: number) {
    this.speed = new Speed2D(0, y);
  }

  public updateSpeed(y: number): void {
    console.log('Updating speed Y');
    console.log(`Current speed: ${this.speed.x}, ${this.speed.y}`);

    this.speed.setSpeed(0, y);

    console.log(`Updated speed: ${this.speed.x}, ${this.speed.y}`);
  }
}

export default SpeedY;
