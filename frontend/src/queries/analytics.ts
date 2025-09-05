import { gql } from "@apollo/client";

export const GET_ANALYTICS = gql`
  query GetAnalytics {
    analytics {
      total
      breakdown {
        category {
          id
          name
        }
        total
      }
    }
  }
`;
