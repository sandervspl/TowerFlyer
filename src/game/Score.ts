// dependencies
import App from '../app';
import Game from './Game';
import Background from './Background';
import MultiStyleText from 'pixi-multistyle-text';
import { metersPerPixels } from './defines';

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

    const text = new MultiStyleText(`High score: <hs>${highscore} m</hs>`, {
      default: {
        fill: 0xFFFFFF,
        fontSize: '14px',
        fontFamily: 'Arial',
        fontWeight: '100',
      },
      hs: {
        fill: 0x257AE3,
      },
    });
    text.x = Background.getLeftBound() + 40;
    text.y = 20;

    const backdrop = new PIXI.Graphics();
    backdrop.beginFill(0x000000, .6);
    backdrop.drawRoundedRect(text.x - 20, text.y - 5, text.width + 40, text.height + 10, 15);
    backdrop.endFill();

    backdrop.addChild(text);
    App.addChildToView(backdrop);
  }
}

export default Score;
