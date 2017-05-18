import ISpeedType from '../interfaces/ISpeedType';
// import Background from '../Background';
import Location2D from '../Location2D';
import App from '../../app';

class Movement {
  public location: Location2D;
  public speed: ISpeedType;

  constructor(posX: number, posY: number, speedType: ISpeedType) {
    this.location = new Location2D(posX, posY);
    this.speed = speedType;
  }

  public static isInBounds = (x: number, spriteWidth: number): boolean => {
    // const bgWidth = Background.size.width;
    const bgWidth = 677;
    const leftBound = Math.ceil((App.getMiddleOfView().x - (bgWidth / 2)) + (spriteWidth / 2));
    const rightBound = Math.ceil((App.getMiddleOfView().x + (bgWidth / 2)) - (spriteWidth / 2));

    return x > leftBound && x < rightBound;
  }

  public setLocation = (x: number, y: number): void => {
    this.location.set(x, y);
  }
}

export default Movement;
