// dependencies
import IMovementType from './interfaces/IMovementType';
import Location2D from './Location2D';
import MovesX from './movement/MovesX';
import MovesY from './movement/MovesY';
import MovesXY from './movement/MovesXY';
import IShape2D from './interfaces/IShape2D';
import App from '../app';

// defines
import { MOVEMENT_TYPE } from './defines';

abstract class GameObject {
  private movementController: IMovementType;
  protected sprite: PIXI.Sprite | PIXI.extras.AnimatedSprite;

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
    this.movementController.updateLocation();

    this.sprite.x = this.movementController.location.getX();
    this.sprite.y = this.movementController.location.getY();
  }

  protected loadSpriteFromSpriteSheet = (spriteSheet: string, frameName: string,
                                         framesNum: number, startFrame?: number): void => {

    const loader = startFrame
      ? () => this.spriteSheetSingleLoaded(frameName, framesNum, startFrame)
      : () => this.spriteSheetLoaded(frameName, framesNum);

    PIXI.loader
      .add(spriteSheet)
      .load(loader);
  }

  private spriteSheetSingleLoaded = (frameName: string, framesNum: number, startFrame: number): void => {
    const frames: PIXI.Texture[] = [];

    // load sprites from sheet into frames array
    for (let i = 0; i < framesNum; i += 1) {
      frames.push(PIXI.Texture.fromFrame(`${frameName}${i}.png`));
    }

    this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(`${frameName}${startFrame}.png`));
    const sprite = this.sprite;

    // set position of sprite
    sprite.x = this.getLocation().getX();
    sprite.y = this.getLocation().getY();

    // set anchor point to middle of sprite
    sprite.anchor.set(.5);

    // scale up for test
    sprite.scale = new PIXI.Point(3, 3);

    // add sprite to view
    App.getView().stage.addChild(sprite);

    // add new updater
    App.getView().ticker.add(() => {
      this.update();
    });
  }

  private spriteSheetLoaded = (frameName: string, framesNum: number): void => {
    const frames: PIXI.Texture[] = [];

    // load sprites from sheet into frames array
    for (let i = 0; i < framesNum; i += 1) {
      frames.push(PIXI.Texture.fromFrame(`${frameName}${i}.png`));
    }

    // create animated sprite from frames
    this.sprite = new PIXI.extras.AnimatedSprite(frames);
    const sprite = this.sprite as PIXI.extras.AnimatedSprite;

    // set position of sprite
    sprite.x = this.getLocation().getX();
    sprite.y = this.getLocation().getY();

    // set anchor point to middle of sprite
    sprite.anchor.set(.5);

    // scale up for test
    sprite.scale = new PIXI.Point(3, 3);

    // time between frames
    sprite.animationSpeed = .05;

    // play sprite
    sprite.play();

    // add sprite to view
    App.getView().stage.addChild(sprite);

    // add new updater
    App.getView().ticker.add(() => {
      this.update();
    });
  }

  private update = (): void => {
    this.updateLocation();
  }
}

export default GameObject;
