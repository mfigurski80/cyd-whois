import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import { DomainLookupResult, GqlDomainLookupResult, DomainLookupApi } from './domain-lookup';

const typeDefs = gql`
  ${GqlDomainLookupResult}
  type Query {
    domainLookup(id: String!): DomainLookupResult
  }
`
const resolvers = {
  Query: {
    domainLookup: async (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.domainLookupApi.getDomainInfo(id);
    }
  },
}

interface ContextValue {
  req: any;
  res: any;
  dataSources: {
    domainLookupApi: DomainLookupApi;
  };
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