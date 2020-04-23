import { ICoreNode } from '@mammoth/api-core';
import { SupportedLabel } from '../../constants';
/**
 * This is a core representation of all nodes I support.
 * For more information on Neo4j, the docs are fantastic.
 * https://neo4j.com/docs/getting-started/current/graphdb-concepts/
 * @export
 * @interface IMammothCoreNode
 */
export interface IMammothCoreNode extends ICoreNode {
  /**
   * Neo4j uses labels on nodes, you can view more here
   * * https://neo4j.com/docs/getting-started/current/graphdb-concepts/#graphdb-labels
   * Please do not pass a string, pass a variable that you use and get from some central spot.
   *
   * @type {string}
   * @memberof INeo4jCoreNode
   */
  label: SupportedLabel;
}
