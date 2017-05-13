import ISpeed2D from './ISpeed2D';

interface ISpeedType {
  speed: ISpeed2D;

  update(speedX: number, speedY?: number): void;
}

export default ISpeedType;
