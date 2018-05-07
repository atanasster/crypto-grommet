import Optimizer from './optimizers';


export default {
  optimizer: props => (new Optimizer(props)),
};

