import { gql } from '@apollo/client';

export interface LoginUserMutationPayload {
  login: {
    jwt: string;
  };
}

export interface LoginUserMutationVariables {
  email: string;
  password: string;
}

export const loginUserMutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;
