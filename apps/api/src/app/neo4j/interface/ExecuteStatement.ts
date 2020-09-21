/**
 * @description This is passed to neo4j to execute your statement
 * @export
 * @interface ExecuteStatement
 */
export interface ExecuteStatement {
  /**
   * @description If you use a query like the one below you will need to ensure you have a personDetails key below
   *  - "CREATE (n:Person $personDetails) \n RETURN n"
   *  - https://neo4j.com/docs/cypher-manual/current/clauses/create/#use-parameters-with-create
   * @type {string}
   * @memberof ExecuteStatement
   */
  query: string

  /**
   * @description If your statement has a $personDetails your object will need to look like
   * { personDetails: { ...stuffHere } }
   *
   * Basically if you have any sort of $property you will need to have a property in this at { property }
   * since Neo4j automagically maps the two.
   * @type {Record<string, any>}
   * @memberof ExecuteStatement
   */
  params?: Record<string, any>
}
