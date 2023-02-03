import type { DomainLookupResult } from "../graphql/domain-lookup/types.d"
import styles from './page.module.scss';

interface LookupResultProps {
  data: Partial<DomainLookupResult>;
}

export default function LookupResult({ data }: LookupResultProps) {
  return (
    <div className={styles.card}>
      <h2>Domain Information for: <a href={'http://' + data.domain}>{data.domain}</a></h2>
      <p>Status: {data.status}</p>
      <p>Date: {data.create_date} (created) / {data.update_date} (updated)</p>
      <p>Whois Server: {data.whois_server}</p>
      <h3>Registrant</h3>
      <p>Name: {data.registrant?.name || '--'}</p>
      <p>Organization: {data.registrant?.organization || '--'}</p>
      <p>Location: {data.registrant?.country || '--'} / {data.registrant?.region || '--'}</p>
      <p>Contact: {data.registrant?.email || '--'} / {data.registrant?.phone || '--'}</p>
      <h3>Origin Registrar</h3>
      <p>Name: {data.registrar?.name || '--'}</p>
      <p>URL: <a href={data.registrar?.url}>{data.registrar?.url || '--'}</a></p>
    </div>
  )
}