import { Assets } from 'pixi.js';
import Alien from './Alien';
import AlienOptions from './AlienInterface';

export default class Gotoku extends Alien {
  constructor(options: AlienOptions) {
    super(options);
    Assets.load('../assets/sprites/gotoku.json').then(this.setSpriteSheet.bind(this));
  }
}
