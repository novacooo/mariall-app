import { useAppSelector } from 'app/hooks';
import { selectUserIsLogged } from 'features/user/userSlice';
import { Navigate } from 'react-router-dom';
import { routes } from 'routes';

interface AuthenticatedPageTemplateProps {
  children: JSX.Element;
}

const AuthenticatedPageTemplate = ({ children }: AuthenticatedPageTemplateProps) => {
  const isLogged = useAppSelector(selectUserIsLogged);

  if (!isLogged) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

export default AuthenticatedPageTemplate;
