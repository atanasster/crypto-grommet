import * as tf from '@tensorflow/tfjs';
import FullFieldsInitializer from './fullFieldsInitializer';


export default class TruncateNormal extends FullFieldsInitializer {
  static displayName = 'Truncate normal';
  tf = () => tf.initializers.truncatedNormal({
    mean: this.getPropValue('mean'),
    stddev: this.getPropValue('stddev'),
    seed: this.getPropValue('seed'),
  });
}
