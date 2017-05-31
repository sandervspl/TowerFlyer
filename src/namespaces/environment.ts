// console is only allowed from this namespace
// tslint:disable:no-console
export namespace env {
  // turn debugging on/off
  const debugging = false;

  // debug options
  const drawHitbox = true;
  const invulnerable =  true;

  // debug log
  export const log = (msg: any): void => {
    if (debugging) {
      console.log(msg);
    }
  };

  export const isDebug = (): boolean => debugging;
  export const shouldDrawHitbox = (): boolean => debugging && drawHitbox;
  export const isInvulnerable = (): boolean => debugging && invulnerable;
}
