import { Application, Texture, Container, Sprite, Assets } from 'pixi.js';
import GameScene from './GameScene';

export default class App {
  app: any;
  gameScene: GameScene;
  background: any;

  constructor() {
    this.initApplication();
    this.gameScene = new GameScene(this.app);
    this.initImages();
  }

  initApplication() {
    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      background: '#1099bb'
    });
    document.body.appendChild(this.app.view);
  }

  initImages() {
    Assets.load('../assets/background.jpg').then(this.setupBackgroundImage.bind(this));
  }

  setupBackgroundImage(texture: Texture) {
    this.background = new Sprite(texture);
    this.gameScene.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
  }
}
