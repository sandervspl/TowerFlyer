// dependencies
import GameObject from './GameObject';
import SpeedX from './speed/SpeedX';

class Plane extends GameObject {
  constructor() {
    // init game object with position x:0, y:0
    // and make it move only on X-axis with a speed of 5
    super(0, 0, new SpeedX(5));

    // update speed to something as a test
    this.setSpeed(322);
  }
}

export default Plane;
