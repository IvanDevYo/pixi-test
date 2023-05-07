import AlienOptions from './AlienInterface';
import AlienContainer from '../containers/AlienContainer';
import { AnimatedSprite, Assets, Texture, Spritesheet, Application, Container } from 'pixi.js';

type StateType = 'idle' | 'dead' | 'walk';

export default class Alien {
  app: Application;
  sprite: AnimatedSprite;
  spriteSheet: Spritesheet;
  state: StateType = 'walk';
  isActive: boolean = true;
  options: AlienOptions;
  eventListener: any;
  static readonly alienType: string;

  constructor(app: Application, spriteSheet: Spritesheet, options: AlienOptions) {
    this.app = app;
    this.spriteSheet = spriteSheet;
    this.sprite = new AnimatedSprite(this.spriteSheet.animations[this.state]);
    this.options = options;
    this.setPosition(this.options.posX, 0);
    this.sprite.anchor.set(0.5, 1);
    this.sprite.animationSpeed = 0.2;
    this.sprite.interactive = true;
    this.sprite.cursor = 'pointer';
    window.addEventListener('resize', this.onResize.bind(this));
    this.sprite.on('pointerdown', this.onClick.bind(this));
    this.sprite.play();
  }

  public static load() : Promise<Spritesheet> {
    return Assets.load(`../assets/sprites/${this.alienType}.json`);
  }

  setState(state: StateType) {
    this.state = state;
    this.sprite.textures = this.spriteSheet.animations[this.state];
  }

  walk() {
    this.setPosition(this.sprite.x + 2, this.app.screen.height / 100 * 68);
  }

  stop() {
    this.sprite.stop();
    this.sprite.interactive = false;
    this.isActive = false;
  }

  setPosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  onResize() {
    if (this.state !== 'dead') {
      this.setPosition(this.sprite.x, this.app.screen.height / 100 * 68);
    }
  }

  onClick() {
    this.sprite.stop();
    this.setState('dead');
    this.sprite.play();
    setTimeout(() => {
      this.stop();
      if (this.sprite.texture) this.sprite.destroy();
    }, 400);
  }
}
