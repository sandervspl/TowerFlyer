// dependencies
import App from '../app';
import Game from './Game';
import { metersPerPixels } from './defines';

// namespace
// import { env } from '../namespaces/environment';

class Score {
  private curDistance: number = 0;
  private highScore: string;
  private distanceMultiplier: number = 1;
  private static firstInstance: Score = null;

  constructor() {
    this.curDistance = 0;
    this.highScore = localStorage.getItem('tf-highscore');
    this.showHighScore();
  }

  public static getInstance(): Score {
    if (this.firstInstance === null) {
      this.firstInstance = new Score();
    }

    return this.firstInstance;
  }

  public init(): void {
    this.distanceMultiplier = 1;
    this.curDistance = 0;
    App.addToGameLoop(this.update);
  }

  public getMultiplier(): number {
    this.distanceMultiplier = this.curDistance / 1000;

    return this.distanceMultiplier;
  }

  public calculateDistanceInMeters = (): number => {
    return Math.floor(this.curDistance / metersPerPixels);
  }

  public save(score: number): boolean {
    const highScore = localStorage.getItem('tf-highscore');

    if (!highScore || (highScore && score > Number(highScore))) {
      localStorage.setItem('tf-highscore', score.toString());

      this.highScore = score.toString();
      this.showHighScore();

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
    el.style.display = 'block';

    const positionX = window.innerWidth / 2 - App.getAppSize().width / 2 + 20;
    el.style.left = `${positionX}px`;

    const hs = el.querySelector('#highscore');
    hs.innerHTML = `${highscore}m`;
  }
}

export default Score;
