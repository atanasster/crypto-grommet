/**
 * Created by atanasster on 6/5/17.
 */

import BaseKerasLayer from './BaseKerasLayer';

export default class ActivationLayer extends BaseKerasLayer {
  constructor(props) {
    super(props);
    this.addActivationProperty('activation', 'Activation', 'activation function');
  }
}
