export interface ISearchQuery<T> {
  statement: string;
  props: Record<string, string>;
  /**
   * This will take a key from a neo4j query and it will say this is your key. Grab the data from this key
   * and put the data into the value slot in your response.
   *
   * @type {Record<string, string>}
   * @memberof ISearchQuery
   */
  formatKeyMap: Record<string, keyof T>;
}
