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
  background: Sprite = new Sprite();
  testData: AlienOptions[] = [];

  constructor(testData: AlienOptions[]) {
    this.app = new Application();
    (globalThis as any).__PIXI_APP__ = this.app;

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
    this.alienContainer = new AlienContainer(this.app, this.testData);

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
      Assets.load('../assets/background.jpg').then(this.setupBackgroundImage.bind(this)),
    ]);
  }

  setupBackgroundImage(texture: Texture) {
    this.background.texture = texture;
    this.gameScene.container.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
  }
}
