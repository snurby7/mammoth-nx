import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { materialize, toArray } from 'rxjs/operators';
import { Neo4jService } from '../../neo4j';
import { searchQueries } from '../queries/transaction-search.queries';

@Injectable()
export class TransactionSearchService {
  constructor(private neo4jService: Neo4jService) {}
  private readonly logger = new Logger(TransactionSearchService.name);

  public getTransactionsByAccount(
    budgetId: string,
    accountId: string
  ): Observable<any> {
    this.logger.log('running search query');
    const {
      statement,
      props,
      formatKeyMap, // TODO take these values and turn them into an IFormattedNode
    } = searchQueries.getTransactionByAccount(accountId, budgetId);
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx.run(statement, props).records().pipe(materialize(), toArray())
    );
  }
}
