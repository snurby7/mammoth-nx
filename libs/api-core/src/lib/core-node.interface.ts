/**
 * This is a core representation of all nodes I support.
 * For more information on Neo4j, the docs are fantastic.
 * https://neo4j.com/docs/getting-started/current/graphdb-concepts/
 * @export
 * @interface ICoreNode
 */
export interface ICoreNode {
  /**
   * Id of the node
   *
   * @type {string}
   * @memberof INeo4jCoreNode
   */
  id: string;

  name?: string;

  /**
   * Budget Id to find the node in
   *
   * @type {string}
   * @memberof INeo4jCoreNode
   */
  budgetId: string;
}
