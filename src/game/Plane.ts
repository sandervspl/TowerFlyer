// dependencies
import GameObject from './GameObject';

// animation sprite sheet
const planeSpriteSheet = 'plane.json';
console.log(planeSpriteSheet);

// defines
import { MOVEMENT_TYPE } from './defines';

class Plane extends GameObject {
  constructor() {
    // init game object with position x:0, y:0
    // and make it move only on X-axis with a speed of 5
    super(
      150,
      150,
      MOVEMENT_TYPE.MOVE_X,
      1,
    );

    // load spritesheet
    this.loadSpriteFromSpriteSheet(planeSpriteSheet, 'planeAngle', 5);
  }
}

export default Plane;
