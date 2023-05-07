import { Container, Application } from 'pixi.js';

export default class MainContainer {
  app: Application;
  container: Container = new Container();

  constructor(app: Application) {
    this.app = app;
    this.update = this.update.bind(this);
  }

  get height() {
    return this.container.height;
  }

  update(this: any, delta: number) {}
}
