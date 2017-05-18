// dependencies
import App from '../app';
import Game from './Game';
import GameObject from './GameObject';
import { MOVEMENT_TYPE } from './defines';

// sprite
const backgroundSprite = 'assets/images/background.png';

class Background extends GameObject {
  private id: number;

  private static height: number = 320;

  constructor(id: number) {
    super(
      App.getMiddleOfView().x,
      0,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
    );

    this.id = id;

    // load spritesheet
    this.loadSprite(backgroundSprite);

    // properly position background
    this.setInitLocation();
  }

  public static getHeight = (): number => Background.height;

  protected updateLocation(): void {
    super.updateLocation();

    const game = Game.getInstance();
    const x = this.getLocation().x;
    const y = this.getLocation().y;
    const spriteHeight = this.sprite.height;
    const bottomSprite = y + spriteHeight / 2;
    const screenTop = 0;

    // move sprite below last bg
    if (bottomSprite <= screenTop) {
      const bgs = game.getBackgrounds();
      const lastBg = bgs[bgs.length - 1];
      const newY = lastBg.getLocation().y + Background.height + (this.getSpeed() as number);

      this.setLocation(x, newY);

      // push first index to last index
      bgs.push(bgs.shift());
    }
  }

  protected setInitLocation = (): void => {
    const y = this.getLocation().y + Background.height * this.id;
    this.setLocation(this.getLocation().x, y);
  }
}

export default Background;
