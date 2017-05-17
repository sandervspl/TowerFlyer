// dependencies
import IPoint2D from './interfaces/IPoint2D';

class Coords2D {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  public set = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
  }

  public get = (): IPoint2D => ({
    x: this.x,
    y: this.y,
  })

  public setX = (speed: number): void => {
    this.x = speed;
  }
  public setY = (speed: number): void => {
    this.y = speed;
  }
}

export default Coords2D;
