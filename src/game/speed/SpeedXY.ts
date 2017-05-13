// dependencies
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedXY implements ISpeedType {
  public speed: Speed2D;

  constructor(speedX: number, speedY: number) {
    this.speed = new Speed2D(speedX, speedY);
  }

  public update(x: number, y: number): void {
    console.log('Updating speed X & Y');
    console.log(`Current speed: ${this.speed.x}, ${this.speed.y}`);

    this.speed.setSpeed(x, y);

    console.log(`Updated speed: ${this.speed.x}, ${this.speed.y}`);
  }
}

export default SpeedXY;
