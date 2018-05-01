import React from 'react';
import LinksMenu from '../LinksMenu';


export default ({
  activeItem, exchange,
}) => {
  const exchangeMenu = [
    {
      route: 'exchange_info',
      params: { exchange },
      label: 'Prices',
      a11yTitle: `Favorite coins prices on ${exchange}`,
      plain: true,
    },
    {
      route: 'exchange_order_books',
      params: { exchange },
      label: 'Order books',
      a11yTitle: `TFavorite coins order books on ${exchange}`,
      plain: true,
    },
    {
      route: 'exchange_currencies',
      params: { exchange },
      label: 'Currencies',
      a11yTitle: `Trading currencies on ${exchange}`,
      plain: true,
    },
    {
      route: 'exchange_fees',
      params: { exchange },
      label: 'Fees',
      a11yTitle: `Trading and funcding fees on ${exchange}`,
      plain: true,
    },

  ];
  return (
    <LinksMenu items={exchangeMenu} activeItem={activeItem} />
  );
};
