/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from 'constants/UserRole';
import { selectUserRole } from 'features/user/userSlice';
import { useAppSelector } from 'hooks';
import { routes } from 'routes';

interface ProtectedTabTemplateProps {
  children: ReactNode;
}

const ProtectedTabTemplate = ({ children }: ProtectedTabTemplateProps) => {
  const userRole = useAppSelector(selectUserRole);

  if (userRole !== UserRole.AUTHENTICATED && userRole !== UserRole.ADMINISTRATOR) {
    return <Navigate to={`${routes.panel}/${routes.panelAddingQuantity}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedTabTemplate;
