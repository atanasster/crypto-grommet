import coins from '../models/coins';

export default (req, res) => {
  res.json({ data: coins() });
};
