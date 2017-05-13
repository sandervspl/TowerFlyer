// dependencies
import GameObject from './GameObject';
import SpeedX from './speed/SpeedX';

class Plane extends GameObject {
  constructor() {
    super(0, 0, new SpeedX(5));
    this.updateSpeed(322);
  }
}

export default Plane;
