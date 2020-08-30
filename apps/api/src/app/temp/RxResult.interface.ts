import { ResultSummary } from 'neo4j-driver'
import Neo4jRxResult from 'neo4j-driver/types/result-rx'
import { Observable } from 'rxjs'

export interface RxResult extends Omit<Neo4jRxResult, 'summary'> {
  consume(): Observable<ResultSummary>
}
