import * as tf from '@tensorflow/tfjs';
import SeedOnlyInitializer from './seedOnlyInitializer';


export default class GlorotNormal extends SeedOnlyInitializer {
  static displayName = 'Glorot normal';
  tf = () => tf.initializers.glorotNormal({
    seed: this.getPropValue('seed'),
  });
}
