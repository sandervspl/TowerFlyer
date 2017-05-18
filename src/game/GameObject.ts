// dependencies
import IMovementType from './interfaces/IMovementType';
import IPoint2D from './interfaces/IPoint2D';
import Location2D from './Location2D';
import MovesX from './movement/MovesX';
import MovesY from './movement/MovesY';
import MovesXY from './movement/MovesXY';
import App from '../app';

// defines
import { GameSprite, MOVEMENT_TYPE } from './defines';

abstract class GameObject {
  private movementController: IMovementType;
  private spriteFrameName: string;
  private spriteFrames: number;
  private curSpriteFrame: number;
  private sprite: GameSprite;

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

  protected getSpeed = (): number | IPoint2D => this.movementController.speed.get();

  protected getLocation = (): Location2D => this.movementController.location;

  // update location of gameobject and its sprite
  protected updateLocation(): void {
    this.movementController.updateLocation();

    this.sprite.x = this.movementController.location.x;
    this.sprite.y = this.movementController.location.y;
  }

  protected setLocation = (x: number, y: number): void => {
    this.movementController.setLocation(x, y);
  }

  protected getSprite = (): GameSprite => this.sprite;

  // init for loading spritesheets
  protected loadSpriteFromSpriteSheet = (
    spriteSheet: string, frameName: string,
    framesNum: number, startFrame?: number,
  ): void => {
    this.curSpriteFrame = startFrame;
    this.spriteFrames = framesNum;
    this.spriteFrameName = frameName;

    // determine if we are loading an animated sprite
    const loader = startFrame
      ? () => this.spriteSheetSingleLoaded(frameName, framesNum, startFrame)
      : () => this.spriteSheetLoaded(frameName, framesNum);

    // load spritesheet to PIXI environment
    PIXI.loader
      .add(spriteSheet)
      .load(loader);
  }

  protected loadSprite = async (spriteURL: string): Promise<any> => {
    this.sprite = PIXI.Sprite.fromImage(spriteURL);
    const sprite = this.sprite;

    // set anchor point to middle
    sprite.anchor.set(.5);

    // position to middle of view
    sprite.x = App.getMiddleOfView().x;
    sprite.y = App.getMiddleOfView().y;

    // add to view
    await App.getView().stage.addChild(sprite);

    // add updater
    this.spriteLoaded();
  }

  // change sprite frame by a certain amount (i.e. -1 or +1)
  protected changeSpriteFrame = (amount: number): number => {
    const minFrame = 0;
    const maxFrame = this.spriteFrames - 1;
    const prevSpriteFrame = this.curSpriteFrame;

    // update sprite frame
    this.curSpriteFrame += amount;

    // boundaries check
    if (this.curSpriteFrame < minFrame) {
      this.curSpriteFrame = minFrame;
    } else if (this.curSpriteFrame >= maxFrame) {
      this.curSpriteFrame = maxFrame;
    }

    // draw to updated sprite frame
    if (prevSpriteFrame !== this.curSpriteFrame) {
      this.draw();
    }

    return this.curSpriteFrame;
  }

  // load a spritesheet
  // WITHOUT animation
  private spriteSheetSingleLoaded = (frameName: string, framesNum: number, startFrame: number): void => {
    this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(`${frameName}${startFrame}.png`));
    const sprite = this.sprite;

    // set position of sprite
    sprite.x = this.getLocation().x;
    sprite.y = this.getLocation().y;

    // set anchor point to middle of sprite
    sprite.anchor.set(.5);

    // scale up for test
    sprite.scale = new PIXI.Point(3, 3);

    // add sprite to view
    App.getView().stage.addChild(sprite);

    // add new updater
    this.spriteLoaded();
  }

  // load a spritesheet
  // WITH animation
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
    sprite.x = this.getLocation().x;
    sprite.y = this.getLocation().y;

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
    this.spriteLoaded();
  }

  private spriteLoaded = (): void => {
    App.getView().ticker.add(this.update);
  }

  // draw new sprite
  private draw = (): void => {
    this.sprite.texture = PIXI.Texture.fromFrame(`${this.spriteFrameName}${this.curSpriteFrame}.png`);
  }

  // update method for PIXI ticker
  private update = (): void => {
    this.updateLocation();
  }
}

export default GameObject;
