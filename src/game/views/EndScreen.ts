// dependencies
import App from '../../app';
import Background from '../Background';
import Score from '../Score';

class EndScreen {
  private static score: string = '0';
  private static textGraphics: PIXI.Text;

  public static show = (score: number): void => {
    // save to local storage
    const isNewHighScore: boolean = Score.getInstance().save(score);

    // convert to string to display on screen
    EndScreen.score = score.toString();

    const overlay = new PIXI.Graphics();
    App.getView().stage.addChild(overlay);
    overlay.lineStyle(0, 0x000000, 0);
    overlay.beginFill(0x0C2647, .6);
    overlay.drawRect(
      Background.getLeftBound(),
      0,
      Background.size.width,
      App.getView().renderer.height,
    );
    overlay.endFill();

    const gameOverText = new PIXI.Text('Game over!', {
      fill: 0xFFFFFF,
      fontSize: '50px',
      fontWeight: '100',
      fontFamily: 'Arial',
    });
    gameOverText.anchor.set(.5);
    gameOverText.x = App.getMiddleOfView().x;
    gameOverText.y = App.getMiddleOfView().y - App.getMiddleOfView().y / 2;

    // add to view
    App.getView().stage.addChild(gameOverText);

    EndScreen.textGraphics = new PIXI.Text(`${EndScreen.score} m`, {
      fill: 0x257AE3,
      fontSize: '90px',
      fontWeight: '700',
      fontFamily: 'Arial',
    });
    EndScreen.textGraphics.anchor.set(.5);
    EndScreen.textGraphics.x = App.getMiddleOfView().x;
    EndScreen.textGraphics.y = gameOverText.y + 100;

    // add to view
    App.getView().stage.addChild(EndScreen.textGraphics);

    if (isNewHighScore) {
      const newHighScoreText = new PIXI.Text('New high score!', {
        fill: 0xFFFFFF,
        fontSize: '28px',
        fontWeight: '100',
        fontFamily: 'Arial',
      });
      newHighScoreText.anchor.set(.5);
      newHighScoreText.x = App.getMiddleOfView().x;
      newHighScoreText.y = EndScreen.textGraphics.y + 75;

      // add to view
      App.getView().stage.addChild(newHighScoreText);
    }

    // TODO: animation on update
    // App.getView().ticker.add(EndScreen.update);
  }

  // private static update = (): void => {
  //   EndScreen.textGraphics.destroy();
  // }
}

export default EndScreen;
