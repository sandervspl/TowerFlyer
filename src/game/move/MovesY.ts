import IMoveType from '../interfaces/IMoveType';
import ISpeedType from '../interfaces/ISpeedType';
import Moves from './Moves';

class MovesY extends Moves implements IMoveType {
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
