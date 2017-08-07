class Preloader {
  private static container = document.querySelector('#pre-loader') as HTMLElement;
  private static loader = document.querySelector('#pre-loader .loader .inner') as HTMLElement;
  private static progress = document.querySelector('#pre-loader #progress') as HTMLElement;

  public static update(progress: number): void {
    this.loader.style.width = `${progress}%`;
    this.progress.innerHTML = `${Math.trunc(progress)}%`;
  }

  public static end(): void {
    setTimeout(() => this.container.style.display = 'none', 250);
  }
}

export default Preloader;
