import { AiOutlineWarning } from "react-icons/ai"

import styles from "./ApolloQueryWrapper.module.scss"

interface ApolloQueryWrapperProps {
  query: any,
  children: (data: any) => React.ReactNode,
}

export default function ApolloQueryWrapper({ query, children }: ApolloQueryWrapperProps) {
  const { loading, error, data } = query
  if (error) console.error(error.graphQLErrors[0])
  return (
    <div>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <div>
          <p className={styles.error}>
            <AiOutlineWarning /> Error {error.message} :: {error.graphQLErrors[0].extensions.response.body.error.error_message}
          </p>
          {error.graphQLErrors.map(({ extensions }:any, i:any) => (
            <p className={styles.loading} key={i}>{JSON.stringify(extensions.response, null, 2)}</p>
          ))}
        </div>
      ) : null}
      {data && children(data)}
    </div>
  )
}