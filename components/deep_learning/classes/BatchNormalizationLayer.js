/**
 * Created by atanasster on 6/5/17.
 */

import BaseKerasLayer from './BaseKerasLayer';

export default class BatchNormalizationLayer extends BaseKerasLayer {
  constructor(props) {
    super(props);
    this.addNumberProperty({
      name: 'axis',
      label: 'Axis',
      min: -50,
      max: 50,
      step: 1,
    });
    this.addNumberProperty({
      name: 'momentum',
      label: 'Momentum',
      help: 'momentum for the moving average',
      min: 0,
      max: 50,
      step: 0.01,
    });
    this.addNumberProperty({
      name: 'epsilon',
      label: 'Epsilon',
      help: 'added to variance to avoid div by zero',
      min: 0,
      max: 0.5,
      step: 0.001,
    });
    this.addBooleanProperty({
      name: 'center',
      label: 'Center',
      help: 'add offset of beta to normalized tensor',
    });
    this.addBooleanProperty({
      name: 'scale',
      label: 'Scale',
      help: 'multiply by gamma',
    });

    this.addInitializerProperty('moving_mean_initializer', 'Moving mean initializer', '');
    this.addInitializerProperty('moving_variance_initializer', 'Moving variance initializer', '');

    this.addInitializerProperty('beta_initializer', 'Beta initializer', 'initializer for beta weight');
    this.addRegularizerProperty('beta_regularizer', 'Beta regularizer', 'applied to beta weight');
    this.addConstraintProperty('beta_constraint', 'Beta constraint', 'applied to beta weight');

    this.addInitializerProperty('gamma_initializer', 'Gamma initializer', 'initializer for gamma weight');
    this.addRegularizerProperty('gamma_regularizer', 'Gamma regularizer', 'applied to gamma weight');
    this.addConstraintProperty('gamma_constraint', 'Gamma constraint', 'applied to gamma weight');
  }
}
