// dependencies
import ISize2D from '../interfaces/ISize2D';
import Game from '../Game';
import Wall from '../Wall';
import GameObject from '../GameObject';
import { MOVEMENT_TYPE } from '../defines';
import App from '../../app';

abstract class WallShape extends GameObject {
  public wall: Wall;
  public size: ISize2D;
  public graphics: PIXI.Graphics;

  constructor(wall: Wall) {
    super(
      wall.getLastDrawLocation().x,
      wall.getLastDrawLocation().y,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
    );

    this.wall = wall;
    this.size = {
      width: 150,
      height: 750,
    };

    // init graphics drawing
    this.graphics = new PIXI.Graphics();
    App.getView().stage.addChild(this.graphics);
  }

  // start of draw shape
  public startDraw(): void {
    // remove current shape before redrawing
    this.graphics.clear();

    // 50% alpha white fill
    this.graphics.beginFill(0xFFFFFF, .5);

    // 5px line width 75% alpha white
    this.graphics.lineStyle(5, 0xFFFFFF, .75);
  }

  // drawings end with this
  public endDraw(): void {
    this.graphics.endFill();
  }

  public update(): void {
    super.update();
    this.startDraw();
    this.draw();
    this.endDraw();

    const bottom = this.getLocation().y + this.size.height;
    const viewTop = 0;

    if (bottom < viewTop) {
      this.graphics.clear();
      this.wall.removeShapeFromArray();
    }
  }
}

export default WallShape;
