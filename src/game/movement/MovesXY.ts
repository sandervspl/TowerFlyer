import IMotionType from '../interfaces/IMovementType';
import IShape2D from '../interfaces/IShape2D';
import Movement from './Movement';
import SpeedXY from '../speed/SpeedXY';

class MovesXY extends Movement implements IMotionType {
  constructor(posX: number, posY: number, speedX: number, speedY: number) {
    super(posX, posY, new SpeedXY(speedX, speedY));
  }

  public updateLocation = (): void => {
    const speed = this.speed.get() as IShape2D;
    const newX = this.location.x + speed.x;
    const newY = this.location.y + speed.y;

    this.setLocation(newX, newY);
  }
}

export default MovesXY;
