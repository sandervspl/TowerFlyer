// dependencies
import IWallShape from './interfaces/IObstacleShape';
import App from '../app';

// namespaces
import { env } from '../namespaces/environment';

// obstacle shapes
import Single from './obstacles/Single';

// defines
import { DIRECTION } from './defines';

class ObstacleMgr {
  private obstacles: IWallShape[] = [];
  private prevSide: DIRECTION;
  private distBetweenObst: number;

  constructor() {
    this.distBetweenObst = 250;

    // init some wall pieces
    const totalPcs = 10;
    for (let i = 0; i < totalPcs; i += 1) {
      const side = (i % 2 === 0) ? DIRECTION.LEFT : DIRECTION.RIGHT;
      const y = 1000 + (this.distBetweenObst * i);

      this.addObstacleToArray(side, y);

      this.prevSide = side;
    }

    // add to gameloop
    this.addToTicker();
  }

  public removeObstacleFromArray(): void {
    this.obstacles.shift();
    this.addObstacleToArray();
    env.log(`Removed obstacle. ${this.obstacles.length} obstacles left.`);
  }

  public addObstacleToArray(side?: DIRECTION, y?: number): void {
    const newSide = side
      ? side
      : (this.prevSide === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT);
    const newY = y
      ? y
      : this.obstacles[this.obstacles.length - 1].getLocation().y + this.distBetweenObst;

    this.obstacles.push(new Single(this, newSide, newY));

    this.prevSide = newSide;
  }

  // add our updater game loop
  private addToTicker(): void {
    App.getView().ticker.add(this.update);
  }

  private update = (): void => {
    for (const obst of this.obstacles) {
      obst.update();
    }
  }
}

export default ObstacleMgr;
