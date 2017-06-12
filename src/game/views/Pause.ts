// dependencies
import App from '../../app';

class Pause {
  private static container: HTMLElement = document.querySelector('#view__pause') as HTMLElement;

  public static show(): void {
    const { container } = this;
    container.style.display = 'flex';
    container.style.width = `${App.getAppSize().width}px`;
    container.style.height = `${App.getAppSize().height}px`;
    container.classList.add('show');
  }

  public static hide(): void {
    const { container } = this;
    container.style.display = 'none';
    container.classList.remove('show');
  }
}

export default Pause;
