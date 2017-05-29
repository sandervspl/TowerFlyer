// dependencies
import IObstacleShape from '../interfaces/IObstacleShape';
import ObstacleShape from './ObstacleShape';
import ObstacleMgr from '../ObstacleMgr';
import Background from '../Background';
import Game from '../Game';

// defines
import { DIRECTION, MOVEMENT_TYPE } from '../defines';

class Single extends ObstacleShape implements IObstacleShape {
  constructor(obstacleMgr: ObstacleMgr, side: DIRECTION, y: number) {
    super(
      obstacleMgr,
      side,
      0,
      y,
      // TODO: set to window width if its smaller than bg width
      (Math.random() * (Background.size.width * .55)) + Background.size.width * .2,
      50,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
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
