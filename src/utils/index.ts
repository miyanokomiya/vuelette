export async function sleep(interval: number) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

type ILoopFn = () => void;

export class LoopPlayer {
  private fn: () => void;
  private fnOrg: () => void;
  private interval: number;
  private timer: number = 0;

  constructor(fn: ILoopFn, interval: number) {
    this.fn = fn;
    this.fnOrg = fn;
    this.interval = interval;
  }

  run(skipStart: boolean = false) {
    this.fn = this.fnOrg;
    if (!skipStart) this.fn();

    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.fn();
    }, this.interval);
  }

  async stop() {
    return new Promise(resolve => {
      this.fn = () => {
        this.fnOrg();
        if (this.timer) clearInterval(this.timer);
        this.timer = 0;
        this.fn = this.fnOrg;
        resolve();
      };
    });
  }

  dispose() {
    if (this.timer) clearInterval(this.timer);
  }
}
