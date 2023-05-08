import MainContainer from './MainContainer';
import AlienContainer from './AlienContainer';
import { Application, Text, TextStyle } from 'pixi.js';


export default class ScoreContainer extends MainContainer {
  private _alienContainer: AlienContainer;
  private readonly _scoreText: Text;

  constructor(app: Application, alienContainer: AlienContainer) {
    super(app);

    this._alienContainer = alienContainer;

    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 28,
      fill: 0x000000,
    });

    this._scoreText = new Text('', style);
    this._scoreText.x = 50;
    this._scoreText.y = 10;
    this.container.addChild(this._scoreText);
  }

  protected _update(this: any, delta: number) {
    this._scoreText.text = `Осталось врагов ${this._alienContainer.aliens.length}`;
  }
}
