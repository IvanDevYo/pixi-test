import MainContainer from './MainContainer';
import AlienOptions from '../Heroes/AlienInterface';
import { AnimatedSprite, Application, TickerCallback } from 'pixi.js';
import Gotoku from '../Heroes/Gotoku';
import Alien from '../Heroes/Alien';

export default class AlienContainer extends MainContainer {
  aliens: Gotoku[] = [];

  constructor(app: Application, alienOptions: AlienOptions[]) {
    super(app);
    this.container.zIndex = -1;
    this.initAliens(alienOptions);
    this.app.ticker.add(this.update);
  }

  async initAliens(alienOptions: AlienOptions[]) {
    const spriteSheet = await Gotoku.load();
    for (let itemOptions of alienOptions) {
      const alien = new Gotoku(this.app, spriteSheet, itemOptions);
      this.container.addChild(alien.sprite);
      this.aliens.push(alien);
    }
  }

  update(this: any, dt: number): any {
    this.aliens.forEach((alien: Gotoku, index: number) => {
      if (alien.state === 'dead') {
        this.aliens.splice(index, 1);
        return;
      }
      if (alien.sprite && alien.sprite.x < this.app.screen.width - 40) {
        alien.walk();
      }
    });
    return;
  }
}
