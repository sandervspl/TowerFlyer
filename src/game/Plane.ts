// dependencies
import GameObject from './GameObject';
import App from '../app';
import Game from './Game';
import Background from './Background';
import Hitbox from './Hitbox';

// namespaces
import { env } from '../namespaces/environment';

// defines
import { MOVEMENT_TYPE, DIRECTION } from './defines';

class Plane extends GameObject {
  private keyDownInterval: number;

  constructor(spritesheetURL) {
    // init game object with position middle of view renderer
    // and make it move only on X-axis
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

    this.setHitboxShape(20);

    if (env.shouldDrawHitbox()) {
      new Hitbox(this);
    }
  }

  public die(): void {
    env.log('We hit something!');
    App.getView().ticker.stop();
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
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchend', this.handleKeyUp);
    window.addEventListener('touchcancel', this.handleKeyUp);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('onblur', this.handleKeyUp);
  }

  private handleKeyDown = (e): void => {
    const key = (e || window.event).keyCode;

    switch (key) {
      case 65: // a
      case 37: // left arrow
        if (!this.keyDownInterval) {
          this.turn(DIRECTION.LEFT); // if this is not here then a press shorter than 100ms will not register a turn
          this.keyDownInterval = Number(setInterval(() => this.turn(DIRECTION.LEFT), 100));
        }
        break;

      case 68: // d
      case 39: // right arrow
        if (!this.keyDownInterval) {
          this.turn(DIRECTION.RIGHT); // if this is not here then a press shorter than 100ms will not register a turn
          this.keyDownInterval = Number(setInterval(() => this.turn(DIRECTION.RIGHT), 100));
        }
        break;

      default: break;
    }
  }

  private handleKeyUp = (): void => {
    clearInterval(this.keyDownInterval);
    this.keyDownInterval = null;
  }

  private handleTouchStart = (e): void => {
    const touchX = e.changedTouches[0].pageX;

    if (!this.keyDownInterval) {
      if (touchX < App.getMiddleOfView().x) {
        this.turn(DIRECTION.LEFT);
        this.keyDownInterval = Number(setInterval(() => this.turn(DIRECTION.LEFT), 100));
      } else {
        this.turn(DIRECTION.RIGHT);
        this.keyDownInterval = Number(setInterval(() => this.turn(DIRECTION.RIGHT), 100));
      }
    }
  }

  private turn = (direction: DIRECTION): void => {
    // env.log(`Turning ${direction === 0 ? 'left' : 'right'}.`);
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
