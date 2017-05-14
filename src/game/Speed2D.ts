// dependencies
import Coords2D from './Coords2D';

class Speed2D extends Coords2D {
  private static gameSpeed: number = 5;

  public static getGameSpeed = (): number => Speed2D.gameSpeed;

  public static setGameSpeed = (speed: number) => Speed2D.gameSpeed = speed;
}

export default Speed2D;
