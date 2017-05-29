// defines
import IMotionType from '../interfaces/IMovementType';
import Movement from './Movement';
import SpeedY from '../speed/SpeedY';
import Game from '../Game';
import { MOVEMENT_TYPE } from '../defines';

class MovesY extends Movement implements IMotionType {
  private usesGameSpeed: boolean;

  constructor(posX: number, posY: number, speed: number, usesGameSpeed: boolean = true) {
    super(MOVEMENT_TYPE.MOVE_Y, posX, posY, new SpeedY(speed));

    this.usesGameSpeed = usesGameSpeed;
  }

  public updateLocation = (): void => {
    const x = this.location.x;
    const speed = this.usesGameSpeed ? Game.getGameSpeed() : this.speed.get() as number;
    const newY = this.location.y + speed;

    this.setLocation(x, newY);
  }
}

export default MovesY;
