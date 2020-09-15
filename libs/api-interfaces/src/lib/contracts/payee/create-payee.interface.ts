import { IPayee } from './payee.interface'

/**
 * Extension of IPayee with the omission of the Id property
 *
 * @export
 * @interface ICreatePayee
 * @extends {Omit<IPayee, 'id'>}
 */
export interface ICreatePayee extends Omit<IPayee, 'id'> {}
