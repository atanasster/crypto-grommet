import * as tf from '@tensorflow/tfjs';
import SeedOnlyInitializer from './seedOnlyInitializer';

export default class GlorotUniform extends SeedOnlyInitializer {
  static displayName = 'Glorot uniform';
  tf = () => tf.initializers.glorotUniform({
    seed: this.getPropValue('seed'),
  });
}
