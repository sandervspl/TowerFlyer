// dependencies
import GameObject from './GameObject';
import App from '../app';
import Game from './Game';
import Movement from './movement/Movement';

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
    const prevX = this.getLocation().x;

    super.updateLocation();

    const spriteWidth = this.getSprite().width;
    const newX = this.getLocation().x;
    const y = this.getLocation().y;

    if (!Movement.isInBounds(newX, spriteWidth)) {
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
    let speed: number = 0;

    // change plane sprite
    const frame: number = this.changeSpriteFrame(directionChange);

    // change speed according to plane angle/sprite
    switch (frame) {
      case 0: speed = -5; Game.setGameSpeed(-1); break;
      case 1: speed = -4; Game.setGameSpeed(-2); break;
      case 2: speed = -2; Game.setGameSpeed(-3); break;
      case 3: speed = -1; Game.setGameSpeed(-4); break;
      case 4: speed = 0;  Game.setGameSpeed(-5); break;
      case 5: speed = 1;  Game.setGameSpeed(-4); break;
      case 6: speed = 2;  Game.setGameSpeed(-3); break;
      case 7: speed = 4;  Game.setGameSpeed(-2); break;
      case 8: speed = 5;  Game.setGameSpeed(-1); break;
      default: speed = 0; Game.setGameSpeed(-5); break;
    }

    // update speed
    this.setSpeed(speed);
  }
}

export default Plane;
