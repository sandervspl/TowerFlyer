import IMotionType from '../interfaces/IMovementType';
import IShape2D from '../interfaces/IShape2D';
import ISpeedType from '../interfaces/ISpeedType';
import Movement from './Movement';

class MovesXY extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speed: ISpeedType) {
    super(posX, posY, speed);
  }

  public updateLocation = (): void => {
    const speed = this.speed.get() as IShape2D;
    const newX = this.location.getX() + speed.x;
    const newY = this.location.getY() + speed.y;

    this.setLocation(newX, newY);
  }
}

export default MovesXY;
