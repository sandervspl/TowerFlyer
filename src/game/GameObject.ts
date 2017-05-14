// dependencies
import IMoveType from './interfaces/IMoveType';
import IShape2D from './interfaces/IShape2D';
import Location2D from './Location2D';

abstract class GameObject {
  private motionController: IMoveType;

  constructor(moveType: IMoveType) {
    this.motionController = moveType;
  }

  protected setSpeed = (speed1: number, speed2?: number): void => {
    const speed = this.motionController.speed;
    speed.set(speed1, speed2);
  }

  protected getLocation = (): Location2D => this.motionController.location;

  protected updateLocation = (): void => {
    console.log('Updating location from:');
    console.log(this.getLocation().get());

    this.motionController.updateLocation();

    console.log('New location:');
    console.log(this.getLocation().get());
  }

  protected getSpeed = (): number | IShape2D => this.motionController.speed.get();
}

export default GameObject;
