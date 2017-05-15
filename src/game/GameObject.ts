// dependencies
import IMovementType from './interfaces/IMovementType';
import Location2D from './Location2D';
import MovesX from './movement/MovesX';
import MovesY from './movement/MovesY';
import MovesXY from './movement/MovesXY';
import IShape2D from './interfaces/IShape2D';

// defines
import { MOVEMENT_TYPE } from './defines';

abstract class GameObject {
  private movementController: IMovementType;

  constructor(posX: number, posY: number, movementType: MOVEMENT_TYPE, speed1: number, speed2?: number) {
    switch (movementType) {
      case MOVEMENT_TYPE.MOVE_X:
        this.movementController = new MovesX(posX, posY, speed1);
        break;

      case MOVEMENT_TYPE.MOVE_Y:
        this.movementController = new MovesY(posX, posY, speed1);
        break;

      case MOVEMENT_TYPE.MOVE_XY:
        this.movementController = new MovesXY(posX, posY, speed1, speed2);
        break;

      default:
        this.movementController = new MovesY(posX, posY, speed1);
    }
  }

  protected setSpeed = (speed1: number, speed2?: number): void => {
    const speed = this.movementController.speed;
    speed.set(speed1, speed2);
  }

  protected setSpeedX = (speed: number): void => {
    const curSpeedY = (this.movementController.speed.get() as IShape2D).y;
    this.setSpeed(speed, curSpeedY);
  }

  protected setSpeedY = (speed: number): void => {
    const curSpeedX = (this.movementController.speed.get() as IShape2D).x;
    this.setSpeed(curSpeedX, speed);
  }

  protected getLocation = (): Location2D => this.movementController.location;

  protected updateLocation = (): void => {
    console.log('Updating location from:');
    console.log(this.getLocation().get());

    this.movementController.updateLocation();

    console.log('New location:');
    console.log(this.getLocation().get());
  }
}

export default GameObject;
