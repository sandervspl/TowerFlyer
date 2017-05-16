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
      0,
    );

    // load spritesheet
    this.loadSpriteFromSpriteSheet(planeSpriteSheet, 'planeAngle', 9, 4);

    // add key input listeners
    this.addEventListeners();
  }

  private addEventListeners = (): void => {
    window.addEventListener('keydown', (e) => this.keyboardInput(e));
  }

  private keyboardInput = (e): void => {
    switch (e.keyCode) {
      case 65:
      case 37:
        this.setSpeed(-3);
        this.changeSpriteFrame(-1);
        break;

      case 68:
      case 39:
        this.setSpeed(3);
        this.changeSpriteFrame(1);
        break;

      default: return null;
    }
  }
}

export default Plane;
