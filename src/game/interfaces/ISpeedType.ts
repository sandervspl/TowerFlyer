import ISpeed from './ISpeed2D';

interface ISpeedType {
  speed: ISpeed;

  updateSpeed(speedX: number, speedY?: number): void;
}

export default ISpeedType;
