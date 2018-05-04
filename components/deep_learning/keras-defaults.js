export default {
  'layers': [{
    'className': 'LSTM',
    'slug': 'LSTM',
    'config': {
      'trainable': true,
      'return_sequences': false,
      'go_backwards': false,
      'stateful': false,
      'unroll': false,
      'implementation': 0,
      'activation': 'tanh',
      'recurrent_activation': 'hard_sigmoid',
      'use_bias': true,
      'kernel_initializer': {
        'className': 'VarianceScaling',
        'config': {
          'scale': 1.0, 'mode': 'fan_avg', 'distribution': 'uniform', 'seed': null,
        },
      },
      'recurrent_initializer': { 'className': 'Orthogonal', 'config': { 'gain': 1.0, 'seed': null } },
      'bias_initializer': { 'className': 'Zeros', 'config': {} },
      'unit_forget_bias': true,
      'dropout': 0.0,
      'recurrent_dropout': 0.0,
    },
  }, {
    'className': 'Dense',
    'slug': 'Dense',
    'config': {
      'trainable': true,
      'activation': 'linear',
      'use_bias': true,
      'kernel_initializer': {
        'className': 'VarianceScaling',
        'config': {
          'scale': 1.0, 'mode': 'fan_avg', 'distribution': 'uniform', 'seed': null,
        },
      },
      'bias_initializer': { 'className': 'Zeros', 'config': {} },
    },
  }, {
    'className': 'GRU',
    'slug': 'GRU',
    'config': {
      'trainable': true,
      'return_sequences': false,
      'go_backwards': false,
      'stateful': false,
      'unroll': false,
      'implementation': 0,
      'activation': 'tanh',
      'recurrent_activation': 'hard_sigmoid',
      'use_bias': true,
      'kernel_initializer': {
        'className': 'VarianceScaling',
        'config': {
          'scale': 1.0, 'mode': 'fan_avg', 'distribution': 'uniform', 'seed': null,
        },
      },
      'recurrent_initializer': { 'className': 'Orthogonal', 'config': { 'gain': 1.0, 'seed': null } },
      'bias_initializer': { 'className': 'Zeros', 'config': {} },
      'dropout': 0.0,
      'recurrent_dropout': 0.0,
    },
  }, {
    'className': 'SimpleRNN',
    'slug': 'RNN',
    'config': {
      'trainable': true,
      'return_sequences': false,
      'go_backwards': false,
      'stateful': false,
      'unroll': false,
      'implementation': 0,
      'activation': 'tanh',
      'use_bias': true,
      'kernel_initializer': {
        'className': 'VarianceScaling',
        'config': {
          'scale': 1.0, 'mode': 'fan_avg', 'distribution': 'uniform', 'seed': null,
        },
      },
      'recurrent_initializer': { 'className': 'Orthogonal', 'config': { 'gain': 1.0, 'seed': null } },
      'bias_initializer': { 'className': 'Zeros', 'config': {} },
      'dropout': 0.0,
      'recurrent_dropout': 0.0,
    },
  },
  {
    'className': 'Activation',
    'slug': 'Act',
    'config': { 'trainable': true, 'activation': 'sigmoid' },
  },
  {
    'className': 'BatchNormalization',
    'slug': 'BN',
    'config': {
      'trainable': true,
      'axis': -1,
      'momentum': 0.99,
      'epsilon': 0.001,
      'center': true,
      'scale': true,
      'beta_initializer': {
        'className': 'Zeros',
        'config': {},
      },
      'gamma_initializer': {
        'className': 'Ones',
        'config': {},
      },
      'moving_mean_initializer': {
        'className': 'Zeros',
        'config': {},
      },
      'moving_variance_initializer': {
        'className': 'Ones',
        'config': {},
      },
    },
  },
  {
    'className': 'Dropout',
    'slug': 'DO',
    'config': {
      'trainable': true,
      'rate': 0.2,
    },
  },
  ],

  'activations': [],
  'constraints': [{ 'className': 'MaxNorm', 'config': { 'max_value': 2, 'axis': 0 } }, { 'className': 'NonNeg', 'config': {} }, { 'className': 'UnitNorm', 'config': { 'axis': 0 } }],
  'initializers': [{ 'className': 'Zeros', 'config': {} }, { 'className': 'Ones', 'config': {} }, { 'className': 'Constant', 'config': { 'value': 0 } }, { 'className': 'Orthogonal', 'config': { 'gain': 1.0 } }, { 'className': 'Identity', 'config': { 'gain': 1.0 } }, { 'className': 'RandomNormal', 'config': { 'mean': 0.0, 'stddev': 0.05 } }, { 'className': 'RandomUniform', 'config': { 'minval': -0.05, 'maxval': 0.05 } }, { 'className': 'TruncatedNormal', 'config': { 'mean': 0.0, 'stddev': 0.05 } }, { 'className': 'VarianceScaling', 'config': { 'scale': 1.0, 'mode': 'fan_in', 'distribution': 'normal' } }, { 'className': 'lecun_uniform', 'config': { 'seed': 1.0 } }, { 'className': 'glorot_normal', 'config': { 'seed': 1.0 } }, { 'className': 'glorot_uniform', 'config': { 'seed': 1.0 } }, { 'className': 'he_normal', 'config': { 'seed': 2.0 } }, { 'className': 'he_uniform', 'config': { 'seed': 2.0 } }],
  'regularizers': [{ 'className': 'l1', 'config': { 'l': 0.01 } }, { 'className': 'l2', 'config': { 'l': 0.01 } }, { 'className': 'l1_l2', 'config': { 'l1': 0.01, 'l2': 0.01 } }],
  'optimizers': [{
    'className': 'Adadelta',
    'config': {
      'lr': 1.0, 'rho': 0.95, 'decay': 0.0, 'epsilon': 1e-08,
    },
  }, { 'className': 'Adagrad', 'config': { 'lr': 0.01, 'decay': 0.0, 'epsilon': 1e-08 } }, {
    'className': 'Adam',
    'config': {
      'lr': 0.001, 'beta_1': 0.89999998, 'beta_2': 0.99900001, 'decay': 0.0, 'epsilon': 1e-08,
    },
  }, {
    'className': 'Adamax',
    'config': {
      'lr': 0.002, 'beta_1': 0.89999998, 'beta_2': 0.99900001, 'decay': 0.0, 'epsilon': 1e-08,
    },
  }, {
    'className': 'Nadam',
    'config': {
      'lr': 0.002, 'beta_1': 0.89999998, 'beta_2': 0.99900001, 'epsilon': 1e-08, 'schedule_decay': 0.004,
    },
  }, {
    'className': 'SGD',
    'config': {
      'lr': 0.01, 'momentum': 0.0, 'decay': 0.0, 'nesterov': false,
    },
  }, {
    'className': 'RMSprop',
    'config': {
      'lr': 0.001, 'rho': 0.89999998, 'decay': 0.0, 'epsilon': 1e-08,
    },
  }],
};

export const createLayer = (layers, className, params) => {
  const layer = layers.find(el => el.className === className);
  const config = layer ? layer.config : {};
  const { units, ...rest } = params;

  if (layer && layer.config.bias_initializer !== undefined) {
    rest.units = units;
  }
  return { ...layer, config: { ...config, ...rest } };
};
