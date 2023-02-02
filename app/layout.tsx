"use client"
import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './globals.css'

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
      </body>
    </html>
  )
}
