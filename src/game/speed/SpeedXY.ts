// dependencies
import IShape2D from '../interfaces/IShape2D';
import ISpeedType from '../interfaces/ISpeedType';
import Speed2D from '../Speed2D';

class SpeedXY implements ISpeedType {
  public speed: Speed2D;

  constructor(speedX: number, speedY: number) {
    this.speed = new Speed2D(speedX, speedY);
  }

  public set = (x: number, y: number): void => {
    console.log(`Current speed: ${this.speed.getX()}, ${this.speed.getY()}`);

    console.log('Updating speed X & Y');
    this.speed.set(x, y);

    console.log(`Updated speed: ${this.speed.getX()}, ${this.speed.getY()}`);
  }

  public get = (): IShape2D => ({
    x: this.speed.getX(),
    y: this.speed.getY(),
  })
}

export default SpeedXY;
