// dependencies
import IObstacleShape from '../interfaces/IObstacleShape';
import IPoint2D from '../interfaces/IPoint2D';
import App from '../../app';
import Game from '../Game';
import ObstacleShape from './ObstacleShape';
import ObstacleMgr from '../ObstacleMgr';
import Background from '../Background';
import TfMath from '../../utils/TfMath';

// defines
import { MOVEMENT_TYPE } from '../defines';

class MovingSideways extends ObstacleShape implements IObstacleShape {
  constructor(obstacleMgr: ObstacleMgr, y: number) {
    super(
      obstacleMgr,
      null,
      0,
      y,
      TfMath.randomBetween(250, 400),
      100,
      MOVEMENT_TYPE.MOVE_XY,
      TfMath.randomBetween(2, 4),
      Game.getGameSpeed(),
    );

    this.setLocation(App.getMiddleOfView().x, y);
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

  public update(): void {
    const posXLeft = this.getLocation().x;
    const posXRight = this.getLocation().x + this.size.width;

    const speedX = (this.getSpeed() as IPoint2D).x;
    const speedY = (this.getSpeed() as IPoint2D).y;

    const movingLeft = speedX < 0;

    const gap = 25;
    const boundaries = {
      left: Background.getLeftBound() + gap,
      right: Background.getRightBound() - gap,
    };

    if (movingLeft && posXLeft <= boundaries.left) {
      this.setSpeed(Math.abs(speedX), speedY);
    } else if (!movingLeft && posXRight >= boundaries.right) {
      this.setSpeed(Math.abs(speedX) * -1, speedY);
    }

    super.update();
  }
}

export default MovingSideways;
