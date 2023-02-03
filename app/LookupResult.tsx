import type { DomainLookupResult } from "../graphql/domain-lookup/types.d"
import type { IpLookupResult } from "../graphql/ip-lookup/types.d"
import styles from './page.module.scss';

interface LookupResultProps {
  data: {
    domainLookup: Partial<DomainLookupResult> | null;
    ipLookup: Partial<IpLookupResult> | null;
  }
}

const DEFAULT = '--'

export default function LookupResult({ data: { domainLookup: dom, ipLookup: ip } }: LookupResultProps) {
  if (!!dom) { return (
    <div className={styles.card}>
      <h2>Domain Information for: <a href={'http://' + dom.domain}>{dom.domain}</a></h2>
      <p>Status: {dom.status}</p>
      <p>Date: {dom.create_date} (created) / {dom.update_date} (updated)</p>
      <p>Whois Server: {dom.whois_server}</p>
      <h3>Registrant</h3>
      <p>Name: {dom.registrant?.name || DEFAULT}</p>
      <p>Organization: {dom.registrant?.organization || DEFAULT}</p>
      <p>Location: {dom.registrant?.country || DEFAULT} / {dom.registrant?.region || DEFAULT}</p>
      <p>Contact: {dom.registrant?.email || DEFAULT} / {dom.registrant?.phone || DEFAULT}</p>
      <h3>Origin Registrar</h3>
      <p>Name: {dom.registrar?.name || DEFAULT}</p>
      <p>URL: <a href={dom.registrar?.url}>{dom.registrar?.url || DEFAULT}</a></p>
    </div>
  )} else if (!!ip) { return (
    <div className={styles.card}>
      <h2>IP Information for: <a href={'http://' + ip.ip}>{ip.ip}</a></h2>
      <p>Location: {ip.country_name || DEFAULT}, {ip.region_name || DEFAULT}</p>
      <p>Position: {ip.latitude || DEFAULT}°, {ip.longitude || DEFAULT}°</p>
    </div>
  )} else { return (
    <div className={styles.card}>
      <h2>Enter a domain or IP address to lookup</h2>
    </div>
  )}
}