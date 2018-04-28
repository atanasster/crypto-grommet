import { ApolloLink, Observable } from 'apollo-link';
import initApollo from '../../apollo/initApollo';
import { store } from '../../redux';
import { setToken, signOut } from '../../redux/auth/actions';
import REFRESH_TOKENS_MUTATION from './graphql/RefreshToken.graphql';

const setJWTContext = async (operation) => {
  const { token } = store.getState().auth;
  if (!token) {
    return null;
  }
  return operation.setContext(context => ({
    ...context,
    headers: {
      Authorization: token ? `JWT ${token}` : null,
    },
  }));
};

const isTokenRefreshNeeded = async (operation, result) => {
  let needRefresh = false;
  const { token } = store.getState().auth;
  if (token && operation.operationName !== 'refreshToken') {
    if (result.errors) {
      needRefresh = result.errors.find(error => (error.message && error.message.indexOf('Not Authenticated') >= 0));
    } else if (operation.operationName === 'currentUser' && result.data.currentUser === null) {
      // We have refresh token here, and empty current user received as a network request result,
      // it means we need to refresh tokens
      needRefresh = true;
    }
  }
  return needRefresh;
};

const JWTLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  let sub;
  let retrySub;
  (async () => {
    if (['login', 'refreshToken'].indexOf(operation.operationName) < 0) {
      await setJWTContext(operation);
    }
    try {
      sub = forward(operation).subscribe({
        next: async (result) => {
          let retry = false;
          if (operation.operationName !== 'login' && await isTokenRefreshNeeded(operation, result)) {
            try {
              const client = initApollo();
              const { data: { token } } =
                await client.mutate({
                  mutation: REFRESH_TOKENS_MUTATION,
                  variables: { token: store.getState().auth.token },
                });
              console.log('DID REFRESH', token);
              store.dispatch(setToken(token));
              // Retry current operation
              await setJWTContext(operation);
              retrySub = forward(operation).subscribe(observer);
              retry = true;
            } catch (e) {
              // We have received error during refresh -
              // drop tokens and return original request result
              await store.dispatch(signOut());
            }
          }
          if (!retry) {
            observer.next(result);
            observer.complete();
          }
        },
        error: observer.error.bind(observer),
        complete: () => {},
      });
    } catch (e) {
      observer.error(e);
    }
  })();

  return () => {
    if (sub) sub.unsubscribe();
    if (retrySub) retrySub.unsubscribe();
  };
}));

export default JWTLink;
