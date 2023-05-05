import { Container, Sprite } from 'pixi.js';

export default class MainContainer {
  container: Container;

  constructor() {
    this.container = new Container();
  }

  getContainer() : Container {
    return this.container;
  }

  addChild(sprite: Sprite) {
    this.container.addChild(sprite);
  }

  addToAppStage(appStage: Container) {
    appStage.addChild(this.container);
  }
}
