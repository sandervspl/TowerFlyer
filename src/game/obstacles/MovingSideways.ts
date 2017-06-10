// dependencies
import IObstacleShape from '../interfaces/IObstacleShape';
import IPoint2D from '../interfaces/IPoint2D';
import App from '../../app';
import Game from '../Game';
import ObstacleShape from './ObstacleShape';
import ObstacleMgr from '../ObstacleMgr';

// defines
import { MOVEMENT_TYPE } from '../defines';

// utils
import Collision from '../../utils/Collision';
import TfMath from '../../utils/TfMath';

class MovingSideways extends ObstacleShape implements IObstacleShape {
  constructor(obstacleMgr: ObstacleMgr, width: number, height: number, y: number) {
    super(
      obstacleMgr,
      null,
      0,
      y,
      width,
      height,
      MOVEMENT_TYPE.MOVE_XY,
      TfMath.randomBetween(2, 4),
      Game.getGameSpeed(),
    );

    this.name = 'obstacle_sideways';

    this.setLocation(App.getMiddleOfView().x, y);
  }

  public draw(): void {
    const { graphics } = this;
    const { width, height } = this.size;
    const { x, y } = this.getLocation();

    graphics.drawRoundedRect(x, y, width, height, 10);
  }

  public update(): void {
    const speedX = (this.getSpeed() as IPoint2D).x;
    const speedY = (this.getSpeed() as IPoint2D).y;

    const isMovingLeft: boolean = speedX < 0;

    // determine our movement boundaries
    const gap = 25;
    const boundaries = {
      left: Collision.getLeftBound() + gap,
      right: Collision.getRightBound() - gap,
    };

    if (isMovingLeft && this.getLeftOfShape() <= boundaries.left) {
      // set speed to positive value to move right
      this.setSpeed(Math.abs(speedX), speedY);
    } else if (!isMovingLeft && this.getRightOfShape() >= boundaries.right) {
      // set speed to negative value to move left
      this.setSpeed(Math.abs(speedX) * -1, speedY);
    }

    super.update();
  }
}

export default MovingSideways;
