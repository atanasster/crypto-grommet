export const server = process.env.NODE_ENV === 'production' ? '' : '//localhost:8568';
export const apiServer = `${server}/api`;

export const actionToKey = action => (`${action.exchange}_${action.symbol}_${action.toSymbol}`);
