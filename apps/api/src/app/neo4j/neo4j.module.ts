import { Module } from '@nestjs/common';
import { auth, driver } from 'neo4j-driver';
import { Neo4jService } from './neo4j.service';

export const getNeo4jDriver = (isTesting?: boolean) => {
  // Uses Neo4j v4.x.x
  return driver(
    'bolt://localhost:7687',
    auth.basic('neo4j', !isTesting ? 'mammoth' : 'testing'),
    {
      disableLosslessIntegers: true,
    }
  );
};

export const neo4jProvider = {
  provide: 'Neo4j',
  useFactory: () => getNeo4jDriver(),
};

@Module({
  exports: [Neo4jService, 'Neo4j'],
  providers: [neo4jProvider, Neo4jService],
})
export class Neo4jModule {}
