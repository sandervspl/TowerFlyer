import IMotionType from '../interfaces/IMovementType';
import ISpeedType from '../interfaces/ISpeedType';
import Movement from './Movement';

class MovesX extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speed: ISpeedType) {
    super(posX, posY, speed);
  }

  public updateLocation = (): void => {
    const speed = this.speed.get() as number;
    const newX = this.location.getX() + speed;
    const y = this.location.getY();

    this.setLocation(newX, y);
  }
}

export default MovesX;
