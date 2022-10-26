import { Enum_Log_Type, useCreateLogMutation } from 'graphql/generated/schema';
import { LogType } from 'types/LogType';
import { selectUserId } from 'features/user/userSlice';

import { useAppSelector } from './useAppSelector';

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

  const sendInfoLog = (description: string) => {
    sendCreateLog(Enum_Log_Type.Info, description);
  };

  const sendWarningLog = (description: string) => {
    sendCreateLog(Enum_Log_Type.Warning, description);
  };

  const sendErrorLog = (description: string) => {
    sendCreateLog(Enum_Log_Type.Error, description);
  };

  return { sendInfoLog, sendWarningLog, sendErrorLog };
};
