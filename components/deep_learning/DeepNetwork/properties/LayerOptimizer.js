/**
 * Created by atanasster on 6/5/17.
 */
import ComposedProperty from './ComposedProperty';
import BaseForm from '../classes/BaseForm';

class SGD extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'momentum',
      label: 'Momentum',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
    this.addBooleanField({
      name: 'nesterov',
      label: 'Nesterov momentum',
    });
  }
}


class Adam extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'beta_1',
      label: 'Beta 1',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'beta_2',
      label: 'Beta 2',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'epsilon',
      label: 'Epsilon',
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
}

class Adamax extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'beta_1',
      label: 'Beta 1',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'beta_2',
      label: 'Beta 2',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'epsilon',
      label: 'Epsilon',
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
}

class Nadam extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'beta_1',
      label: 'Beta 1',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'beta_2',
      label: 'Beta 2',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
}

class RMSprop extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'rho',
      label: 'Rho',
      min: 0.9,
      max: 0.999,
      step: 0.001,
    });
    this.addNumericField({
      name: 'epsilon',
      label: 'Epsilon',
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
}

class Adadelta extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'rho',
      label: 'Rho',
      min: 0.9,
      max: 0.999,
      step: 0.001,
    });
    this.addNumericField({
      name: 'epsilon',
      label: 'Epsilon',
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
}

class Adagrad extends BaseForm {
  constructor(props) {
    super(props);
    this.addNumericField({
      name: 'lr',
      label: 'Learning rate',
      min: 0,
      max: 1,
      step: 0.001,
    });
    this.addNumericField({
      name: 'epsilon',
      label: 'Epsilon',
      min: 0,
      max: 0.001,
      step: 0.0001,
    });
    this.addNumericField({
      name: 'decay',
      label: 'Decay',
      min: 0,
      max: 0.1,
      step: 0.01,
    });
  }
}


export default class LayerOptimizer extends ComposedProperty {
  static getSettings = (className) => {
    switch (className) {
      case 'SGD': return SGD;
      case 'Adam': return Adam;
      case 'Adamax': return Adamax;
      case 'Nadam': return Nadam;
      case 'RMSprop': return RMSprop;
      case 'Adadelta': return Adadelta;
      case 'Adagrad': return Adagrad;
      default: return null;
    }
  }
}
