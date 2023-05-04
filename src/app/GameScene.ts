import { Container, Application, Sprite } from 'pixi.js';

export default class GameScene {
  gameScene: Container;

  constructor(app: Application) {
    this.gameScene = new Container();
    app.stage.addChild(this.gameScene);
  }

  addChild(sprite: Sprite) {
    this.gameScene.addChild(sprite);
  }
}
