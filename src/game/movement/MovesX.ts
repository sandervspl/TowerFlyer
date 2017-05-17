import IMotionType from '../interfaces/IMovementType';
import Movement from './Movement';
import SpeedX from '../speed/SpeedX';

class MovesX extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speed: number) {
    super(posX, posY, new SpeedX(speed));
  }

  public updateLocation = (): void => {
    const speed = this.speed.get() as number;
    const newX = this.location.x + speed;
    const y = this.location.y;

    this.setLocation(newX, y);
  }
}

export default MovesX;
