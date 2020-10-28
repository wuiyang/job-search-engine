import ApolloClient, { InMemoryCache } from 'apollo-boost';
import GraphQL from 'constants/GraphQL';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const client = new ApolloClient({
    uri: GraphQL.uri,
    cache: new InMemoryCache()
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
