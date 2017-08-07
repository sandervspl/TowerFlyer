// dependencies
import IObstacleShape from '../interfaces/IObstacleShape';
import ObstacleShape from './ObstacleShape';
import ObstacleMgr from '../ObstacleMgr';
import Game from '../Game';
import Box from '../powerup/Box';

// utils
import TfMath from '../../utils/TfMath';
import Collision from '../../utils/Collision';

// defines
import { DIRECTION, MOVEMENT_TYPE } from '../defines';

class Single extends ObstacleShape implements IObstacleShape {
  private box: Box;

  constructor(obstacleMgr: ObstacleMgr, width: number, height: number, side: DIRECTION, y: number) {
    super(obstacleMgr, side, 0, y, width, height, MOVEMENT_TYPE.MOVE_Y, Game.getGameSpeed());
    this.name = 'obstacle_single';

    // 5% chance to spawn a box
    if (Math.random() < .05) {
      const boxWidth = Box.width;
      const boxX = side === DIRECTION.LEFT
        ? TfMath.randomBetween(this.getRightOfShape() + boxWidth, Collision.getRightBound() - boxWidth)
        : TfMath.randomBetween(Collision.getLeftBound() + boxWidth, this.getLeftOfShape() - boxWidth);
      const boxY = this.getLocation().y + this.size.height / 2;
      this.box = new Box(boxX, boxY, this);
    }
  }

  public getBox = (): Box => this.box;

  public draw(): void {
    const { graphics } = this;
    const { width, height } = this.size;
    const { x, y } = this.getLocation();

    graphics.drawRoundedRect(x, y, width, height, 10);
  }
}

export default Single;
