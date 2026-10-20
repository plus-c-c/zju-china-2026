declare module "@peertube/embed-api/build/player.min.js" {
  export class PeerTubePlayer {
    constructor(frame: HTMLIFrameElement);
    readonly ready: Promise<void>;
    play(): Promise<void>;
  }
}
