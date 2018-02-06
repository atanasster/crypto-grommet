/* eslint-disable no-unused-vars */
import resource from 'resource-router-middleware';
import coins from '../models/coins';

export default ({ config, db }) => resource({
  id: 'coins',

  index({ params }, res) {
    res.json({ data: coins() });
  },

});
