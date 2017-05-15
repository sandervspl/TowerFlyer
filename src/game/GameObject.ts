// dependencies
import IMovementType from './interfaces/IMovementType';
import Location2D from './Location2D';

abstract class GameObject {
  private movementController: IMovementType;

  constructor(movementType: IMovementType) {
    this.movementController = movementType;
  }

  protected setSpeed = (speed1: number, speed2?: number): void => {
    const speed = this.movementController.speed;
    speed.set(speed1, speed2);
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
