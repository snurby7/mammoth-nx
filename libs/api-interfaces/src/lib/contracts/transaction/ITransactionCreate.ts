import { ITransaction } from './ITransaction';

/**
 * Transaction that omits the 'id' property on a transaction. This is just used to
 * create a transaction only.
 *
 * @export
 * @interface ITransactionCreate
 * @extends {Omit<ITransaction, 'id'>}
 */
export interface ITransactionCreate extends Omit<ITransaction, 'id'> {}
