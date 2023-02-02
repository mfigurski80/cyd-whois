import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import { DomainLookupGQLSchema, DomainLookupApi, DomainLookupArgs } from '../../graphql/domain-lookup';

interface ContextValue {
  req: NextApiRequest;
  res: NextApiResponse;
  dataSources: {
    domainLookupApi: DomainLookupApi;
  };
}

const typeDefs = gql`
  ${DomainLookupGQLSchema}
  type Query {
    domainLookup(id: String!): DomainLookupResult
  }
`

const resolvers = {
  Query: {
    domainLookup: async (_: any, { id }: DomainLookupArgs, { dataSources }: ContextValue) => {
      return dataSources.domainLookupApi.getDomainInfo(id);
    }
  },
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req, res, dataSources: {
      domainLookupApi: new DomainLookupApi(),
    },
  }),
});