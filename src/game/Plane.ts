// dependencies
import GameObject from './GameObject';
import App from '../app';
import Game from './Game';
import Background from './Background';

// defines
import { MOVEMENT_TYPE, DIRECTION } from './defines';

class Plane extends GameObject {
  constructor(spritesheetURL) {
    // init game object with position middle of view renderer
    // and make it move only on X-axis with a speed of 1
    super(
      App.getMiddleOfView().x,
      App.getMiddleOfView().y,
      MOVEMENT_TYPE.MOVE_X,
      0,
    );

    // load spritesheet
    this.loadSpriteFromSpriteSheet(spritesheetURL, 'planeAngle', 9, 4);

    // add key input listeners
    this.addEventListeners();
  }

  protected updateLocation(): void {
    // save current x location
    const prevX = this.getLocation().x;

    // update location
    super.updateLocation();

    const spriteWidth = this.getSprite().width;
    const newX = this.getLocation().x;
    const y = this.getLocation().y;

    // if we are out of bounds on the X-axis then we reset to previous location
    if (!Background.isInBounds(newX, spriteWidth)) {
      this.setLocation(prevX, y);
    }
  }

  private addEventListeners = (): void => {
    window.addEventListener('keydown', (e) => this.keyboardInput(e));
  }

  private keyboardInput = (e): void => {
    switch (e.keyCode) {
      case 65: // a
      case 37: // left arrow
        this.turn(DIRECTION.LEFT);
        break;

      case 68: // d
      case 39: // right arrow
        this.turn(DIRECTION.RIGHT);
        break;

      default: return null;
    }
  }

  private turn = (direction: DIRECTION): void => {
    const directionChange: number = direction === DIRECTION.LEFT ? -1 : 1;

    // change plane sprite
    const frame: number = this.changeSpriteFrame(directionChange);

    // change speed according to new plane angle/sprite
    switch (frame) {
      case 0: this.setSpeed(-5); Game.setGameSpeed(-1); break;
      case 1: this.setSpeed(-4); Game.setGameSpeed(-2); break;
      case 2: this.setSpeed(-2); Game.setGameSpeed(-3); break;
      case 3: this.setSpeed(-1); Game.setGameSpeed(-4); break;
      case 4: this.setSpeed(0);  Game.setGameSpeed(-5); break;
      case 5: this.setSpeed(1);  Game.setGameSpeed(-4); break;
      case 6: this.setSpeed(2);  Game.setGameSpeed(-3); break;
      case 7: this.setSpeed(4);  Game.setGameSpeed(-2); break;
      case 8: this.setSpeed(5);  Game.setGameSpeed(-1); break;
      default: this.setSpeed(0); Game.setGameSpeed(-5); break;
    }
  }
}

export default Plane;
