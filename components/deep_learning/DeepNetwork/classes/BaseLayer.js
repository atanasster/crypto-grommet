/**
 * Created by atanasster on 6/5/17.
 */

import PropTypes from 'prop-types';
import BaseForm from './BaseForm';
import LayerInitializer from '../properties/LayerInitializer';
import LayerRegularizer from '../properties/LayerRegularizer';
import LayerConstraint from '../properties/LayerConstraint';
import { constraintsList, initializersList, regularizersList } from '../properties/PropLists';

export default class BaseLayer extends BaseForm {
  constructor(props) {
    super(props);
    this.addTextProperty({
      name: 'name',
      label: 'Name',
      help: 'name of the layer',
    });
  }


  addRegularizerProperty(name, label, help) {
    const { kerasDefaults } = this.props;

    this.addProperty(LayerRegularizer, {
      name,
      label,
      help,
      options: regularizersList,
      defaults: kerasDefaults.regularizers,
      kerasDefaults,
      value: this.propValue(name),
      key: this.properties.length,
    });
  }

  addConstraintProperty(name, label, help) {
    const { kerasDefaults } = this.props;
    this.addProperty(LayerConstraint, {
      name,
      label,
      help,
      options: constraintsList,
      defaults: kerasDefaults.constraints,
      kerasDefaults,
      value: this.propValue(name),
      key: this.properties.length,
    });
  }
  addInitializerProperty(name, label, help) {
    const { kerasDefaults } = this.props;
    this.addProperty(LayerInitializer, {
      name,
      label,
      help,
      options: initializersList,
      defaults: kerasDefaults.initializers,
      kerasDefaults,
      value: this.propValue(name),
      key: this.properties.length,
    });
  }
}

BaseLayer.propTypes = {
  kerasDefaults: PropTypes.object.isRequired,
};

