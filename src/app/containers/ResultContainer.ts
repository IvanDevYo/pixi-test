import MainContainer from './MainContainer';
import { Application, Text, TextStyle } from 'pixi.js';

type ResultState = 'win' | 'lose' | 'idle';

export default class ResultContainer extends MainContainer {
  state: ResultState = 'idle';
  textResult: Text;

  constructor(app: Application) {
    super(app);
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 50,
      fill: 0x000000,
    });

    this.textResult = new Text('', style);
    this._onResize();
    this.container.addChild(this.textResult);
  }

  public setState(state: ResultState) {
    this.state = state;
  }

  protected _onResize() {
    this.textResult.x = this.app.screen.width / 2 - 100;
    this.textResult.y = this.app.screen.height / 2 - 50;
  }

  protected _update(this: any, delta: number) {
    switch (this.state) {
      case 'win': this.textResult.text = 'Победа!'; break;
      case 'lose': this.textResult.text = 'Потрачено'; break;
      case 'idle': this.textResult.text = ''; break;
    }
  }
}
