import { Assets, Spritesheet, Texture } from 'pixi.js';
import Alien from './Alien';
import AlienOptions from './AlienInterface';

enum AlienType {
  Gotoku = 'gotoku',
}

export default class Gotoku extends Alien {
  static readonly alienType: AlienType = AlienType.Gotoku;

  constructor(spriteSheet: Spritesheet, options: AlienOptions) {
    super(spriteSheet, options);
  }
}
