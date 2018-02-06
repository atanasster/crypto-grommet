/* eslint-disable no-unused-vars */
import resource from 'resource-router-middleware';
import list, { exchangeDetails } from '../models/exchanges';

export default ({ config, db }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'exchange',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    const exchange = exchangeDetails(id);
    const err = exchange ? null : 'Not found';
    callback(err, exchange);
  },

  /** GET / - List all entities */
  index({ params }, res) {
    res.json({ data: list });
  },

  /** GET /:id - Return a given entity */
  read({ exchange }, res) {
    res.json({ data: exchange });
  },
});
