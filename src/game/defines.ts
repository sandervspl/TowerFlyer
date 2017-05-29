import * as PIXI from 'pixi.js';

export const metersPerPixels = 30;

export enum MOVEMENT_TYPE {
  MOVE_X = 0,
  MOVE_Y,
  MOVE_XY,
}

export enum DIRECTION {
  LEFT = 0,
  RIGHT,
}

export type GameSprite = PIXI.Sprite | PIXI.extras.AnimatedSprite;
