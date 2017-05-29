export namespace env {
  // turn debugging on/off
  const debugging: boolean = false;

  // debug options
  const drawHitbox: boolean = true;

  // debug log
  export const log = (msg: any): void => {
    if (debugging) {
      console.log(msg);
    }
  };

  export const isDebug = (): boolean => debugging;
  export const shouldDrawHitbox = (): boolean => debugging && drawHitbox;
}
