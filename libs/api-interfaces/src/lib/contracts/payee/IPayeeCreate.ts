import { IPayee } from './IPayee';

/**
 * Extension of IPayee with the omission of the Id property
 *
 * @export
 * @interface IPayeeCreate
 * @extends {Omit<IPayee, 'id'>}
 */
export interface IPayeeCreate extends Omit<IPayee, 'id'> {}
