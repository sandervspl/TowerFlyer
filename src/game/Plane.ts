// dependencies
import GameObject from './GameObject';
import * as PIXI from 'pixi.js';

// animation sprite sheet
import planeSpriteSheet from '../assets/spriteSheets/plane/plane.json';
console.log(planeSpriteSheet);

// defines
import { MOVEMENT_TYPE } from './defines';

class Plane extends GameObject {
  constructor() {
    // init game object with position x:0, y:0
    // and make it move only on X-axis with a speed of 5
    super(0, 0, MOVEMENT_TYPE.MOVE_X, 5);

    PIXI.loader
      .add(planeSpriteSheet)
      .load(this.onAssetsLoad);
  }

  private onAssetsLoad = (): void => {
    const spritesAmount: number = 1;
    const frames: PIXI.Texture[] = [];

    // load sprites from sheet into frames array
    for (let i = 0; i < spritesAmount; i += 1) {
      frames.push(PIXI.Texture.fromFrame(`planeAngle${i}.png`));
    }

    // create animated sprite from frames
    const sprite = new PIXI.extras.AnimatedSprite(frames);

    // set position of sprite
    sprite.x = this.getLocation().getX();
    sprite.y = this.getLocation().getY();

    // set anchor point to middle of sprite
    sprite.anchor.set(.5);

    // time between frames?
    sprite.animationSpeed = .5;

    // start animation
    sprite.play();

    // sprite.ticker.add(function() {});
  }
}

export default Plane;
