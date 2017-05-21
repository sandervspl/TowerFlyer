// dependencies
import IMovementType from './interfaces/IMovementType';
import IPoint2D from './interfaces/IPoint2D';
import * as PIXI from 'pixi.js';
import Location2D from './Location2D';
import MovesX from './movement/MovesX';
import MovesY from './movement/MovesY';
import MovesXY from './movement/MovesXY';
import App from '../app';

// defines
import { GameSprite, MOVEMENT_TYPE } from './defines';

// namespaces
import { env } from '../namespaces/environment';

abstract class GameObject {
  private spriteFrameName: string;
  private spriteFrames: number;
  private curSpriteFrame: number;
  private sprite: GameSprite;
  private debug: boolean;
  public movementController: IMovementType;

  constructor(
    posX: number, posY: number, movementType: MOVEMENT_TYPE, speed1?: number, speed2?: number, debug: boolean = false,
  ) {
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

    this.debug = debug;
  }

  public getLocation = (): Location2D => this.movementController.location;

  // draw new sprite
  public draw(): void {
    this.sprite.texture = PIXI.Texture.fromFrame(`${this.spriteFrameName}${this.curSpriteFrame}.png`);
  }

  // update method for PIXI ticker
  public update(): void {
    this.updateLocation();
  }

  public removeUpdater(): void {
    App.getView().ticker.remove(() => this.update());
    env.log('Removed GameObject updater from gameloop.');
  }

  protected setSpeed = (speed1: number, speed2?: number): void => {
    const speed = this.movementController.speed;
    speed.set(speed1, speed2);
  }

  protected getSpeed = (): number | IPoint2D => this.movementController.speed.get();

  // update location of gameobject and its sprite
  protected updateLocation(): void {
    this.movementController.updateLocation();

    if (this.sprite) {
      this.syncSpriteLocation();
    }

    if (this.debug) {
      env.log(this.movementController.location.get());
    }
  }

  protected setLocation = (x: number, y: number): void => {
    this.movementController.setLocation(x, y);

    if (this.sprite) {
      this.syncSpriteLocation();
    }
  }

  protected getSprite = (): GameSprite => this.sprite;

  // init for loading spritesheets
  protected loadSpriteFromSpriteSheet = (
    spriteSheetURL: string, frameName: string, framesNum: number, startFrame?: number,
  ): void => {
    this.curSpriteFrame = startFrame;
    this.spriteFrames = framesNum;
    this.spriteFrameName = frameName;

    // determine if we are loading an animated sprite
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

  protected loadSprite = (spriteURL: string): void => {
      this.sprite = PIXI.Sprite.fromImage(spriteURL);

      // set anchor point to middle
      this.sprite.anchor.set(.5);

      // position to middle of view
      this.sprite.x = App.getMiddleOfView().x;
      this.sprite.y = App.getMiddleOfView().y;

      // add to view
      App.getView().stage.addChild(this.sprite);

      // add updater
      this.spriteLoaded();
  }

  protected loadWithoutSprite(): void {
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

  private syncSpriteLocation = (): void => {
    this.sprite.x = this.movementController.location.x;
    this.sprite.y = this.movementController.location.y;
  }

  // GAME LOOP
  private spriteLoaded = (): void => {
    App.getView().ticker.add(() => this.update());
  }
}

export default GameObject;
