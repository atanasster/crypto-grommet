
export const symbolParities = {
  'USD': 'USDT',
  'USDT': 'USD',
  'EUR': 'EURT',
  'EURT': 'EUR',
};

export const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
