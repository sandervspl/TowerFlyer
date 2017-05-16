// dependencies
import GameObject from './GameObject';
import App from '../app';

// animation sprite sheet
const planeSpriteSheet = 'assets/spriteSheets/plane/plane.json';

// defines
import { MOVEMENT_TYPE } from './defines';

class Plane extends GameObject {
  constructor() {
    // init game object with position middle of view renderer
    // and make it move only on X-axis with a speed of 1
    super(
      App.getMiddleOfView().x,
      App.getMiddleOfView().y,
      MOVEMENT_TYPE.MOVE_X,
      1,
    );

    // load spritesheet
    this.loadSpriteFromSpriteSheet(planeSpriteSheet, 'planeAngle', 9);
  }
}

export default Plane;
