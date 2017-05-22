export namespace env {
  const debugging: boolean = true;

  export const log = (msg: any): void => {
    if (debugging) {
      console.log(msg);
    }
  };

  export const isDebug = (): boolean => debugging;
}
