// dependencies
import IShape2D from './interfaces/IShape2D';

class Coords2D {
  private x: number = 0;
  private y: number = 0;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  public set = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
  }

  public get = (): IShape2D => ({
    x: this.getX(),
    y: this.getY(),
  })

  public getX = (): number => this.x;
  public getY = (): number => this.y;

  public setX = (speed: number): void => {
    this.set(speed, this.getY());
  }
  public setY = (speed: number): void => {
    this.set(this.getX(), speed);
  }
}

export default Coords2D;
