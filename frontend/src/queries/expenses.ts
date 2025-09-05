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

export const CREATE_EXPENSE = gql`
  mutation CreateExpense(
    $title: String!
    $amount: Float!
    $category: String!
    $notes: String
  ) {
    createExpense(
      title: $title
      amount: $amount
      category: $category
      notes: $notes
    ) {
      id
      title
      amount
      notes
      category {
        id
        name
      }
    }
  }
`;
