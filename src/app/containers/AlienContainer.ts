import MainContainer from './MainContainer';
import AlienOptions from '../Heroes/AlienInterface';
import { AnimatedSprite, Application, TickerCallback } from 'pixi.js';
import Gotoku from '../Heroes/Gotoku';

interface Options {
  x: number,
  y: number,
}

enum AlienType {
  Gotoku = 'gotoku',
}

export default class AlienContainer extends MainContainer {
  aliens: Gotoku[] = [];

  constructor(app: Application, alienOptions: AlienOptions[], options? : Options) {
    super(app);
    if (options) {
      this.setContainerPosition(options);
    }
    this.initAliens(alienOptions);
  }

  setContainerPosition(options: Options) {
    this.container.x = options.x;
    this.container.y = options.y;
  }

  async initAliens(alienOptions: AlienOptions[]) {
    const spriteSheet = await Gotoku.load();
    for (let itemOptions of alienOptions) {
      const alien = new Gotoku(spriteSheet, itemOptions);
      this.container.addChild(alien.sprite);
      this.aliens.push(alien);
    }
    this.app.ticker.add(this.update);
  }

  update(this: any, dt: number): any {
    for (let alien of this.aliens) {
      if (alien.state === 'dead') return;
      if (alien.sprite && alien.sprite.x < this.container.width - 450) {
        alien.walk(this);
      }
    }
    return;
  }
}
