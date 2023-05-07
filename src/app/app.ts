import { Application, Texture, Sprite, Assets } from 'pixi.js';
import GameScene from './containers/GameScene';
import AlienContainer from './containers/AlienContainer';
import AlienOptions from './Heroes/AlienInterface';
import ScoreContainer from './containers/ScoreContainer';
import ResultContainer from './containers/ResultContainer';
import Gotoku from './Heroes/Gotoku';

export default class App {
  app: any;
  gameScene: GameScene;
  alienContainer: AlienContainer;
  scoreContainer: ScoreContainer;
  resultContainer: ResultContainer;
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
    this.resultContainer = new ResultContainer(this.app);
    this.alienContainer = new AlienContainer(this.app, this.testData, this.resultContainer);
    this.scoreContainer = new ScoreContainer(this.app, this.alienContainer);

    this.renderApp();
  }

  async renderApp() {
    await this.initImages();
    document.body.appendChild(this.app.view);

    this.gameScene.addToApplication();
    this.resultContainer.addToApplication();
    this.alienContainer.addToApplication();
    this.scoreContainer.addToApplication();
  }

  initImages() {
    return Assets.load('../assets/background.jpg').then(this.setupBackgroundImage.bind(this));
  }

  setupBackgroundImage(texture: Texture) {
    this.background.texture = texture;
    this.gameScene.container.addChild(this.background);
    this.background.width = this.app.screen.width;
    this.background.height = this.app.screen.height;
    window.addEventListener('resize', (e) => {
      this.background.width = this.app.screen.width;
      this.background.height = this.app.screen.height;
    });
  }
}
