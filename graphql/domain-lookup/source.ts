import { RESTDataSource } from '@apollo/datasource-rest';
import type { DomainLookupResult } from "./types"

export class DomainLookupApi extends RESTDataSource {
  // https://www.apollographql.com/docs/apollo-server/data/fetching-rest/
  override baseURL = "https://api.ip2whois.com/v2";
  async getDomainInfo(domain: string): Promise<DomainLookupResult> {
    return this.get(`?key=2F2D88EF9D539974843654AF429BFF6D&domain=${domain}`);
  }
}