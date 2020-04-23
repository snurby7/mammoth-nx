import { IMammothCoreNode } from '../../../neo4j';
import { IAccountBalanceRequest } from './account-balance-request.interface';

export interface IReferenceNodeMeta extends IMammothCoreNode {
  /**
   * The this is the label on the relationship. Something like 'relates_to' so you would pass 'relates_to' as this prop
   *
   * @type {string}
   * @memberof IReferenceNodeMeta
   */
  relationship: string;
  balanceRequest: IAccountBalanceRequest;
}

export interface IAccountLinkedNodeMeta extends IMammothCoreNode {
  /**
   * This is the amount to charge to a link, it can be positive or negative dependent on the inflow/outflow
   *
   * @type {number}
   * @memberof IAccountLinkedNodeMeta
   */
  amount: number;

  /**
   * This is totally optional and is used to update the balances on a payee/category/account
   *
   * @type {number}
   * @memberof IAccountLinkedNodeMeta
   */
  refund?: number;
}

export interface IAccountLinkRequest {
  /**
   * This is the base node, so consider the following
   * A -- relates_to -> B
   *
   * This should be all of the information needed about Node A
   *
   * @type {IReferenceNodeMeta}
   * @memberof IAccountLinkRequest
   */
  storedTransactionDetails: IReferenceNodeMeta;

  /**
   * This is the node detail that is currently pointed at.
   * A -- relates_to -> B
   * This is all the information needed to refund B and unlink it.
   *
   * @type {IAccountLinkedNodeMeta}
   * @memberof IAccountLinkRequest
   */
  currentTransactionLinkDetails: IAccountLinkedNodeMeta;

  /**
   * This is the node detail that is desired to be pointed at. Going off the doc above, if you want to remove
   * B and instead point it at C
   *   A -- relates_to -> C
   * This is all the information about C
   * @type {IAccountLinkedNodeMeta}
   * @memberof IAccountLinkRequest
   */
  newLinkDetails: IAccountLinkedNodeMeta;
}
