/**
 * Created by atanasster on 6/5/17.
 */
import GRULayer from './GRULayer';

export default class LSTMLayer extends GRULayer {
  constructor(props) {
    super(props);
    this.addBooleanProperty({
      name: 'unit_forget_bias',
      label: 'Unit forget bias',
      help: 'add 1 to the bias of the forget gate at initialization',
    });
  }
}
