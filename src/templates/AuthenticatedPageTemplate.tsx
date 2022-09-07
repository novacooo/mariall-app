import { useAppSelector } from 'app/hooks';
import { selectIsLogged } from 'features/user/userSlice';
import { Navigate } from 'react-router-dom';
import { routes } from 'routes';

interface AuthenticatedPageTemplateProps {
  children: JSX.Element;
}

const AuthenticatedPageTemplate = ({ children }: AuthenticatedPageTemplateProps) => {
  const isLogged = useAppSelector(selectIsLogged);

  if (!isLogged) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

export default AuthenticatedPageTemplate;
