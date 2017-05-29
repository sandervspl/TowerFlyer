// dependencies
import ISize2D from '../interfaces/ISize2D';
import ObstacleMgr from '../ObstacleMgr';
import GameObject from '../GameObject';
import App from '../../app';
import Background from '../Background';
import Hitbox from '../Hitbox';

// defines
import { DIRECTION, MOVEMENT_TYPE } from '../defines';

// namespaces
import { env } from '../../namespaces/environment';

abstract class ObstacleShape extends GameObject {
  public obstacleMgr: ObstacleMgr;
  public size: ISize2D;
  public graphics: PIXI.Graphics;

  private style = {
    lineWidth: 3,
    lineColor: 0xFFFFFF,
    lineAlpha: .75,
    fillColor: 0xFFFFFF,
    fillAlpha: .3,
  };

  constructor(
    obstacleMgr: ObstacleMgr, side: DIRECTION, x: number, y: number,
    width: number, height: number, movementType: MOVEMENT_TYPE, speed1: number, speed2?: number,
  ) {
    super(x, y, movementType, speed1, speed2);

    this.size = { width, height };

    // set x depending on which side we are on
    const newX = side === DIRECTION.LEFT
      ? Background.getLeftBound()
      : Background.getRightBound() - this.size.width - this.style.lineWidth;

    this.setLocation(newX, y);

    this.obstacleMgr = obstacleMgr;

    // init graphics drawing
    this.graphics = new PIXI.Graphics();
    App.getView().stage.addChild(this.graphics);

    if (env.shouldDrawHitbox()) {
      new Hitbox(this, speed1, speed2);
    }
  }

  // start of draw shape
  public startDraw(): void {
    // remove current shape before redrawing
    this.graphics.clear();

    // base shape styling
    const { lineWidth, lineColor, lineAlpha, fillColor, fillAlpha } = this.style;

    // 3px line width 75% alpha white
    this.graphics.lineStyle(lineWidth, lineColor, lineAlpha);

    // 50% alpha white fill
    this.graphics.beginFill(fillColor, fillAlpha);
  }

  // drawings end with this
  public endDraw(): void {
    this.graphics.endFill();
  }

  public update(): void {
    // update location
    super.update();

    // drawing process
    this.startDraw();
    this.draw();    // this is handled by each individual shape class
    this.endDraw();
  }
}

export default ObstacleShape;
