// dependencies
import App from '../../app';
import GameObject from '../GameObject';
import Hitbox from '../Hitbox';
import Game from '../Game';
import Single from '../obstacles/Single';

// defines
import { MOVEMENT_TYPE } from '../defines';

// namespaces
import { env } from '../../namespaces/environment';

class Box extends GameObject {
  private parent: Single;
  private active: boolean;

  public static width: number = 40;

  constructor(x: number, y: number, parent: Single) {
    super(x, y, MOVEMENT_TYPE.MOVE_Y, Game.getGameSpeed());

    this.name = 'powerup_box';

    this.parent = parent;
    this.active = true;

    // create sprite
    const boxImg = Game.getInstance().getResource('box');
    this.loadSprite(boxImg);

    this.setHitboxShape(this.getSprite().width);

    if (env.shouldDrawHitbox()) {
      new Hitbox(this);
    }
  }

  public isActive = (): boolean => this.active;

  public hit() {
    this.active = false;
    this.removeUpdater();
    App.removeChildFromView(this.getSprite());
  }
}

export default Box;
