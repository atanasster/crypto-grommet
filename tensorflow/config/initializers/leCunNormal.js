import * as tf from '@tensorflow/tfjs';
import SeedOnlyInitializer from './seedOnlyInitializer';


export default class LeCunNormal extends SeedOnlyInitializer {
  static displayName = 'LeCun normal';
  tf = () => tf.initializers.leCunNormal({
    seed: this.getPropValue('seed'),
  });
}
