// dependencies
import ISize2D from './ISize2D';
import IMovementType from './IMovementType';
import ObstacleMgr from '../ObstacleMgr';
import Location2D from '../Location2D';

interface IObstacleShape {
  obstacleMgr: ObstacleMgr;
  size: ISize2D;
  movementController: IMovementType;
  graphics: PIXI.Graphics;

  deconstruct(): void;
  update(): void;
  draw(): void;
  startDraw(): void;
  endDraw(): void;
  getLocation(): Location2D;
  removeUpdater(): void;
  getHitboxShape(): ISize2D;
}

export default IObstacleShape;
