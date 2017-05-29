// defines
import IMotionType from '../interfaces/IMovementType';
import Movement from './Movement';
import SpeedX from '../speed/SpeedX';
import { MOVEMENT_TYPE } from '../defines';

class MovesX extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speed: number) {
    super(MOVEMENT_TYPE.MOVE_X, posX, posY, new SpeedX(speed));
  }

  public updateLocation = (): void => {
    const y = this.location.y;
    const speed = this.speed.get() as number;
    const newX = this.location.x + speed;

    this.setLocation(newX, y);
  }
}

export default MovesX;
