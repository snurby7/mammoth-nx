import { IDeleteResponse } from '@mammoth/api-interfaces'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Driver, QueryResult, ResultSummary } from 'neo4j-driver'
import RxSession from 'neo4j-driver/types/session-rx'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { RxResult } from '../temp'
import { ExecuteStatement, IMammothCoreNode } from './interface'
import { Neo4jCommonQueries } from './queries'
import { getRecordsByKey } from './rxjs'

@Injectable()
export class Neo4jService {
  private readonly logger = new Logger(Neo4jService.name)

  constructor(@Inject('Neo4j') private readonly neo4jDriver: Driver) {}

  /**
   * Simple getter to return an instance of an RxSession, this is up to the implementer to work out.
   * Implementer also will need to close the session when they are done with it you can use this pipe operator
   *
   * concat(rxSession.close())
   *
   * * Docs https://neo4j.com/docs/api/javascript-driver/current/class/src/session-rx.js~RxSession.html
   * * Session access Modes: https://neo4j.com/docs/driver-manual/1.7/sessions-transactions/#driver-transactions-access-mode
   *
   * @returns {RxSession}
   * @memberof Neo4jService
   */
  get rxSession(): RxSession {
    return this.neo4jDriver.rxSession()
  }

  /**
   * Executes a given statement. The object must contain a statement and if you use
   * $myProps there must be a property in the props object that is keyed at myProps in order
   * for the find and replace to work.
   *
   * @deprecated Use the reactive API if you can
   * @param {ExecuteStatement} statementProps Object that contains a statement and optional props
   * @returns {Promise<QueryResult>}
   * @memberof Neo4jService
   */
  public async executeStatement(statementProps: ExecuteStatement): Promise<QueryResult> {
    const { statement, props } = statementProps
    const session = this.neo4jDriver.session()
    const result = await session.run(statement, { ...props } ?? {})
    session.close()

    return result
  }

  /**
   * This takes a response from an executed statement and will piece out the given key
   * It returns an array as the queryResult is returned in array format.
   *
   * TODO: This doesn't really need to be in the service. Instead of the execution should return a class with this being a member of said class.
   *
   * @template TResponse Defines the type you expect to have returned
   * @param {QueryResult} queryResult The result to look inside of for your given key
   * @param {string} key The key you used, typically this is the RETURN (something) value. This would be your (something)
   * @returns {TResponse[]} An array response of your elements.
   * @memberof Neo4jService
   * @deprecated Use the reactive session
   */
  public flattenStatementResult<TResponse>(queryResult: QueryResult, key: string): TResponse[] {
    // TODO Throw if no results - https://3.basecamp.com/4326074/buckets/14452756/todos/2328314149
    if (queryResult.records.length === 0) {
      this.logger.warn('No results matched the given query.')
      return []
    }
    return queryResult.records.map<TResponse>((record) => {
      const { properties } = record.get(key)
      if (!properties) {
        this.logger.warn(`There are results here, but no result is matched by ${key}`)
        return {}
      }
      // * There is an identity property here which I haven't quite figured out yet.
      return {
        ...properties,
      }
    })
  }

  /**
   * This deletes all outgoing {relationship} relationships from the node {label} with the id {id}.
   * * https://neo4j.com/docs/cypher-manual/current/clauses/delete/#delete-delete-relationships-only
   *
   * @param {string} id Specific node id to match with.
   * @param {string} label A label to find the node in.
   * @param {string} relationship A specific relationship name to bulk delete from a node, it will match ANY relationship from a node
   *  that matches
   * @returns {Promise<QueryResult>}
   * @memberof Neo4jService
   */
  public removeTargetedRelationshipFromNode(
    id: string,
    label: string,
    relationship: string
  ): Promise<ResultSummary> {
    const statement = `
      MATCH (:${label} {id: $id})-[r:${relationship}]-()
      DELETE r
    `

    return this.rxSession
      .writeTransaction((trx) => trx.run(statement, { id }).summary())
      .toPromise()
    //   ({
    //   statement: `
    //       MATCH (:${label} {id: $id})-[r:${relationship}]-()
    //       DELETE r
    //     `,
    //   props: {
    //     id,
    //   },
    // }).then((result) => {
    //   this.logger.verbose(
    //     `Deleted ${result.summary.counters.updates().relationshipsDeleted} relationship(s)`
    //   )
    //   return result
    // })
  }

