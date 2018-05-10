import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class Ones extends BaseConfig {
  static displayName = 'Ones';
  tf = () => tf.initializers.ones();
}
