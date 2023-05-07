import MainContainer from './MainContainer';
import { Application, Assets, Sprite, Texture } from 'pixi.js';

export default class GameScene extends MainContainer {
  background: Sprite = new Sprite();

  constructor(app: Application) {
    super(app);
    Assets.load('../assets/background.jpg').then(this.setupBackgroundImage.bind(this));
  }

  setupBackgroundImage(texture: Texture) {
    this.background.texture = texture;
    this.container.addChild(this.background);
    this._onResize();
  }

  protected _onResize() {
    if (this.background) {
      this.background.width = this.app.screen.width;
      this.background.height = this.app.screen.height;
    }
  }
}
