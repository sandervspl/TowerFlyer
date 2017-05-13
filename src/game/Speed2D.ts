class Speed2D {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  public set = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
  }

  public getX = (): number => this.x;

  public getY = (): number => this.y;
}

export default Speed2D;
