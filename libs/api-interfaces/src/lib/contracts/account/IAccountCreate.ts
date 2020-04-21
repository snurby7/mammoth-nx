import { IAccount } from './IAccount';

/**
 * Interface to be implemented when creating an account
 *
 * @export
 * @interface IAccountCreate
 * @extends {Omit<IAccount, 'id'>}
 */
export interface IAccountCreate extends Omit<IAccount, 'id'> {}
