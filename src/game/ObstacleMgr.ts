// dependencies
import IObstacleShape from './interfaces/IObstacleShape';
import App from '../app';

// namespaces
import { env } from '../namespaces/environment';

// obstacle shapes
import Single from './obstacles/Single';

// defines
import { DIRECTION } from './defines';

class ObstacleMgr {
  private obstacles: IObstacleShape[] = [];
  private prevSide: DIRECTION;
  private distBetweenObst: number;

  constructor() {
    this.distBetweenObst = 250;

    // init some obstacle pieces
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

  public removeObstacleFromArray(obst: IObstacleShape): void {
    // clear draw and updater from gameloop
    obst.graphics.clear();
    obst.removeUpdater();

    // remove from array
    this.obstacles.shift();

    // add new obstacle to the game
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
    const obstToRemove: IObstacleShape[] = [];
    for (const obst of this.obstacles) {
      obst.update();

      // check if we are out of view
      const bottom = obst.getLocation().y + obst.size.height;
      const viewTop = 0;

      // remove obstacle after we are done updating
      if (bottom < viewTop) {
        obstToRemove.push(obst);
      }
    }

    // remove all obstacles that are out of view
    if (obstToRemove.length > 0) {
      for (const obst of obstToRemove) {
        this.removeObstacleFromArray(obst);
      }
    }
  }
}

export default ObstacleMgr;
