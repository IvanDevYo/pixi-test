import MainContainer from './MainContainer';
import { Application, Assets, Sprite, Texture } from 'pixi.js';

export default class GameScene extends MainContainer {
  private _background: Sprite = new Sprite();

  constructor(app: Application) {
    super(app);
    Assets.load('../assets/background.jpg').then(this._setupBackgroundImage.bind(this));
  }

  private _setupBackgroundImage(texture: Texture) {
    this._background.texture = texture;
    this.container.addChild(this._background);
    this._onResize();
  }

  protected _onResize() {
    if (this._background) {
      this._background.width = this.app.screen.width;
      this._background.height = this.app.screen.height;
    }
  }
}
