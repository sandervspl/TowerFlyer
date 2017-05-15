import ISpeedType from '../interfaces/ISpeedType';
import Location2D from '../Location2D';

class Movement {
  public location: Location2D;
  public speed: ISpeedType;

  constructor(posX: number, posY: number, speedType: ISpeedType) {
    this.location = new Location2D(posX, posY);
    this.speed = speedType;
  }

  public setLocation = (x: number, y: number): void => {
    this.location.set(x, y);
  }
}

export default Movement;
