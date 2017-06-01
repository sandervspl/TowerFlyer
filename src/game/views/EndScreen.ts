// tslint:disable
// dependencies
// import App from '../../app';
// import Background from '../Background';
import Score from '../Score';
import Background from "../Background";

class EndScreen {
  public static show = (score: number): void => {
    // save to local storage
    const isNewHighScore: boolean = Score.getInstance().save(score);

    const container = document.querySelector('#view__gameover') as HTMLElement;
    container.style.display = 'flex';
    container.style.width = `${Background.size.width}px`;
    container.style.height = `${window.innerHeight}px`;
    container.style.marginLeft = `${Background.getLeftBound()}px`;

    const scoreTxt = container.querySelector('#endscore');
    scoreTxt.innerHTML = `${score}m`;

    const newHS = container.querySelector('#newhighscore') as HTMLElement;
    if (isNewHighScore) { newHS.style.display = 'block' }

    setTimeout(() => {
      container.classList.add('show');
    }, 100);
  }
}

export default EndScreen;
