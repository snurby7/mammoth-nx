/**
 * A generic response used whenever something is deleted
 *
 * @export
 * @interface IDeleteResponse
 */
export interface IDeleteResponse {
  /**
   * A friendly message to show if an error happens.
   *
   * @type {string}
   * @memberof IDeleteResponse
   */
  message: string;

  /**
   * Whether or not the transaction was actually deleted. Neo4j will attempt to run the delete query,
   * but if it doesn't find anything it might still look successful, but ultimately delete nothing. This is used
   * to propagate back out that information.
   *
   * @type {boolean}
   * @memberof IDeleteResponse
   */
  isDeleted: boolean;

  /**
   * The Id of the record that was deleted. If you are storing the records you can use this ID to filter
   * out the current data you have so that record is no longer shown.
   *
   * @type {string}
   * @memberof IDeleteResponse
   */
  id: string;
}
