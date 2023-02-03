import { RESTDataSource } from '@apollo/datasource-rest';
import { IpLookupResult } from './types.d';

export class IpLookupApi extends RESTDataSource {
  override baseURL = "https://api.ip2location.io";
  async getIpInfo(ip: string): Promise<IpLookupResult> {
    return this.get(`?key=2F2D88EF9D539974843654AF429BFF6D&ip=${ip}`);
  }
}