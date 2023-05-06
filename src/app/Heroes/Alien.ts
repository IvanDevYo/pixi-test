import AlienOptions from './AlienInterface';
import AlienContainer from '../containers/AlienContainer';
import { AnimatedSprite, Assets, Texture, Spritesheet } from 'pixi.js';

type StateType = 'idle' | 'dead' | 'walk';

export default class Alien {
  sprite: AnimatedSprite;
  spriteSheet: Spritesheet;
  state: StateType = 'walk';
  options: AlienOptions;
  static readonly alienType: string;

  constructor(spriteSheet: Spritesheet, options: AlienOptions) {
    this.spriteSheet = spriteSheet;
    this.sprite = new AnimatedSprite(this.spriteSheet.animations[this.state]);
    this.options = options;
    this.setPosition(this.options.posX, 0);
    this.sprite.animationSpeed = 0.1666;
    this.sprite.interactive = true;
    this.sprite.cursor = 'pointer';
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

  walk(container: AlienContainer) {
    this.setPosition(this.sprite.x + 1, container.height / 2 - 100);
  }

  setPosition(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  onClick() {
    this.sprite.stop();
    this.setState('dead');
    this.sprite.play();
    setTimeout(() => {
      this.sprite.stop();
      this.sprite.destroy();
    }, 400);
  }
}
