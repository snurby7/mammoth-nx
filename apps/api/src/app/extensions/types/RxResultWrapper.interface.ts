import { ResultSummary } from 'neo4j-driver';
import RxResult from 'neo4j-driver/types/result-rx';
import { Observable } from 'rxjs';

export interface RxResultWrapper extends RxResult {
  // ? https://github.com/neo4j/neo4j-javascript-driver/issues/531
  consume(): Observable<ResultSummary>;
}
