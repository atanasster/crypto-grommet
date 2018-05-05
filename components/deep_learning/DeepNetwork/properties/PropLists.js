/**
 * Created by atanasster on 6/11/17.
 */
export const activationsList = [
  { 'value': 'tanh', 'label': 'Tanh' },
  { 'value': 'sigmoid', 'label': 'Sigmoid' },
  { 'value': 'elu', 'label': 'eLU' },
  { 'value': 'relu', 'label': 'reLU' },
  { 'value': 'hard_sigmoid', 'label': 'Hard Sigmoid' },
  { 'value': 'linear', 'label': 'Linear' },
  { 'value': 'softplus', 'label': 'SoftPlus' },
  { 'value': 'softsign', 'label': 'SoftSign' },
  { 'value': 'softmax', 'label': 'SoftMax' },


];
export const constraintsList = [{ 'value': 'max_norm', 'label': 'Maximum norm' },
  { 'value': 'non_neg', 'label': 'Non negativity' },
  { 'value': 'unit_norm', 'label': 'Unit norm' },
];

export const advancedActivations = [
  { 'value': 'LeakyReLU', 'label': 'Leaky reLU' },
  { 'value': 'PReLU', 'label': 'Parametric reLU' },
  { 'value': 'ThresholdedReLU', 'label': 'Thresholded reLU' },
  { 'value': 'ELU', 'label': 'Exponential Linear Unit' },
];
export const initializersList = [{ 'value': 'Zeros', 'label': 'Zeros' },
  { 'value': 'Ones', 'label': 'Ones' },
  { 'value': 'Constant', 'label': 'Constant' },
  { 'value': 'lecun_uniform', 'label': 'LeCun uniform' },
  { 'value': 'glorot_normal', 'label': 'Glorot normal' },
  { 'value': 'glorot_uniform', 'label': 'Glorot uniform' },
  { 'value': 'he_normal', 'label': 'He normal' },
  { 'value': 'he_uniform', 'label': 'He uniform' },
  { 'value': 'Orthogonal', 'label': 'Orthogonal' },
  { 'value': 'Identity', 'label': 'Identity' },
  { 'value': 'RandomNormal', 'label': 'Random normal' },
  { 'value': 'RandomUniform', 'label': 'Random uniform' },
  { 'value': 'TruncatedNormal', 'label': 'Truncated normal' },
  { 'value': 'VarianceScaling', 'label': 'Variance scaling' },

];


export const regularizersList = [{ 'value': 'l1', 'label': 'L1' },
  { 'value': 'l2', 'label': 'L2' },
  { 'value': 'l1_l2', 'label': 'L1_L2' }];


export const optimizersList =
    [{ value: 'SGD', label: 'SGD' },
      { value: 'RMSprop', label: 'RMSProp' },
      { value: 'Adagrad', label: 'Adagrad' },
      { value: 'Adadelta', label: 'Adadelta' },
      { value: 'Adam', label: 'Adam' },
      { value: 'Adamax', label: 'Adamax' },
      { value: 'Momentum', label: 'Momentum' }];
