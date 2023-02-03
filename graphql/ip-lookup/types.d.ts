export type IpLookupResult =  {
  ip: string;
  country_code: string;
  country_name: string;
  region_name: string;
  city_name: string;
  latitude: number;
  longitude: number;
  zip_code: string;
  time_zone: string;
  asn: string;
  isp: string;
  is_proxy: string;
}
export type IpLookupArgs =  {
  ip: string;
}