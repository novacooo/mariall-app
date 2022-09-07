import { gql } from '@apollo/client';

interface IEmployee {
  id: number;
  attributes: {
    firstName: string;
    lastName?: string;
  };
}

export interface GetEmployeesQueryPayload {
  employees: {
    data: IEmployee[];
  };
}

export const getEmployeesQuery = gql`
  query GetEmployees {
    employees {
      data {
        id
        attributes {
          firstName
          lastName
        }
      }
    }
  }
`;
