import MainContainer from './MainContainer';
import Gotoku from '../Heroes/Gotoku';
import ResultContainer from './ResultContainer';
import AlienOptions from '../Heroes/AlienInterface';
import { Application } from 'pixi.js';

export default class AlienContainer extends MainContainer {
  aliens: Gotoku[] = [];
  resultContainer: ResultContainer;
  isAliensInitialized: boolean = false;

  constructor(app: Application, alienOptions: AlienOptions[], resultContainer: ResultContainer) {
    super(app);
    this.resultContainer = resultContainer;
    this._initAliens(alienOptions);
  }

  private async _initAliens(alienOptions: AlienOptions[]) {
    const spriteSheet = await Gotoku.load();
    for (const itemOptions of alienOptions) {
      const alien = new Gotoku(this.app, spriteSheet, itemOptions);
      this.container.addChild(alien.sprite);
      this.aliens.push(alien);
    }
    this.isAliensInitialized = true;
  }

  stopAliens() {
    this.aliens.forEach((alien: Gotoku) => alien.stop());
  }

  protected _update(this: any, dt: number): any {
    if (this.isAliensInitialized) {
      if (this.aliens.length === 0) this.resultContainer.setState('win');
      this.aliens.forEach((alien: Gotoku, index: number) => {
        if (alien.state === 'dead') {
          this.aliens.splice(index, 1);
          return;
        }
        if (alien.isActive && alien.sprite.x < this.app.screen.width - 40) {
          alien.walk();
        } else {
          this.resultContainer.setState('lose');
          this.stopAliens();
        }
      });
    }
  }
}
