// defines
import IMotionType from '../interfaces/IMovementType';
import IPoint2D from '../interfaces/IPoint2D';
import Movement from './Movement';
import SpeedXY from '../speed/SpeedXY';
import Game from '../Game';
import { MOVEMENT_TYPE } from '../defines';

class MovesXY extends Movement implements IMotionType {
  private usesGameSpeed: boolean;

  constructor(posX: number, posY: number, speedX: number, speedY: number, usesGameSpeed: boolean = true) {
    super(MOVEMENT_TYPE.MOVE_XY, posX, posY, new SpeedXY(speedX, speedY));

    this.usesGameSpeed = usesGameSpeed;
  }

  public updateLocation = (): void => {
    const speedX = (this.speed.get() as IPoint2D).x;
    const speedY = this.usesGameSpeed ? Game.getGameSpeed() : this.speed.get() as number;
    const newX = this.location.x + speedX;
    const newY = this.location.y + speedY;

    this.setLocation(newX, newY);
  }
}

export default MovesXY;
