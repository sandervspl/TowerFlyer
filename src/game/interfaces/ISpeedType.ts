import Speed2D from '../Speed2D';

interface ISpeedType {
  speed: Speed2D;

  update(speedX: number, speedY?: number): void;
}

export default ISpeedType;
