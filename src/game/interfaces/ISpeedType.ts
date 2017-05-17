// dependencies
import Speed2D from '../Speed2D';
import IPoint2D from './IPoint2D';

interface ISpeedType {
  speed: Speed2D;

  set(speedX: number, speedY?: number): void;
  get(): number | IPoint2D;
}

export default ISpeedType;
