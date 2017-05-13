class Speed2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.setSpeed(x, y);
  }

  public setSpeed(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

export default Speed2D;
