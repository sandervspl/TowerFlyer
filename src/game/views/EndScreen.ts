// dependencies
import App from '../../app';
import Background from '../Background';

class EndScreen {
  private static score: string = '0';
  private static textGraphics: PIXI.Text;

  public static show = (score: number): void => {
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

    EndScreen.textGraphics = new PIXI.Text(`${EndScreen.score} m`,
      {
        fill: 0x257AE3,
        fontSize: '90px',
        fontWeight: '700',
        fontFamily: 'Arial',
      },
    );
    EndScreen.textGraphics.anchor.set(.5);
    EndScreen.textGraphics.x = App.getMiddleOfView().x;
    EndScreen.textGraphics.y = App.getMiddleOfView().y - App.getMiddleOfView().y / 2;

    // add to view
    App.getView().stage.addChild(EndScreen.textGraphics);

    // TODO: animation on update
    // App.getView().ticker.add(EndScreen.update);
  }

  // private static update = (): void => {
  //   EndScreen.textGraphics.destroy();
  // }
}

export default EndScreen;
