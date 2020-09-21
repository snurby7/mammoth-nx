import { ExecuteStatement } from '../../../neo4j'
import { IAccountLinkedNodeMeta } from '../contracts'

/**
 * This function is used to take a linked node and update it's balance whether it's additive or subtractive
 *
 * @param {IAccountLinkedNodeMeta} linkedAccountMeta Data to pull from about what the link is
 * @param {number} [balance=0] The new balance if it has changed otherwise, it's zero
 * @returns {ExecuteStatement}
 */
export const updateLinkedNodeBalance = (
  resultKey: string,
  linkedAccountMeta: IAccountLinkedNodeMeta,
  balance: number = 0
): ExecuteStatement => ({
  query: `
    MATCH (${resultKey}:${linkedAccountMeta.label} {id: $nodeId, budgetId: $budgetId})
    SET ${resultKey}.balance = $updatedBalance
    RETURN ${resultKey}
  `,
  params: {
    nodeId: linkedAccountMeta.id,
    budgetId: linkedAccountMeta.budgetId,
    updatedBalance: balance + (linkedAccountMeta.amount || 0) + (linkedAccountMeta.refund || 0),
  },
})
