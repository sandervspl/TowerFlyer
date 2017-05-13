class Location2D {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.setLocation(x, y);
  }

  public setLocation(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Location2D;
