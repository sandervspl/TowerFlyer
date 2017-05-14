import Location2D from '../Location2D';
import ISpeedType from './ISpeedType';

interface IMoveType {
  location: Location2D;
  speed: ISpeedType;

  setLocation(x: number, y: number): void;
  updateLocation(): void;
}

export default IMoveType;
