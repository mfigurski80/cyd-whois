"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client';
// @ts-ignore
import LookupQuery from "./lookup.graphql"
import styles from './page.module.scss'

import UrlForm from "./UrlForm"
import LookupResult from "./LookupResult"
import ApolloQueryWrapper from "../components/ApolloQueryWrapper"

export default function DomainLookup() {
  const router = useRouter()
  const params = useSearchParams()
  const q = useQuery(
    gql`${LookupQuery}`, { 
      variables: { lookup: params.get('lookup') }, 
      skip: !params.has('lookup'),
      errorPolicy: 'all',
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
            <LookupResult data={data} />
          )}
        </ApolloQueryWrapper>
      </div>
    </main>
  )
}