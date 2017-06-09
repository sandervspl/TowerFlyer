// dependencies
import ISize2D from './interfaces/ISize2D';
import GameObject from './GameObject';
import App from '../app';
import Game from './Game';

// defines
import { MOVEMENT_TYPE, metersPerPixels } from './defines';

// utils
import Collision from '../utils/Collision';

class DistanceIndicator extends GameObject {
  private distance: number = 0;
  private container: PIXI.Graphics;
  private text: PIXI.Text;
  private size: ISize2D;
  private displayMeterInterval: number = 50;

  constructor() {
    super(
      Collision.getLeftBound(),
      0,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
    );

    this.size = {
      width: App.getAppSize().width,
      height: 40,
    };

    this.init();
    this.loadWithoutSprite();
  }

  public deconstruct(): void {
    super.deconstruct();
    this.container.destroy();
  }

  public draw(): void {
    const { x, y } = this.getLocation();
    const { container } = this;

    container.x = x;
    container.y = y;
  }

  public update(): void {
    super.update();
    this.draw();

    const bottom = this.getLocation().y + this.size.height;
    const viewTop = 0;

    if (bottom < viewTop) {
      this.init(false);
    }
  }

  private init(firstInit: boolean = true): void {
    if (this.container) {
      this.container.destroy();
    }

    const { size } = this;

    // update distance counter
    this.distance += this.displayMeterInterval;

    // draw backdrop rectangle
    this.container = new PIXI.Graphics();
    this.container.beginFill(0x000000, .5);
    this.container.drawRect(0, 0, size.width, size.height);
    this.container.endFill();

    // set initial location
    if (firstInit) {
      this.setLocation(
        this.getLocation().x,
        (App.getMiddleOfView().y + this.size.height) + metersPerPixels * this.displayMeterInterval,
      );
    } else {
      this.setLocation(
        this.getLocation().x,
        (metersPerPixels * this.displayMeterInterval) - this.size.height,
      );
    }

    // set sprite location
    this.container.x = this.getLocation().x;
    this.container.y = this.getLocation().y;

    // set text style
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xFFFFFF,
    });

    // draw text
    this.text = new PIXI.Text(`${this.distance} m`, style);
    this.text.x = size.width / 2;
    this.text.y = size.height / 2;
    this.text.anchor.set(.5);

    // add text to container, container to view
    this.container.addChild(this.text);
    App.addChildToView(this.container);
  }
}

export default DistanceIndicator;
