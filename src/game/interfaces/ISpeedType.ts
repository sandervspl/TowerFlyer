// dependencies
import Speed2D from '../Speed2D';
import IShape2D from './IShape2D';

interface ISpeedType {
  speed: Speed2D;

  set(speedX: number, speedY?: number): void;
  get(): number | IShape2D;
}

export default ISpeedType;
