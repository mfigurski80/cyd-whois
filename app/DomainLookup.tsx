"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client';
// @ts-ignore
import lookupQuery from "./lookup.graphql"
import styles from './page.module.scss'

import UrlForm from "./UrlForm"
import ApolloQueryWrapper from "../components/ApolloQueryWrapper"

export default function DomainLookup() {
  const router = useRouter()
  const params = useSearchParams()
  const q = useQuery(
    gql`${lookupQuery}`, { 
      variables: { domain: params.get('lookup') }, 
      skip: !params.has('lookup')
    },
  )

  const handleSubmit = (lookup: string) => {
    router.replace(`/?lookup=${lookup}`, { forceOptimisticNavigation: true })
  }

  return (
    <main className={styles.main}>
      <div className={styles.input}>
        <h2>Domain Lookup Tool</h2>
        <UrlForm onSubmit={handleSubmit} />
      </div>
      <div className={styles.output}>
        <ApolloQueryWrapper query={q}>
          {({domainLookup: data}) => (
            <div>
              <h2>Domain Information for: <a href={'http://' + data.domain}>{data.domain}</a></h2>
              <p>Status: {data.status}</p>
              <p>Date: {data.create_date} (created) / {data.update_date} (updated)</p>
              <p>Whois Server: {data.whois_server}</p>
              <h3>Registrant</h3>
              <p>Name: {data.registrant.name}</p>
              <p>Organization: {data.registrant.organization}</p>
              <p>Country: {data.registrant.country}</p>
              <p>Email: {data.registrant.email}</p>
              <h3>Origin Registrar</h3>
              <p>Name: {data.registrar.name}</p>
              <p>URL: <a href={data.registrar.url}>{data.registrar.url}</a></p>
            </div>
          )}
        </ApolloQueryWrapper>
      </div>
    </main>
  )
}