import MainContainer from './MainContainer';

interface Options {
  x: number,
  y: number,
}

export default class AlienContainer extends MainContainer{
  constructor(options? : Options) {
    super();
    if (options) {
      this.setContainerPosition(options);
    }
  }

  setContainerPosition(options: Options) {
    this.container.x = options.x;
    this.container.y = options.y;
  }
}
