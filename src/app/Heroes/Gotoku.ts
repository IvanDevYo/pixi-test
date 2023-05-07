import Alien from './Alien';

enum AlienType {
  Gotoku = 'gotoku',
}

export default class Gotoku extends Alien {
  static readonly alienType: AlienType = AlienType.Gotoku;
}
