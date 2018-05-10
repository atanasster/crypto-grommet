import * as tf from '@tensorflow/tfjs';
import BaseConfig from '../BaseConfig';


export default class NonNeg extends BaseConfig {
  static displayName = 'Non neg';
  tf = () => tf.constraints.nonNeg();
}
