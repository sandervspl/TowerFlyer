// dependencies
import App from '../app';
import Plane from './Plane';
import Collision from '../utils/Collision';
import ObstacleShape from './obstacles/ObstacleShape';
import Score from './Score';

// namespaces
// import { env } from '../namespaces/environment';

// obstacle shapes
import Single from './obstacles/Single';
import MovingSideways from './obstacles/MovingSideways';

// defines
import { DIRECTION } from './defines';

// utils
import TfMath from '../utils/TfMath';
import Device from '../utils/Device';

class ObstacleMgr {
  private obstacles: ObstacleShape[];
  private prevSide: DIRECTION;
  private distBetweenObst: number;
  private plane: Plane;

  // spawn probabilities
  private obstacleSpawnChance = {
    moving: 20,
  };

  private totalPieces: number = 10;

  constructor(plane: Plane) {
    this.plane = plane;
    this.distBetweenObst = Device.isMobile() ? 150 : 200;
    this.obstacles = [];

    // init some obstacle pieces
    for (let i = 0; i < this.totalPieces; i += 1) {
      this.prevSide = (i % 2 === 0) ? DIRECTION.LEFT : DIRECTION.RIGHT;
      const y = 1000 + (this.distBetweenObst * i);

      this.addObstacleToArray(y);
    }

    // add to gameloop
    App.addToGameLoop(this.update);
  }

  public deconstruct(): void {
    this.obstacles.forEach((obst) => {
      obst.deconstruct();
    });

    this.obstacles = [];
  }

  public removeObstacleFromArray(obst: ObstacleShape): void {
    // properly remove obstacle from game
    obst.deconstruct();

    // remove from array
    this.obstacles.shift();

    // add new obstacle to the game
    this.addObstacleToArray();
  }

  public addObstacleToArray(y?: number): number {
    const obsts = this.obstacles;
    const lastObst = obsts[obsts.length - 1];

    this.distBetweenObst = this.distBetweenObst - (Score.getInstance().getMultiplier() * .05);
    if (this.distBetweenObst < 75) {
      this.distBetweenObst = 75;
    }

    const newY = y ? y : lastObst.getLocation().y + lastObst.size.height + this.distBetweenObst;

    // switch side
    this.prevSide = (this.prevSide === DIRECTION.LEFT) ? DIRECTION.RIGHT : DIRECTION.LEFT;

    // decide what new obstacle to add to the field
    const { moving } = this.obstacleSpawnChance;
    let tmp = 0;
    let sum = 0;
    let w = 0;
    let h = 0;
    let minHeight = 0;
    let maxHeight = 0;
    const roll = TfMath.randomBetween(0, 10000) / 100;

    // check if we can spawn a moving obstacle
    tmp = moving;
    if (tmp > 0 && roll < (sum += tmp)) {
      w = TfMath.randomBetween(App.getAppSize().width * .3, App.getAppSize().width * .55);
      h = Device.isMobile() ? 50 : 100;

      return this.obstacles.push(new MovingSideways(this, w, h, newY));
    }

    // if nothing else is able to spawn then spawn a simple Single obstacle
    minHeight = Device.isMobile() ? 25 : 50;
    maxHeight = Device.isMobile() ? 250 : 500;

    w = TfMath.randomBetween(App.getAppSize().width * .3, App.getAppSize().width * .75);
    h = minHeight + Score.getInstance().getMultiplier() < maxHeight
      ? minHeight + Score.getInstance().getMultiplier()
      : maxHeight;

    return this.obstacles.push(new Single(this, w, h, this.prevSide, newY));
  }

  private update = (): void => {
    const obstToRemove: ObstacleShape[] = [];

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
