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
export type DomainLookupResultRegistrar = {
  iana_id: string;
  name: string;
  url: string;
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
  registrar: DomainLookupResultRegistrar;
  registrant: DomainLookupResultEntity;
  admin: DomainLookupResultEntity;
  tech: DomainLookupResultEntity;
  billing: DomainLookupResultEntity;
  nameservers: string[];
}

interface DomainLookupArgs {
  id: string;
}