class Preloader {
  private container;
  private loader;
  private progress;

  constructor() {
    this.container = document.querySelector('#pre-loader');
    this.loader = document.querySelector('#pre-loader .loader .inner');
    this.progress = document.querySelector('#pre-loader #progress');
  }

  public update = (progress: number): void => {
    this.loader.style.width = `${progress}%`;
    this.progress.innerHTML = `${progress}%`;
  }

  public end = (): void => {
    this.container.style.display = 'none';
  }
}

export default Preloader;
