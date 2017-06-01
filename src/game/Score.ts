// dependencies
import App from '../app';
import Game from './Game';
import Background from './Background';
import { metersPerPixels } from './defines';

// namespace
// import { env } from '../namespaces/environment';

class Score {
  private curDistance: number = 0;
  private highScore: string;
  private static firstInstance: Score = null;

  constructor() {
    this.curDistance = 0;
    this.highScore = localStorage.getItem('tf-highscore');
    this.showHighScore();

    App.addToGameLoop(this.update);
  }

  public static getInstance(): Score {
    if (this.firstInstance === null) {
      this.firstInstance = new Score();
    }

    return this.firstInstance;
  }

  public calculateDistanceInMeters = (): number => {
    return Math.floor(this.curDistance / metersPerPixels);
  }

  public save(score: number): boolean {
    const highScore = localStorage.getItem('tf-highscore');

    if (!highScore || (highScore && score > Number(highScore))) {
      localStorage.setItem('tf-highscore', score.toString());

      return true;
    }

    return false;
  }

  private update = (): void => {
    this.curDistance += Math.abs(Game.getGameSpeed());
  }

  private showHighScore(): void {
    let highscore = '0';

    if (this.highScore) {
      highscore = this.highScore;
    }

    const el = document.querySelector('#highscore-container') as HTMLElement;
    el.style.left = `${Background.getLeftBound() + 20}px`;
    el.style.display = 'block';

    const hs = el.querySelector('#highscore');
    hs.innerHTML = `${highscore}m`;
  }
}

export default Score;
