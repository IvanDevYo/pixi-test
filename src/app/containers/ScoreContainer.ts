import MainContainer from './MainContainer';
import { Application, Text, TextStyle } from 'pixi.js';
import AlienContainer from './AlienContainer';


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

    this.app.ticker.add(this.update);
  }

  update(this: any, delta: number) {
    this.scoreText.text = `Осталось врагов ${this.alienContainer.aliens.length}`;
  }
}
