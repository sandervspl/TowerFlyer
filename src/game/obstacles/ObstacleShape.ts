// dependencies
import ISize2D from '../interfaces/ISize2D';
import IObserver from '../interfaces/IObserver';
import ObstacleMgr from '../ObstacleMgr';
import GameObject from '../GameObject';
import App from '../../app';
import Hitbox from '../Hitbox';

// utils
import Collision from '../../utils/Collision';

// defines
import { DIRECTION, MOVEMENT_TYPE } from '../defines';

// namespaces
import { env } from '../../namespaces/environment';

abstract class ObstacleShape extends GameObject implements IObserver {
  public obstacleMgr: ObstacleMgr;
  public size: ISize2D;
  public graphics: PIXI.Graphics;
  private hitboxShape: Hitbox;
  private hittable: boolean;

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
    usesGameSpeed: boolean = true,
  ) {
    super(x, y, movementType, speed1, speed2, usesGameSpeed);

    this.size = { width, height };
    this.hittable = true;

    // set x depending on which side we are on
    if (side !== null) {
      const newX = side === DIRECTION.LEFT
        ? Collision.getLeftBound() + this.style.lineWidth
        : Collision.getRightBound() - this.size.width - this.style.lineWidth;

      this.setLocation(newX, y);
    }

    this.obstacleMgr = obstacleMgr;

    // init graphics drawing
    this.graphics = new PIXI.Graphics();
    App.addChildToView(this.graphics);

    if (env.shouldDrawHitbox()) {
      this.hitboxShape = new Hitbox(this, speed1, speed2);
    }

    this.obstacleMgr.register(this);
  }

  public deconstruct(): void {
    if (this.hitboxShape) {
      this.hitboxShape.deconstruct();
    }

    this.obstacleMgr.unregister(this);
    this.graphics.destroy();
    this.removeUpdater();
  }

  public isHittable(): boolean {
    return this.hittable;
  }

  public setHittable(hittable): void {
    this.hittable = hittable;
  }

  public getTopOfShape(): number {
    return this.getLocation().y;
  }

  public getBottomOfShape(): number {
    return this.getLocation().y + this.size.height;
  }

  public getLeftOfShape(): number {
    return this.getLocation().x;
  }

  public getRightOfShape(): number {
    return this.getLocation().x + this.size.width;
  }

  // start of draw shape
  public startDraw(): void {
    // remove current shape before redrawing
    this.graphics.clear();

    // base shape styling
    const { lineWidth, lineColor, lineAlpha, fillColor, fillAlpha } = this.style;

    const alpha = {
      line: this.hittable ? lineAlpha : .5,
      fill: this.hittable ? fillAlpha : .2,
    };

    // 3px line width 75% alpha white
    this.graphics.lineStyle(lineWidth, lineColor, alpha.line);

    // 50% alpha white fill
    this.graphics.beginFill(fillColor, alpha.fill);
  }

  // drawings end with this
  public endDraw(): void {
    this.graphics.endFill();
  }

  public updateObserver(hittable) {
    this.setHittable(hittable);
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
