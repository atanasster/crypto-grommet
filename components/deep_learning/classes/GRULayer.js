/**
 * Created by atanasster on 6/5/17.
 */

import SimpleRNNLayer from './SimpleRNNLayer';

export default class GRULayer extends SimpleRNNLayer {
  constructor(props) {
    super(props);
    this.addActivationProperty('recurrent_activation', 'Recurrent activation', 'activation function for the recurrent step');
  }
}
