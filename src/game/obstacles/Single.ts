// dependencies
import IWallShape from '../interfaces/IObstacleShape';
import WallShape from './ObstacleShape';
import ObstacleMgr from '../ObstacleMgr';
import Background from '../Background';

// defines
import { DIRECTION } from '../defines';

class Single extends WallShape implements IWallShape {
  constructor(obstacleMgr: ObstacleMgr, side: DIRECTION, y: number) {
    super(
      obstacleMgr,
      side,
      0,
      y,
      (Math.random() * (Background.size.width * .55)) + Background.size.width * .2,
      50,
    );
  }

  public draw(): void {
    const { graphics } = this;
    const { width, height } = this.size;
    const { x, y } = this.getLocation();

    graphics.drawRoundedRect(
      x,
      y,
      width,
      height,
      10,
    );
  }
}

export default Single;
