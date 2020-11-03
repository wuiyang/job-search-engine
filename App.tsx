import ApolloClient, { InMemoryCache } from 'apollo-boost';
import QueryLoadingWrapper from 'components/QueryLoadingWrapper';
import GraphQL from 'constants/GraphQL';
import { StatusBar } from 'expo-status-bar';
import { ApplicationContextProvider, toApplicationStore } from 'models/Job';
import { getJobListJobs, JOB_LIST } from 'queries/JobQuery';
import React from 'react';
import { ApolloProvider, useQuery } from 'react-apollo';
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

  const queryRunner = () => useQuery(JOB_LIST);
  const mainAppRender = (data: any) => {
    const jobs = getJobListJobs(data);
    return (
      <ApplicationContextProvider value={toApplicationStore(jobs)}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </ApplicationContextProvider>
    );
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <QueryLoadingWrapper
            loadingText="GraphQL { jobs }..."
            errorText="Error! Unable to GraphQL Jobs!"
            useQueryFunction={queryRunner}
            render={mainAppRender}
          />
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
