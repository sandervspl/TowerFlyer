// defines
import ISpeedType from '../interfaces/ISpeedType';
import Location2D from '../Location2D';
import { MOVEMENT_TYPE } from '../defines';

abstract class Movement {
  public location: Location2D;
  public speed: ISpeedType;
  private movementType: MOVEMENT_TYPE;

  constructor(movementType: MOVEMENT_TYPE, posX: number, posY: number, speedType: ISpeedType) {
    this.location = new Location2D(posX, posY);
    this.speed = speedType;
    this.movementType = movementType;
  }

  public setLocation = (x: number, y: number): void => {
    this.location.set(x, y);
  }

  public getMovementType = (): MOVEMENT_TYPE => this.movementType;
}

export default Movement;
