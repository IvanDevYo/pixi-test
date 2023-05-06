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
    this.app = new Application();

    document.body.style.margin = '0';

    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', (e) => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    this.app.stage.interactive = true;

    this.testData = testData;

    this.gameScene = new GameScene(this.app);
    this.alienContainer = new AlienContainer(this.app, this.testData, { x: 400, y: 300});

    this.renderApp();
  }

  async renderApp() {
    await this.initImages();
    document.body.appendChild(this.app.view);

    this.app.stage.addChild(this.gameScene.container);

    this.app.stage.addChild(this.alienContainer.container);
  }

  initImages() {
    return Promise.all([
      Assets.load('../assets/background.png').then(this.setupBackgroundImage.bind(this)),
      Assets.load('../assets/scene.png').then(this.setupSceneImage.bind(this)),
    ]);
  }

  setupBackgroundImage(texture: Texture) {
    this.background = new Sprite(texture);
    this.gameScene.container.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height / 2 + 85;
    console.log(this.gameScene);
  }

  setupSceneImage(texture: Texture) {
    this.scene = new Sprite(texture);
    this.alienContainer.container.addChild(this.scene);
    this.scene.width = this.app.screen.width;
    this.scene.height = this.app.screen.height / 2;
    this.scene.anchor.set(0.208, -0.54);
  }
}
