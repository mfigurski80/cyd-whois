interface DomainLookupPageProps {
  params: {
    domain: string
  }
}

export default async function DomainLookupPage({ params: { domain } }: DomainLookupPageProps) {
  return (
    <div>
      <h1>Domain Lookup: ({domain})</h1>
      <pre>{JSON.stringify(await fetchDomainData(domain), null, 2)}</pre>
    </div>
  )
}

const fetchDomainData = async (domain: string) => {
  const res = await fetch(`https://api.ip2whois.com/v2?key=2F2D88EF9D539974843654AF429BFF6D&domain=${domain}`)
  const data = await res.json()
  return data
}