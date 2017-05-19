// dependencies
import IPoint2D from './interfaces/IPoint2D';

class Point2D {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  public get = (): IPoint2D => ({
    x: this.x,
    y: this.y,
  })

  public set = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
  }

  public setX = (x: number): void => {
    this.x = x;
  }
  public setY = (y: number): void => {
    this.y = y;
  }
}

export default Point2D;
