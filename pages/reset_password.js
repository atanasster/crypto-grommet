import { withRouter } from 'next/router';
import App from '../components/App';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import withData from '../apollo/withData';

export default withRouter(withData(({ router: { query: { token, uid } } }) => (
  <App title='Reset password'>
    <ResetPasswordForm token={token} uid={uid} />
  </App>
)));
