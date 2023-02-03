"use client"
import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './globals.scss'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const [apolloClient] = useState(new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  }))

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
        <footer>
          <h6>This repository is built from <a href="https://github.com/mfigurski80/cyd-whois/tree/master">github.com/mfigurski80/cyd-whois</a></h6>
        </footer>
      </body>
    </html>
  )
}
