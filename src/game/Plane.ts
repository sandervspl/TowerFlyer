// dependencies
import GameObject from './GameObject';
// import MovesX from './movement/MovesX';
// import SpeedX from './speed/SpeedX';

// defines
import { MOVEMENT_TYPE } from './defines';

class Plane extends GameObject {
  constructor() {
    // init game object with position x:0, y:0
    // and make it move only on X-axis with a speed of 5
    // super(new MovesX(0, 0, new SpeedX(5)));
    super(0, 0, MOVEMENT_TYPE.MOVE_XY, 5, 5);

    // update speed to something as a test
    this.setSpeed(10, 5);

    // update location from current location { x: 0, y: 0 }
    // to new location (x: 0, y: 0 + speed: 10)  =  { x: 10, y: 0 }
    // this only updates X because we are only allowed to move on X-Axis
    this.updateLocation();
    // setInterval(this.updateLocation, 1000);

    this.setSpeedY(15);
    this.updateLocation();

    this.setSpeedX(200);
    this.updateLocation();
  }
}

export default Plane;
