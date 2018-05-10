import Optimizer from './optimizers/index';
import Layer from './layers/index';
import Regularizer from './regularizers/index';
import Initializer from './initializers/index';
import Constraint from './constraints/index';

const TfClasses = {
  Layer,
  Optimizer,
  Regularizer,
  Initializer,
  Constraint,
};

export default {
  createObject: ({ type, config }) => (
    TfClasses[type] ? new TfClasses[type]({ type, ...config }) : undefined
  ),
};

