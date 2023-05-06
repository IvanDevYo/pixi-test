import { Application, Texture, Sprite, Assets, AnimatedSprite } from 'pixi.js';
import GameScene from './containers/GameScene';
import AlienContainer from './containers/AlienContainer';
import Gotoku from './Heroes/Gotoku';
import AlienOptions from './Heroes/AlienInterface';

export default class App {
  app: any;
  gameScene: GameScene;
  alienContainer: AlienContainer;
  aliens: Gotoku[] = [];
  background: any;
  scene: any;
  testData: AlienOptions[] = [];

  constructor(testData: AlienOptions[]) {
    this.initApplication();
    this.gameScene = new GameScene();
    this.gameScene.addToAppStage(this.app.stage);
    this.alienContainer = new AlienContainer({ x: 400, y: 300});
    this.app.stage.interactive = true;
    this.alienContainer.addToAppStage(this.app.stage)
    this.initImages();
    this.testData = testData;
    this.setupTestData(this.testData);
  }

  initApplication() {
    this.app = new Application({
      width: 1289,
      height: 720,
      background: '#1099bb'
    });
    document.body.appendChild(this.app.view);
  }

  initImages() {
    Assets.load('../assets/background.png').then(this.setupBackgroundImage.bind(this));
    Assets.load('../assets/scene.png').then(this.setupSceneImage.bind(this));
  }

  setupBackgroundImage(texture: Texture) {
    this.background = new Sprite(texture);
    this.gameScene.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height / 2 + 85;
    console.log(this.gameScene);
  }

  setupSceneImage(texture: Texture) {
    this.scene = new Sprite(texture);
    this.alienContainer.addChild(this.scene);
    this.scene.width = this.app.screen.width;
    this.scene.height = this.app.screen.height / 2;
    this.scene.anchor.set(0.31, -0.4);
  }

  async setupTestData(testData: AlienOptions[]) {
    for (let itemOptions of testData) {
      const alien = new Gotoku(itemOptions);
      await alien.load();
      alien.addToContainer(this.alienContainer.getContainer(), 'walk');
      this.aliens.push(alien);
    }
    this.app.ticker.add(() => this.gameLoop())
  }

  gameLoop() {
    for (let alien of this.aliens) {
      const sprite = alien.getSprite();
      const posX = sprite instanceof AnimatedSprite ? sprite.x : 0;
      const container = this.alienContainer.getContainer();
      if (posX < container.width - 450) {
        alien.walk(this.alienContainer.getContainer());
      }
    }
  }
}
