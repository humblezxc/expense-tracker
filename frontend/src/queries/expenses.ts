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
  mutation CreateExpense($title: String!, $amount: Float!, $category: String!, $notes: String) {
    createExpense(title: $title, amount: $amount, category: $category, notes: $notes) {
      id
      title
      amount
      notes
      date
      category { id name }
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($data: UpdateExpenseInput!) {
    updateExpense(data: $data) {
      id
      title
      amount
      notes
      date
      category { id name }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation RemoveExpense($id: String!) {
    removeExpense(id: $id) {
      id
    }
  }
`;
