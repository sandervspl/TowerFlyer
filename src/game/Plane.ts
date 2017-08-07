// dependencies
import GameObject from './GameObject';
import App from '../app';
import Game from './Game';
import Hitbox from './Hitbox';

// namespaces
import { env } from '../namespaces/environment';

// defines
import { MOVEMENT_TYPE, DIRECTION } from './defines';

// utils
import Collision from '../utils/Collision';
import Device from '../utils/Device';

class Plane extends GameObject {
  private keyDownInterval: number;

  constructor(spritesheetURL) {
    // init game object with position middle of view renderer
    // and make it move only on X-axis
    super(
      App.getMiddleOfView().x,
      App.getAppSize().height * .25,
      MOVEMENT_TYPE.MOVE_X,
      0,
    );

    // create spritesheet
    this.loadSpriteFromSpriteSheet(spritesheetURL, 'planeAngle', 9, 4);

    // scale up plane
    const scale = Device.isMobile() ? 2 : 3;
    this.getSprite().scale = new PIXI.Point(scale, scale);

    // add key input listeners
    this.addEventListeners();

    this.setHitboxShape(15);

    if (env.shouldDrawHitbox()) {
      new Hitbox(this);
    }
  }

  public die(): void {
    env.log('We hit something!');
    Game.getInstance().setGameOver();
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
    if (!Collision.isInBounds(newX, spriteWidth)) {
      this.setLocation(prevX, y);
    }
  }

  private addEventListeners = (): void => {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchend', this.handleKeyUp);
    window.addEventListener('touchcancel', this.handleKeyUp);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleKeyUp);
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
    if (Game.getInstance().isPaused()) { return; }

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
