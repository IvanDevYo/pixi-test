import AlienOptions from './AlienInterface';
import { AnimatedSprite, Container, Assets } from 'pixi.js';

type StateType = 'idle' | 'dead' | 'walk';

export default class Alien {
  sprite: AnimatedSprite | null = null;
  spriteSheet: any = null;
  state: StateType = 'walk';
  options: AlienOptions;

  constructor(options: AlienOptions) {
    this.options = options;
  }

  getSprite() {
    return this.sprite;
  }

  load() : Promise<any> {
    return Assets.load(`../assets/sprites/${this.options.alien}.json`).then(this.setSpriteSheet.bind(this));
  }

  setSpriteSheet(spriteSheet: any) {
    this.spriteSheet = spriteSheet;
    console.log(this.spriteSheet);
  }

  setState(state: StateType) {
    this.state = state;
  }

  walk(container: Container) {
    if (this.sprite) {
      this.setPosition(this.sprite.x + 1, container.height / 2 - 150);
    }
  }

  setPosition(x: number, y: number) {
    if (this.sprite) {
      this.sprite.x = x;
      this.sprite.y = y;
    }
  }

  onClick() {
    this.setState('dead');
    if (this.sprite instanceof AnimatedSprite) {
      this.sprite.stop();
      this.sprite.textures = this.spriteSheet.animations[this.state];
      this.sprite.play();
      setTimeout(() => {
        this.sprite?.stop();
        this.sprite?.destroy();
      }, 1);
    }
  }

  createSprite() {
    if (this.spriteSheet) {
      this.sprite = new AnimatedSprite(this.spriteSheet.animations[this.state]);
      this.setPosition(this.options.posX, 0);
      this.sprite.animationSpeed = 0.1666;
      this.sprite.interactive = true;
      this.sprite.cursor = 'pointer';
      this.sprite.on('pointerdown', this.onClick.bind(this));
      this.sprite.play();
    }
  }

  addToContainer(container: Container, state: StateType) {
    this.setState(state);
    this.createSprite();

    if (this.sprite) {
      container.addChild(this.sprite);
    }
  }
}
