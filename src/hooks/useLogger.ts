import { Enum_Log_Type, useCreateLogMutation } from 'graphql/generated/schema';
import { LogType } from 'types/LogType';
import { selectUserId } from 'features/user/userSlice';

import { useAppSelector } from './useAppSelector';

interface ICreateLogPayload {
  description: string;
}

export const useLogger = () => {
  const userId = useAppSelector(selectUserId);

  const [createLogMutation] = useCreateLogMutation();

  const sendCreateLog = (type: LogType, description: string) => {
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

  const createInfoLog = ({ description }: ICreateLogPayload) => {
    sendCreateLog(Enum_Log_Type.Info, description);
  };

  const createWarningLog = ({ description }: ICreateLogPayload) => {
    sendCreateLog(Enum_Log_Type.Warning, description);
  };

  const createErrorLog = ({ description }: ICreateLogPayload) => {
    sendCreateLog(Enum_Log_Type.Error, description);
  };

  return { createInfoLog, createWarningLog, createErrorLog };
};
