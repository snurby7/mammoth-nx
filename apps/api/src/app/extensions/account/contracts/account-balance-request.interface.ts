import { SupportedLabel } from '../../../constants';
import { IMammothCoreNode } from '../../../neo4j';

/**
 * Interface used to handle the contract when needing to updating a balance on links
 *
 * @export
 * @interface IAccountBalanceRequest
 */
export interface IAccountBalanceRequest extends IMammothCoreNode {
  /**
   * Needs to be the Id of the node that the relationship points to.
   * node1:Type1 -- relates_somehow -> node2:Type2
   * This needs to be the Id of node2
   * @type {string}
   * @memberof IAccountBalanceRequest
   */
  id: string;

  /**
   * Needs to be the Id of the node that the relationship points to.
   * node1:Type1 -- relates_somehow -> node2:Type2
   * This needs to be the Label of node2, so in Neo4j speak it should be "Type2"
   * @type {SupportedLabel}
   * @memberof IAccountBalanceRequest
   */
  label: SupportedLabel;

  /**
   * Simple flag to tell if the balance is different. This is to just make this have to worry about linking and updating.
   * If it's true it will refund the link and then charge the link the new amount. Easier logic this way.
   *
   * @type {boolean}
   * @memberof IAccountBalanceRequest
   */
  isBalanceDifferent: boolean;

  /**
   * Total of the amount to charge an account. This can be either positive or negative.
   *
   * @type {number}
   * @memberof IAccountBalanceRequest
   */
  chargeAmount: number;

  /**
   * Total to refund the link. It can be either positive or negative. It inverses the inflow and outflow. A negated
   * inflow turns into an outflow (taking money away) and a negatived outflow turns into an inflow (putting money back)
   *
   * @type {number}
   * @memberof IAccountBalanceRequest
   */
  refundAmount: number;
}
