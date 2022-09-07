import { gql } from '@apollo/client';

export interface GetUserInfoQueryPayload {
  me: {
    id: number;
    email?: string;
    role?: {
      name?: string;
    };
  };
}

export const getUserInfoQuery = gql`
  query GetUserInfo {
    me {
      id
      email
      role {
        name
      }
    }
  }
`;
