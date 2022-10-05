import { UserRole } from 'constants/UserRole';
import { selectUserRole } from 'features/user/userSlice';
import { useAppSelector } from 'hooks';
import { Navigate } from 'react-router-dom';
import { routes } from 'routes';

interface ProtectedTabTemplateProps {
  children: JSX.Element;
}

const ProtectedTabTemplate = ({ children }: ProtectedTabTemplateProps) => {
  const userRole = useAppSelector(selectUserRole);

  if (userRole !== UserRole.AUTHENTICATED && userRole !== UserRole.ADMINISTRATOR) {
    return <Navigate to={`${routes.panel}/${routes.panelAddingQuantity}`} replace />;
  }

  return children;
};

export default ProtectedTabTemplate;
