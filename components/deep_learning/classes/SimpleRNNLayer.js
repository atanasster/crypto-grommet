/**
 * Created by atanasster on 6/5/17.
 */

import DenseLayer from './DenseLayer';

export default class SimpleRNNLayer extends DenseLayer {
  constructor(props) {
    super(props);
    this.addInitializerProperty('recurrent_initializer', 'Recurrent initializer', 'initializer for the recurrent_kernel weights matrix');
    this.addRegularizerProperty('recurrent_regularizer', 'Recurrent regularizer', 'applied to the recurrent_kernel weights matrix');
    this.addConstraintProperty('recurrent_constraint', 'Recurrent constraint', 'applied to the recurrent_kernel weights matrix');

    this.addNumberProperty({
      name: 'dropout',
      label: 'Dropout',
      help: 'drop ratio of the linear transformation of the inputs',
      min: 0,
      max: 1,
      step: 0.1,
    });
    this.addNumberProperty({
      name: 'recurrent_dropout',
      label: 'Recurrent dropout',
      help: 'drop ratio of the linear transformation of the recurrent state',
      min: 0,
      max: 1,
      step: 0.1,
    });

    this.addBooleanProperty({
      name: 'unroll',
      label: 'Unroll',
      help: 'unrolling can speed-up the model',
    });

    this.addBooleanProperty({
      name: 'stateful',
      label: 'Stateful',
      help: 'use state of each sample for next batch',
    });
    this.addBooleanProperty({
      name: 'go_backwards',
      label: 'Backwards',
      help: 'process the input sequence backward',
    });
  }
}
