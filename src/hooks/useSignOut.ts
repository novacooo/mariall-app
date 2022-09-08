import { useApolloClient } from '@apollo/client';
import { useAppDispatch } from 'app';
import { logoutUser } from 'features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { useErrorToast } from './useErrorToast';

export const useSignOut = () => {
  const client = useApolloClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorToast = useErrorToast();

  const signOut = async () => {
    try {
      dispatch(logoutUser());
      await client.resetStore();
      navigate(routes.login);
    } catch (error) {
      errorToast(error);
    }
  };

  return signOut;
};
