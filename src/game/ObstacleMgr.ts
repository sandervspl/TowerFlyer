// dependencies
import IObstacleShape from './interfaces/IObstacleShape';
import App from '../app';
import Plane from './Plane';
import Collision from '../utils/Collision';

// namespaces
// import { env } from '../namespaces/environment';

// obstacle shapes
import Single from './obstacles/Single';

// defines
import { DIRECTION } from './defines';

class ObstacleMgr {
  private obstacles: IObstacleShape[] = [];
  private prevSide: DIRECTION;
  private distBetweenObst: number;
  private plane: Plane;

  constructor(plane: Plane) {
    this.plane = plane;
    this.distBetweenObst = 200;

    // init some obstacle pieces
    const totalPcs = 10;
    for (let i = 0; i < totalPcs; i += 1) {
      this.prevSide = (i % 2 === 0) ? DIRECTION.LEFT : DIRECTION.RIGHT;
      const y = 1000 + (this.distBetweenObst * i);

      this.addObstacleToArray(y);
    }

    // add to gameloop
    this.addToTicker();
  }

  public removeObstacleFromArray(obst: IObstacleShape): void {
    // clear draw and updater from gameloop
    obst.graphics.clear();
    obst.removeUpdater();

    // remove from array
    this.obstacles.shift();

    // add new obstacle to the game
    this.addObstacleToArray();

    // env.log(`Removed obstacle. ${this.obstacles.length} obstacles left.`);
  }

  public addObstacleToArray(y?: number): void {
    const obsts = this.obstacles;
    const lastObst = obsts[obsts.length - 1];
    const newY = y ? y : lastObst.getLocation().y + lastObst.size.height + this.distBetweenObst;

    // switch side
    this.prevSide = (this.prevSide === DIRECTION.LEFT) ? DIRECTION.RIGHT : DIRECTION.LEFT;

    // add new obstacle to our array
    this.obstacles.push(new Single(this, this.prevSide, newY));
  }

  // add our updater game loop
  private addToTicker(): void {
    App.getView().ticker.add(this.update);
  }

  private update = (): void => {
    const obstToRemove: IObstacleShape[] = [];
    this.obstacles.forEach((obst) => {
      obst.update();

      // check if we are out of view
      const bottom = obst.getLocation().y + obst.size.height;
      const viewTop = 0;

      // remove obstacle after we are done updating
      if (bottom < viewTop) {
        obstToRemove.push(obst);
      }
    });

    // remove all obstacles that are out of view
    obstToRemove.forEach((obst) => {
      this.removeObstacleFromArray(obst);
    });

    // check for collision
    this.obstacles.forEach((obst) => {
      const hasCollided = Collision.hitTestSpriteWithGraphic(this.plane, obst);

      if (hasCollided) {
        this.plane.die();
      }
    });
  }
}

export default ObstacleMgr;
