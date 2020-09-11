import { Record as Neo4jRecord } from 'neo4j-driver'
import { Notification, OperatorFunction } from 'rxjs'
import { map } from 'rxjs/operators'
import { getFormattedNode } from '../utils/neo4j-formatter.util'

/**
 * This will get the results from a single record, if you know there are multiple
 * you must use `materialize` and `toArray` and the getRecordsByKeyNotification method below
 *
 * @template TResult What type you expect the records are
 * @template TData What you expect the response to be
 * @param {string} key The result key to look for
 * @param {(result: TResult) => TData} [formatResult]
 * @returns {OperatorFunction<Neo4jRecord, TResult>}
 */
export const getRecordsByKey = <TResult, TData = any>(
  key: string,
  formatResult?: (result: TResult) => TData
): OperatorFunction<Neo4jRecord, TResult> =>
  map((record) => {
    const { properties } = record?.get(key) ?? {}
    if (!properties) {
      console.warn(`No results found on the given key - ${key}`)
      return
    }
    if (formatResult) return formatResult({ ...properties })
    // * There is an identity property here which I haven't quite figured out yet.
    return {
      ...properties,
    }
  })

/**
 * Will look for one value inside of the Notification that is returned
 *
 * @template TData
 * @param {string} key
 * @returns {OperatorFunction<Notification<Neo4jRecord>[], TData[]>}
 */
export const getRecordsByKeyNotification = <TData>(
  key: string
): OperatorFunction<Notification<Neo4jRecord>[], TData[]> =>
  map((notifications) =>
    notifications
      .map((notification) => {
        const { properties } = notification.value?.get(key) ?? {}
        if (!properties) {
          console.warn(`No results found on the given key - ${key}`)
          return
        }
        // * There is an identity property here which I haven't quite figured out yet.
        return {
          ...properties,
        }
      })
      .filter((record) => Boolean(record))
  )

/**
 * Will look for one value inside of the Notification that is returned
 *
 * @template TData
 * @param {string} key
 * @returns {OperatorFunction<Notification<Neo4jRecord>[], TData[]>}
 */
export const transformRecordToDetail = <TData>(
  recordBase: string,
  recordDetailMap: Record<string, string>
): OperatorFunction<Notification<Neo4jRecord>[], TData[]> =>
  map((notifications) =>
    notifications
      .map((notification) => {
        const { properties } = notification.value?.get(recordBase) ?? {}
        if (!properties) {
          console.warn(`No results found on the given key - ${recordBase}`)
          return
        }
        // * There is an identity property here which I haven't quite figured out yet.
        const baseRecord = {
          ...properties,
        }

        Object.keys(recordDetailMap).forEach((key) => {
          const { properties: formatProperties } = notification.value?.get(key) ?? {}

          baseRecord[recordDetailMap[key]] = getFormattedNode(formatProperties)
        })

        return baseRecord
      })
      .filter((record) => Boolean(record))
  )
