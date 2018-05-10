import * as tf from '@tensorflow/tfjs';
import FullFieldsInitializer from './fullFieldsInitializer';


export default class RandomNormal extends FullFieldsInitializer {
  static displayName = 'Random normal';
  tf = () => tf.initializers.randomNormal({
    mean: this.getPropValue('mean'),
    stddev: this.getPropValue('stddev'),
    seed: this.getPropValue('seed'),
  });
}
