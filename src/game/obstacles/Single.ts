// dependencies
import IObstacleShape from '../interfaces/IObstacleShape';
import ObstacleShape from './ObstacleShape';
import ObstacleMgr from '../ObstacleMgr';
import Game from '../Game';
import App from '../../app';

// defines
import { DIRECTION, MOVEMENT_TYPE } from '../defines';

class Single extends ObstacleShape implements IObstacleShape {
  constructor(obstacleMgr: ObstacleMgr, side: DIRECTION, y: number) {
    super(
      obstacleMgr,
      side,
      0,
      y,
      (Math.random() * (App.getAppSize().width * .55)) + App.getAppSize().width * .2,
      50,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
    );
  }

  public draw(): void {
    const { graphics } = this;
    const { width, height } = this.size;
    const { x, y } = this.getLocation();

    graphics.drawRoundedRect(x, y, width, height, 10);
  }
}

export default Single;
