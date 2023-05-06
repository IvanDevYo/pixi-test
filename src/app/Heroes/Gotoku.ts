import { Assets, Spritesheet, Texture } from 'pixi.js';
import Alien from './Alien';
import AlienOptions from './AlienInterface';

export default class Gotoku extends Alien {
  static readonly alienType: string = 'gotoku';

  constructor(spriteSheet: Spritesheet, options: AlienOptions) {
    super(spriteSheet, options);
  }
}
