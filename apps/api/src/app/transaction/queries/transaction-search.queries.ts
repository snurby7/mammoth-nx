import { IMonthBoundary, ITransactionDetailLinks } from '@mammoth/api-interfaces'
import { NodeRelationship, SupportedLabel } from '../../constants'
import { ISearchQuery } from '../../contracts'

const account = 'account'
const budget = 'budget'
const payee = 'payee'
const category = 'category'
const transaction = 'transaction'

export const searchQueries = {
  getTransactionByAccount: (
    accountId: string,
    budgetId: string
  ): ISearchQuery<ITransactionDetailLinks> => {
    return {
      statement: `
        MATCH (${transaction}:Transaction)
          -[:${NodeRelationship.UsedAccount}]->(${account}:${SupportedLabel.Account} {id: $accountId})
          -[:${NodeRelationship.AccountOf}]->(${budget}:${SupportedLabel.Budget} {id: $budgetId}),
        (${transaction})-[${NodeRelationship.UsedCategory}]->(${category}:${SupportedLabel.Category})-[:${NodeRelationship.CategoryOf}]->(budget),
        (${transaction})-[${NodeRelationship.UsedPayee}]->(${payee}:${SupportedLabel.Payee})-[:${NodeRelationship.PayeeOf}]->(budget)
        RETURN ${transaction}, ${category}, ${account}, ${payee}`,
      props: {
        accountId,
        budgetId,
      },
      recordBase: transaction,
      formatKeyMap: {
        [account]: 'account',
        [payee]: 'payee',
        [category]: 'category',
      },
    }
  },
  getTransactionByPayee: (
    payeeId: string,
    budgetId: string
  ): ISearchQuery<ITransactionDetailLinks> => {
    return {
      statement: `
        MATCH (${transaction}:Transaction)
          -[:${NodeRelationship.UsedPayee}]->(${payee}:${SupportedLabel.Payee} {id: $payeeId})
          -[:${NodeRelationship.PayeeOf}]->(${budget}:${SupportedLabel.Budget} {id: $budgetId}),
        (${transaction})-[${NodeRelationship.UsedCategory}]->(${category}:${SupportedLabel.Category})-[:${NodeRelationship.CategoryOf}]->(budget),
        (${transaction})-[${NodeRelationship.UsedAccount}]->(${account}:${SupportedLabel.Account})-[:${NodeRelationship.AccountOf}]->(budget),
        RETURN ${transaction}, ${category}, ${account}, ${payee}`,
      props: {
        payeeId,
        budgetId,
      },
      recordBase: transaction,
      formatKeyMap: {
        [account]: 'account',
        [payee]: 'payee',
        [category]: 'category',
      },
    }
  },
  getTransactionByCategory: (
    categoryId: string,
    budgetId: string
  ): ISearchQuery<ITransactionDetailLinks> => {
    return {
      statement: `
        MATCH (${transaction}:Transaction)
          -[:${NodeRelationship.UsedCategory}]->(${category}:${SupportedLabel.Category} {id: $categoryId})
          -[:${NodeRelationship.CategoryOf}]->(${budget}:${SupportedLabel.Budget} {id: $budgetId}),
        (${transaction})-[${NodeRelationship.UsedAccount}]->(${account}:${SupportedLabel.Account})-[:${NodeRelationship.AccountOf}]->(budget),
        (${transaction})-[${NodeRelationship.UsedPayee}]->(${payee}:${SupportedLabel.Payee})-[:${NodeRelationship.PayeeOf}]->(budget)
        RETURN ${transaction}, ${category}, ${account}, ${payee}`,
      props: {
        categoryId,
        budgetId,
      },
      recordBase: transaction,
      formatKeyMap: {
        [account]: 'account',
        [payee]: 'payee',
        [category]: 'category',
      },
    }
  },
  getTransactionsByRange: (
    budgetId: string,
    boundary: IMonthBoundary
  ): ISearchQuery<ITransactionDetailLinks> => {
    return {
      statement: `
        MATCH (${transaction}:Transaction {budgetId: $budgetId}),
        (${transaction})-[${NodeRelationship.UsedCategory}]->(${category}:${SupportedLabel.Category})-[:${NodeRelationship.CategoryOf}]->(budget),
        (${transaction})-[${NodeRelationship.UsedAccount}]->(${account}:${SupportedLabel.Account})-[:${NodeRelationship.AccountOf}]->(budget),
        (${transaction})-[${NodeRelationship.UsedPayee}]->(${payee}:${SupportedLabel.Payee})-[:${NodeRelationship.PayeeOf}]->(budget)
        WHERE datetime({year: $endYear, month: $endMonth}) > t.date >= datetime({year: $startYear, month: $startMonth})
        RETURN ${transaction}, ${category}, ${account}, ${payee}
      `,
      props: {
        budgetId,
        endYear: boundary.end.year.toString(),
        endMonth: boundary.end.month.toString(),
        startYear: boundary.start.year.toString(),
        startMonth: boundary.start.month.toString(),
      },
      recordBase: transaction,
      formatKeyMap: {
        account,
        payee,
        category,
      },
    }
  },
}

/**
 * How to do a bounded range for the datetime property on the transaction
 *
 * MATCH(t:Transaction)
 * RETURN t
 *
 *
 *
 */
