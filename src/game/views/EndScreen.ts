// dependencies
import App from '../../app';
import Score from '../Score';

class EndScreen {
  private static container: HTMLElement = document.querySelector('#view__gameover') as HTMLElement;

  public static show(score: number): void {
    // save to local storage
    const isNewHighScore: boolean = Score.getInstance().save(score);

    const { container } = this;

    container.style.display = 'flex';
    container.style.width = `${App.getAppSize().width}px`;
    container.style.height = `${App.getAppSize().height}px`;

    const scoreTxt = container.querySelector('#endscore');
    scoreTxt.innerHTML = `${score}m`;

    const newHS = container.querySelector('#newhighscore') as HTMLElement;
    if (isNewHighScore) {
      newHS.style.display = 'block';
    }

    setTimeout(() => {
      container.classList.add('show');
    }, 100);
  }

  public static hide(): void {
    const { container } = this;
    container.style.display = 'none';
    container.classList.remove('show');
  }
}

export default EndScreen;
