import ISpeedType from '../interfaces/ISpeedType';
import Location2D from '../Location2D';
import App from '../../app';

class Movement {
  public location: Location2D;
  public speed: ISpeedType;

  constructor(posX: number, posY: number, speedType: ISpeedType) {
    this.location = new Location2D(posX, posY);
    this.speed = speedType;
  }

  public setLocation = (x: number, y: number): void => {
    const hasSpeed = this.speed.get() < 0 || this.speed.get() > 0;

    if (this.isInBounds(x, y) && hasSpeed) {
      this.location.set(x, y);
    }
  }

  private isInBounds = (x: number, y: number): boolean => {
    return x > 0 && x < App.getView().renderer.width;
  }
}

export default Movement;
