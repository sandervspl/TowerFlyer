// dependencies
import App from '../app';
import Game from './Game';
import { metersPerPixels } from './defines';

class Score {
  private static firstInstance: Score = null;
  private static curDistance: number = 0;

  constructor() {
    Score.curDistance = 0;
    App.getView().ticker.add(Score.update);
  }

  public static getInstance(): Score {
    if (this.firstInstance === null) {
      this.firstInstance = new Score();
    }

    return this.firstInstance;
  }

  public static calculateDistanceInMeters = (): number => {
    return Math.floor(Score.curDistance / metersPerPixels);
  }

  public save(score: number): boolean {
    const highScore = localStorage.getItem('tf-highscore');
    if (!highScore || (highScore && score > Number(highScore))) {
      localStorage.setItem('tf-highscore', score.toString());

      return true;
    }

    return false;
  }

  // public static end = (): void => {
  //   const score = Score.calculateDistanceInMeters();
  // }

  private static update = (): void => {
    Score.curDistance += Math.abs(Game.getGameSpeed());
  }
}

export default Score;
