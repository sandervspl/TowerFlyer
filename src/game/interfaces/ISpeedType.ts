import Speed2D from '../Speed2D';

interface ISpeedType {
  speed: Speed2D;

  set(speedX: number, speedY?: number): void;
}

export default ISpeedType;
