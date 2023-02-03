import { AiOutlineWarning } from "react-icons/ai"

import styles from "./ApolloQueryWrapper.module.scss"

interface ApolloQueryWrapperProps {
  query: any,
  children: (data: any) => React.ReactNode,
}

export default function ApolloQueryWrapper({ query, children }: ApolloQueryWrapperProps) {
  const { loading, error, data } = query
  console.log(data, error)
  return (
    <div>
      {!!data && Object.values(data).some(i => i !== null) ? children(data)
      : loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <div>
          <p className={styles.error}>
            <AiOutlineWarning /> Error {error.message}
          </p>
          {error.graphQLErrors.map(({ extensions }:any, i:any) => (
            <p className={styles.loading} key={i}>{JSON.stringify(extensions.response.body, null, 2)}</p>
          ))}
        </div>
      ) : null}
    </div>
  )
}