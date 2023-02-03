"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client';
// @ts-ignore
import lookupQuery from "./lookup.graphql"
import styles from './page.module.scss'

import UrlForm from "./UrlForm"
import LookupResult from "./LookupResult"
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
          {data => (
            <LookupResult data={data.domainLookup} />
          )}
        </ApolloQueryWrapper>
      </div>
    </main>
  )
}