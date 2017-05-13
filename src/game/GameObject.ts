// dependencies
import ISpeedType from './interfaces/ISpeedType';
import Location2D from './Location2D';

abstract class GameObject {
  private location: Location2D;
  private speedType: ISpeedType;

  constructor(posX: number, posY: number, speedType: ISpeedType) {
    this.location = new Location2D(posX, posY);
    this.speedType = speedType;
  }

  protected updateSpeed(speed: number, speed2?: number): void {
    this.speedType.updateSpeed(speed, speed2);
  }
}

export default GameObject;
