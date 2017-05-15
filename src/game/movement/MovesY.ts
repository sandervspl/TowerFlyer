import IMotionType from '../interfaces/IMovementType';
import Movement from './Movement';
import SpeedY from '../speed/SpeedY';

class MovesY extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speed: number) {
    super(posX, posY, new SpeedY(speed));
  }

  public updateLocation = (): void => {
    const speed = this.speed.get() as number;
    const x = this.location.getX();
    const newY = this.location.getY() + speed;

    this.setLocation(x, newY);
  }
}

export default MovesY;
