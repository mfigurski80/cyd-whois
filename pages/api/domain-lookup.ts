import { RESTDataSource } from '@apollo/datasource-rest';
import { gql } from 'graphql-tag';

export type DomainLookupResultEntity = {
  name: string;
  organization: string;
  street_address: string;
  city: string;
  region: string;
  zip_code: string;
  country: string;
  phone: string;
  fax: string;
  email: string;  
}

export type DomainLookupResult = {
  domain: string;
  domain_id: string;
  status: string;
  create_date: string;
  update_date: string;
  expire_date: string;
  domain_age: string;
  whois_server: string;
  registrar: { iana_id: string; name: string; url: string; };
  registrant: DomainLookupResultEntity;
  admin: DomainLookupResultEntity;
  tech: DomainLookupResultEntity;
  billing: DomainLookupResultEntity;
  nameservers: string[];
}

export const GqlDomainLookupResult = gql`
  type DomainLookupResultEntity {
    name: String
    organization: String
    street_address: String
    city: String
    region: String
    zip_code: String
    country: String
    phone: String
    fax: String
    email: String
  }
  type DomainLookupResultRegistrar {
    iana_id: String
    name: String
    url: String
  }
  type DomainLookupResult {
    domain: String
    domain_id: String
    status: String
    create_date: String
    update_date: String
    expire_date: String
    domain_age: String
    whois_server: String
    registrar: DomainLookupResultRegistrar
    registrant: DomainLookupResultEntity
    admin: DomainLookupResultEntity
    tech: DomainLookupResultEntity
    billing: DomainLookupResultEntity
    nameservers: [String]
  }
`;

export class DomainLookupApi extends RESTDataSource {
  // https://www.apollographql.com/docs/apollo-server/data/fetching-rest/
  override baseURL = "https://api.ip2whois.com/v2";
  async getDomainInfo(domain: string): Promise<DomainLookupResult> {
    return this.get(`?key=2F2D88EF9D539974843654AF429BFF6D&domain=${domain}`);
  }
}