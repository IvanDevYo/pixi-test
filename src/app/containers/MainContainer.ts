import { Container, Application } from 'pixi.js';

export default class MainContainer {
  app: Application;
  container: Container = new Container();

  constructor(app: Application) {
    this.app = app;
    this._update = this._update.bind(this);
  }

  get height() {
    return this.container.height;
  }

  protected _update(this: any, delta: number) {}

  public addToApplication() {
    this.app.stage.addChild(this.container);
  }
}