  /**
   * This deletes all outgoing {relationship} relationships from the node {label} with the id {id}.
   * * https://neo4j.com/docs/cypher-manual/current/clauses/delete/#delete-delete-relationships-only
   *
   * @param {string} id Specific node id to match with.
   * @param {string} label A label to find the node in.
   * @param {string} relationship A specific relationship name to bulk delete from a node, it will match ANY relationship from a node
   *  that matches
   * @returns {Observable<QueryResult>}
   * @memberof Neo4jService
   */
  public removeTargetedRelationshipFromNode$(
    id: string,
    label: string,
    relationship: string
  ): Observable<IDeleteResponse> {
    const statement = `
      MATCH (:${label} {id: $id})-[r:${relationship}]-()
      DELETE r
    `
    return this.rxSession.writeTransaction((trx) =>
      ((trx.run(statement, { id }) as unknown) as RxResult).consume().pipe(
        map((result) => ({
          message: `Deleted ${result.counters.updates().nodesDeleted || 0} record(s)`,
          isDeleted: result.counters.updates().nodesDeleted > 0,
          id,
        })),
        catchError((err) => throwError(err))
      )
    )
  }

  /**
   * Method to execute the neo4j statement to create a link between two nodes. This will return the relationship between them.
   *
   * @deprecated
   * @private
   * @param {IMammothCoreNode} fromNode The node you want to create the relationship from
   * @param {IMammothCoreNode} toNode The node you want to create the relationship to
   * @param {string} relationship The name of the relationship (fromNode)--[r:"MEMBER_OF"]->(toNode)
   * @memberof Neo4jService
   */
  public async createRelationshipBetweenNodes(
    fromNode: IMammothCoreNode,
    toNode: IMammothCoreNode,
    relationship: string
  ): Promise<QueryResult> {
    const { label: toLabel, budgetId: toBudgetId, ...toNodeProps } = toNode
    const { label: fromLabel, budgetId: fromBudgetId, ...fromNodeProps } = fromNode
    // throw an error if both the budgetIds do not match. Not going to use them though, they're not needed if they're both the same
    if (toBudgetId !== fromBudgetId) {
      throw new Error('Error - Budget Id on the two nodes must match.')
    }
    return await this.executeStatement({
      statement: `
        MATCH (fromNode:${fromLabel} {id: $fromNodeProps.id })
        MATCH (toNode:${toLabel} {id: $toNodeProps.id })
        CREATE (fromNode)-[r:${relationship}]->(toNode)
        RETURN r
      `,
      props: {
        toNodeProps,
        fromNodeProps,
      },
    })
  }

  /**
   * Method to execute the neo4j statement to create a link between two nodes. This will return the relationship between them.
   *
   * @private
   * @param {IMammothCoreNode} fromNode The node you want to create the relationship from
   * @param {string} relationship The name of the relationship (fromNode)--[r:"MEMBER_OF"]->(toNode)
   * @param {IMammothCoreNode} toNode The node you want to create the relationship to
   * @memberof Neo4jService
   */
  public createRelationshipBetweenNodes$(
    fromNode: IMammothCoreNode,
    relationship: string,
    toNode: IMammothCoreNode
  ): Observable<QueryResult> {
    const relationshipKey = 'relationshipKey'
    const { statement, props } = Neo4jCommonQueries.createRelationship(
      relationshipKey,
      fromNode,
      relationship,
      toNode
    )
    return this.rxSession.writeTransaction((trx) =>
      trx
        .run(statement, props)
        .records()
        .pipe(
          getRecordsByKey<QueryResult>(relationshipKey),
          catchError((err) => throwError(err))
        )
    )
  }
}
