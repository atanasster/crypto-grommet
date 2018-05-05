/**
 * Created by atanasster on 6/5/17.
 */

import BaseKerasLayer from './BaseKerasLayer';

export default class DropoutLayer extends BaseKerasLayer {
  constructor(props) {
    super(props);
    this.addNumberProperty({
      name: 'rate',
      label: 'Rate',
      help: 'fraction of the input units to drop',
      min: 0,
      max: 1,
      step: 0.1,
    });
    this.addNumberProperty({
      name: 'seed',
      label: 'Seed',
      help: 'random seed',
      min: 0,
      max: 500,
      step: 1,
    });
  }
}
