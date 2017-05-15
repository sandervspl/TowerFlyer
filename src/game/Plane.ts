// dependencies
import GameObject from './GameObject';
import * as PIXI from 'pixi.js';

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

    PIXI.loader
      .add(planeSpriteSheet)
      .load(() => this.loadSpriteFromSpriteSheet('planeAngle'));

    setInterval(this.updateLocation, 250);
  }
}

export default Plane;
