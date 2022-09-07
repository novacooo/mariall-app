import { useApolloClient } from '@apollo/client';
import { useAppDispatch } from 'app';
import { logoutUser } from 'features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';

export const useSignOut = () => {
  const client = useApolloClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      dispatch(logoutUser());
      await client.resetStore();
      navigate(routes.login);
    } catch (e) {
      console.error(e);
    }
  };

  return signOut;
};
