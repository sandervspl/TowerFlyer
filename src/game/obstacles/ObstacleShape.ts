// dependencies
import ISize2D from '../interfaces/ISize2D';
import ObstacleMgr from '../ObstacleMgr';
import GameObject from '../GameObject';
import App from '../../app';
import Background from '../Background';

// defines
import { DIRECTION, MOVEMENT_TYPE } from '../defines';

abstract class ObstacleShape extends GameObject {
  public obstacleMgr: ObstacleMgr;
  public size: ISize2D;
  public graphics: PIXI.Graphics;

  constructor(obstacleMgr: ObstacleMgr, side: DIRECTION, x: number, y: number, width: number, height: number) {
    super(x, y, MOVEMENT_TYPE.MOVE_Y);

    this.size = { width, height };

    // set x depending on which side we are on
    const newX = side === DIRECTION.LEFT
      ? Background.getLeftBound()
      : Background.getRightBound() - this.size.width;

    this.setLocation(newX, y);

    this.obstacleMgr = obstacleMgr;

    // init graphics drawing
    this.graphics = new PIXI.Graphics();
    App.getView().stage.addChild(this.graphics);
  }

  // start of draw shape
  public startDraw(): void {
    // remove current shape before redrawing
    this.graphics.clear();

    // 3px line width 75% alpha white
    this.graphics.lineStyle(3, 0xFFFFFF, .75);

    // 50% alpha white fill
    this.graphics.beginFill(0xFFFFFF, .3);
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
