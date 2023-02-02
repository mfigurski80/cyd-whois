"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { gql, useQuery } from '@apollo/client';
// @ts-ignore
import lookupQuery from "./lookup.graphql"

import UrlForm from "./UrlForm"

export default function DomainLookup() {
  const router = useRouter()
  const p = useSearchParams()
  const { loading, error, data, refetch } = useQuery(
    gql`${lookupQuery}`, { variables: { domain: p.get('lookup') }, skip: !p.has('lookup') },
  )

  const handleSubmit = (lookup: string) => {
    router.replace(`/?lookup=${lookup}`)
  }

  return (
    <main>
      <h2>Domain Lookup Tool</h2>
      <UrlForm onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  )
}