import { AiOutlineWarning } from "react-icons/ai"

import styles from "./ApolloQueryWrapper.module.scss"

interface ApolloQueryWrapperProps {
  query: any,
  children: (data: any) => React.ReactNode,
}

export default function ApolloQueryWrapper({ query, children }: ApolloQueryWrapperProps) {
  const { loading, error, data } = query
  if (error) console.error(error)
  return (
    <div>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>
          <AiOutlineWarning /> Error: {error.message}
        </p>
      ) : null}
      {data && children(data)}
    </div>
  )
}