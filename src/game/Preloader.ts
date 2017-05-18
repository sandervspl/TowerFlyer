class Preloader {
  private container;
  private loader;

  constructor() {
    this.container = document.querySelector('#pre-loader');
    this.loader = document.querySelector('#pre-loader .loader .inner');
  }

  public update = (progress: number): void => {
    this.loader.style.width = `${progress}%`;
  }

  public end = (): void => {
    this.container.style.display = 'none';
  }
}

export default Preloader;
