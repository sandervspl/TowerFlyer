import IMotionType from '../interfaces/IMovementType';
import ISpeedType from '../interfaces/ISpeedType';
import Movement from './Movement';

class MovesY extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speed: ISpeedType) {
    super(posX, posY, speed);
  }

  public updateLocation = (): void => {
    const speed = this.speed.get() as number;
    const x = this.location.getX();
    const newY = this.location.getY() + speed;

    this.setLocation(x, newY);
  }
}

export default MovesY;
