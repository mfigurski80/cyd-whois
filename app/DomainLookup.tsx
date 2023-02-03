"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client';
// @ts-ignore
import lookupQuery from "./lookup.graphql"
import styles from './page.module.scss'

import UrlForm from "./UrlForm"

export default function DomainLookup() {
  const router = useRouter()
  const params = useSearchParams()
  const { loading, error, data } = useQuery(
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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <pre>{JSON.stringify(data['domainLookup'], null, 2)}</pre>
        )}
      </div>
    </main>
  )
}