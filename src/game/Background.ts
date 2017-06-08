// dependencies
import ISize2D from './interfaces/ISize2D';
import GameObject from './GameObject';
import App from '../app';
import Game from './Game';
import _ from 'lodash';

// defines
import { MOVEMENT_TYPE } from './defines';

class Background extends GameObject {
  public static size: ISize2D = { width: 0, height: 0 };

  public static setSize = _.once((spriteResource) => {
    Background.size.height = spriteResource.texture.baseTexture.height;
    Background.size.width = spriteResource.texture.baseTexture.width;
  });

  constructor(id: number, spriteResource) {
    super(
      App.getMiddleOfView().x,
      0,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
    );

    // properly position background
    this.setInitLocation(id);

    // load sprite to view
    this.loadSprite(spriteResource.url);
  }

  protected updateLocation(): void {
    super.updateLocation();

    const game = Game.getInstance();
    const x = this.getLocation().x;
    const y = this.getLocation().y;
    const spriteHeight = this.getSprite().height;
    const bottomSprite = y + spriteHeight / 2;
    const screenTop = 0;

    // move sprite below last bg
    if (bottomSprite <= screenTop) {
      const bgs = game.getBackgrounds();
      const lastBg = bgs[bgs.length - 1];
      const newY = lastBg.getLocation().y + Background.size.height + (this.getSpeed() as number);

      this.setLocation(x, newY);

      // push first index to last index
      bgs.push(bgs.shift());
    }
  }

  protected setInitLocation = (id: number): void => {
    const y = this.getLocation().y + Background.size.height * id;
    this.setLocation(this.getLocation().x, y);
  }
}

export default Background;
