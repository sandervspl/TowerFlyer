// dependencies
import ISize2D from './ISize2D';
import Wall from '../Wall';

interface IWallShape {
  wall: Wall;
  size: ISize2D;

  update(): void;
  draw(): void;
  startDraw(): void;
  endDraw(): void;
}

export default IWallShape;
