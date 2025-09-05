import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query GetExpenses($skip: Int!, $take: Int!, $categoryId: String) {
    expenses(skip: $skip, take: $take, categoryId: $categoryId) {
      items {
        id
        title
        amount
        date
        notes
        category {
          id
          name
        }
      }
      totalCount
    }
  }
`;
