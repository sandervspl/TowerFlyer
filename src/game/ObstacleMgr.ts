// dependencies
import IObstacleShape from './interfaces/IObstacleShape';
import App from '../app';
import Plane from './Plane';
import Collision from '../utils/Collision';

// namespaces
// import { env } from '../namespaces/environment';

// obstacle shapes
import Single from './obstacles/Single';
import MovingSideways from './obstacles/MovingSideways';

// defines
import { DIRECTION } from './defines';

// utils
import TfMath from '../utils/TfMath';

class ObstacleMgr {
  private obstacles: IObstacleShape[] = [];
  private prevSide: DIRECTION;
  private distBetweenObst: number;
  private plane: Plane;

  private obstacleSpawnChance = {
    moving: 25,
    // single: 90,
  };

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
    App.getView().ticker.add(this.update);
  }

  public removeObstacleFromArray(obst: IObstacleShape): void {
    // properly remove obstacle from game
    obst.deconstruct();

    // remove from array
    this.obstacles.shift();

    // add new obstacle to the game
    this.addObstacleToArray();

    // env.log(`Removed obstacle. ${this.obstacles.length} obstacles left.`);
  }

  public addObstacleToArray(y?: number): number {
    const obsts = this.obstacles;
    const lastObst = obsts[obsts.length - 1];
    const newY = y ? y : lastObst.getLocation().y + lastObst.size.height + this.distBetweenObst;

    // switch side
    this.prevSide = (this.prevSide === DIRECTION.LEFT) ? DIRECTION.RIGHT : DIRECTION.LEFT;

    // decide what new obstacle to add to the field
    const { moving } = this.obstacleSpawnChance;
    let tmp = 0;
    let sum = 0;
    const roll = TfMath.randomBetween(0, 10000) / 100;

    // check if we can spawn a moving obstacle
    tmp = moving;
    if (tmp > 0 && roll < (sum += tmp)) {
      return this.obstacles.push(new MovingSideways(this, newY));
    }

    // if nothing else is able to spawn then spawn a simple Single obstacle
    return this.obstacles.push(new Single(this, this.prevSide, newY));
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
