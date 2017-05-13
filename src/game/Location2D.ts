class Location2D {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  public set = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  }
}

export default Location2D;
