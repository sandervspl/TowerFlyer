import ISpeed from './ISpeed2D';

interface ISpeedType {
  speed: ISpeed;

  update(speedX: number, speedY?: number): void;
}

export default ISpeedType;
