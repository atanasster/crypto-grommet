import App from '../components/App';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import withData from '../apollo/withData';

export default withData(({ url: { query: { token } } }) => (
  <App title='Reset password'>
    <ResetPasswordForm token={token} />
  </App>
));
