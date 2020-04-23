import { IAccount } from './account.interface';

/**
 * Interface to be implemented when creating an account
 *
 * @export
 * @interface IAccountCreate
 * @extends {Omit<IAccount, 'id'>}
 */
export interface ICreateAccount extends Omit<IAccount, 'id'> {}
