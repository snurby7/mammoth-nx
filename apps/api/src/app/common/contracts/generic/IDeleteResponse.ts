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
}
