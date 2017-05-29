// defines
import ISpeedType from './ISpeedType';
import Location2D from '../Location2D';
import { MOVEMENT_TYPE } from '../defines';

interface IMovementType {
  location: Location2D;
  speed: ISpeedType;

  setLocation(x: number, y: number): void;
  updateLocation(): void;
  getMovementType(): MOVEMENT_TYPE;
}

export default IMovementType;
