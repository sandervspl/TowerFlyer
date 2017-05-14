import IMoveType from '../interfaces/IMoveType';
import ISpeedType from '../interfaces/ISpeedType';
import Moves from './Moves';

class MovesX extends Moves implements IMoveType {
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
