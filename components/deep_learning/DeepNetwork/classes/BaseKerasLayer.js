/**
 * Created by atanasster on 6/11/17.
 */
import BaseLayer from './BaseLayer';
import LayerActivation from '../properties/LayerActivation';
import { activationsList } from '../properties/PropLists';

export default class BaseKerasLayer extends BaseLayer {
  addActivationProperty(name, label, help) {
    const { kerasDefaults } = this.props;
    this.addProperty(LayerActivation, {
      name,
      label,
      help,
      options: activationsList,
      defaults: kerasDefaults.activations,
      kerasDefaults,
      value: this.propValue(name),
      key: `form_${name}_${this.properties.length}`,
    });
  }
}
