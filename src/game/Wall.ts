// dependencies
import IPoint2D from './interfaces/IPoint2D';
import IWallShape from './interfaces/IWallShape';
import App from '../app';
import Game from './Game';
import Background from './Background';
import GameObject from './GameObject';
import { MOVEMENT_TYPE } from './defines';

// wall shapes
import Straight from './walls/Straight';

class Wall extends GameObject {
  private lastDrawLocation: IPoint2D;
  private wallPieces: IWallShape[] = [];

  constructor() {
    super(
      Background.getLeftBound(),
      App.getView().renderer.height / 2,
      MOVEMENT_TYPE.MOVE_Y,
      Game.getGameSpeed(),
    );

    // set starting point for new wall shapes
    this.lastDrawLocation = {
      x: this.getLocation().x,
      y: this.getLocation().y,
    };

    // init some wall pieces
    const totalPcs = 3;
    for (let i = 0; i < totalPcs; i += 1) {
      this.addShapeToArray();
    }

    this.loadWithoutSprite();
  }

  public getLastDrawLocation = (): IPoint2D => this.lastDrawLocation;

  public setLastDrawLocation(point2D: IPoint2D): void {
    this.lastDrawLocation = { x: point2D.x, y: point2D.y };
  }

  public removeShapeFromArray(): void {
    console.log('removing shape');
    this.wallPieces.shift();
    this.addShapeToArray();
  }

  public addShapeToArray(): void {
    this.wallPieces.push(new Straight(this));
  }

  public update(): void {
    for (const piece of this.wallPieces) {
      piece.update();
    }
  }
}

export default Wall;
