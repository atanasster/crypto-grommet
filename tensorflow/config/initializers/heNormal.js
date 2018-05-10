import * as tf from '@tensorflow/tfjs';
import SeedOnlyInitializer from './seedOnlyInitializer';


export default class HeNormal extends SeedOnlyInitializer {
  static displayName = 'he normal';
  tf = () => tf.initializers.heNormal({
    seed: this.getPropValue('seed'),
  });
}
