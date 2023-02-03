import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

import { DomainLookupGQLSchema, DomainLookupApi, DomainLookupArgs } from '../../graphql/domain-lookup';
import { IpLookupGQLSchema, IpLookupApi, IpLookupArgs } from '../../graphql/ip-lookup';

interface ContextValue {
  req: NextApiRequest;
  res: NextApiResponse;
  dataSources: {
    domainLookupApi: DomainLookupApi;
    ipLookupApi: IpLookupApi;
  };
}

const typeDefs = gql`
  ${DomainLookupGQLSchema}
  ${IpLookupGQLSchema}
  type Query {
    domainLookup(id: String!): DomainLookupResult
    ipLookup(ip: String!): IpLookupResult
  }
`

const resolvers = {
  Query: {
    domainLookup: async (_: any, { id }: DomainLookupArgs, { dataSources }: ContextValue) => {
      return dataSources.domainLookupApi.getDomainInfo(id);
    },
    ipLookup: async (_: any, { ip }: IpLookupArgs, { dataSources }: ContextValue) => {
      return dataSources.ipLookupApi.getIpInfo(ip);
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
      ipLookupApi: new IpLookupApi(),
    },
  }),
});