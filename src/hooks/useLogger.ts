import { Enum_Log_Type, useCreateLogMutation } from 'graphql/generated/schema';
import { LogType } from 'types/LogType';
import { selectUserId } from 'features/user/userSlice';

import { useAppSelector } from './useAppSelector';

interface ICreateLogPayload {
  type?: LogType;
  description: string;
}

export const useLogger = () => {
  const userId = useAppSelector(selectUserId);

  const [createLogMutation] = useCreateLogMutation();

  const createLog = ({ type = Enum_Log_Type.Info, description }: ICreateLogPayload) => {
    if (!userId) return;

    void createLogMutation({
      variables: {
        type,
        description,
        userId,
        date: new Date(),
      },
    });
  };

  return { createLog };
};
