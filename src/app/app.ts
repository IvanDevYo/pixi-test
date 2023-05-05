import { Application, Texture, Sprite, Assets } from 'pixi.js';
import GameScene from './containers/GameScene';
import AlienContainer from './containers/AlienContainer';

export default class App {
  app: any;
  gameScene: GameScene;
  alienContainer: AlienContainer;
  background: any;

  constructor() {
    this.initApplication();
    this.gameScene = new GameScene();
    this.gameScene.addToAppStage(this.app.stage);
    this.alienContainer = new AlienContainer({ x: 400, y: 300});
    this.app.stage.interactive = true;
    this.alienContainer.addToAppStage(this.app.stage)
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
    Assets.load('../assets/sprites/gotoku.json').then(this.setupSprites.bind(this));
  }

  setupBackgroundImage(texture: Texture) {
    this.background = new Sprite(texture);
    this.gameScene.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
  }

  setupSprites(texture: Texture) {
    console.log(texture);
  }
}
