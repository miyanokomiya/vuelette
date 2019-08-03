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
  private interval: number;
  private timer: number = 0;

  constructor(fn: ILoopFn, interval: number) {
    this.fn = fn;
    this.interval = interval;
  }

  run(skipStart: boolean = false) {
    if (!skipStart) this.fn();

    this.timer = setInterval(() => {
      this.fn();
    }, this.interval);
  }

  setInterval(interval: number) {
    if (this.timer) {
      this.stop().then(() => {
        this.interval = interval;
        this.run(true);
      });
    } else {
      this.interval = interval;
    }
  }

  async stop() {
    return new Promise(resolve => {
      const fn = this.fn;
      this.fn = () => {
        fn();
        clearInterval(this.timer);
        this.timer = 0;
        this.fn = fn;
        resolve();
      };
    });
  }
}
