import { Container, Application } from 'pixi.js';

export default class MainContainer {
  app: Application;
  container: Container = new Container();

  constructor(app: Application) {
    this.app = app;
    this._update = this._update.bind(this);
    this.app.ticker.add(this._update);
    window.addEventListener('resize', this._onResize.bind(this));
  }

  protected _onResize() {}

  protected _update(this: any, delta: number) {}

  public addToApplication() {
    this.app.stage.addChild(this.container);
  }
}
