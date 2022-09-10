import { gql } from '@apollo/client';

interface IProduct {
  id: number;
  attributes: {
    code: string;
    name: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

export interface GetProductsQueryPayload {
  products: {
    data: IProduct[];
  };
}

export const getProductsQuery = gql`
  query GetProducts {
    products {
      data {
        id
        attributes {
          code
          name
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
