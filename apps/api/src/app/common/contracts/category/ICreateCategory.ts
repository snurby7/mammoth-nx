import { ICategory } from './ICategory';

/**
 * Extension of ICategory with the omission of the 'id' property.
 *
 * @export
 * @interface ICreateCategory
 * @extends {Omit<ICategory, 'id'>}
 */
export interface ICreateCategory extends Omit<ICategory, 'id'> {}
