import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';

export default class Zeros extends BaseConfig {
  static displayName = 'Zeros';
  tf = () => tf.initializers.zeros();
}
