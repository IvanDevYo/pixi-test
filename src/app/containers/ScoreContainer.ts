import MainContainer from './MainContainer';
import AlienContainer from './AlienContainer';
import { Application, Text, TextStyle } from 'pixi.js';


export default class ScoreContainer extends MainContainer {
  alienContainer: AlienContainer;
  scoreText: Text;

  constructor(app: Application, alienContainer: AlienContainer) {
    super(app);

    this.alienContainer = alienContainer;

    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 28,
      fill: 0x000000,
    });

    this.scoreText = new Text('', style);
    this.scoreText.x = 50;
    this.scoreText.y = 10;
    this.container.addChild(this.scoreText);
  }

  protected _update(this: any, delta: number) {
    this.scoreText.text = `Осталось врагов ${this.alienContainer.aliens.length}`;
  }
}
