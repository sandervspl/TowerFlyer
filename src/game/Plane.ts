// dependencies
import GameObject from './GameObject';
import App from '../app';

// animation sprite sheet
const planeSpriteSheet = 'assets/spriteSheets/plane/plane.json';

// defines
import { MOVEMENT_TYPE } from './defines';

class Plane extends GameObject {
  constructor() {
    // init game object with position x:0, y:0
    // and make it move only on X-axis with a speed of 5
    super(
      App.getView().renderer.width / 2,
      App.getView().renderer.height / 2,
      MOVEMENT_TYPE.MOVE_X,
      1,
    );

    // load spritesheet
    this.loadSpriteFromSpriteSheet(planeSpriteSheet, 'planeAngle', 5);
  }
}

export default Plane;
