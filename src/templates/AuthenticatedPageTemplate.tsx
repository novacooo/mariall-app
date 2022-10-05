import { authSessionsCount } from 'constants/session';
import { selectUserIsLogged, selectUserRememberCredentials } from 'features/user/userSlice';
import { useAppSelector, useSignOut } from 'hooks';
import { Navigate } from 'react-router-dom';
import { routes } from 'routes';

interface AuthenticatedPageTemplateProps {
  children: JSX.Element;
}

/**
 * Counting the number of authenticated sessions for a user using sessionStorage
 */
const countAuthSessions = () => {
  const item = sessionStorage.getItem(authSessionsCount);
  if (!item) {
    sessionStorage.setItem(authSessionsCount, '1');
    return;
  }
  sessionStorage.setItem(authSessionsCount, (+item + 1).toString());
};

const AuthenticatedPageTemplate = ({ children }: AuthenticatedPageTemplateProps) => {
  countAuthSessions();

  const authSessions = sessionStorage.getItem(authSessionsCount);

  const isLogged = useAppSelector(selectUserIsLogged);
  const rememberCredentials = useAppSelector(selectUserRememberCredentials);
  const signOut = useSignOut();

  // If the user didn't want to be remembered, sign out
  if (authSessions === '1' && rememberCredentials === false) {
    void signOut();
  }

  if (!isLogged) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

export default AuthenticatedPageTemplate;
