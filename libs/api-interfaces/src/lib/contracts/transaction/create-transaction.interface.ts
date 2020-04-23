import { ITransaction } from './transaction.interface';

/**
 * Transaction that omits the 'id' property on a transaction. This is just used to
 * create a transaction only.
 *
 * @export
 * @interface ICreateTransaction
 * @extends {Omit<ITransaction, 'id'>}
 */
export interface ICreateTransaction extends Omit<ITransaction, 'id'> {}
