import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { JOB_LIST, JOB_QUERY, getJobListJobs, getJobQueryJobs } from 'queries/JobQuery';
import { Job } from 'models/Job';
import JobView from './JobView';
import { Instance } from 'mobx-state-tree';
import AppFooter from 'components/AppFooter';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type JobQueryProps = {
  variables?: Object,
  navigateToJobPage: (job: Instance<typeof Job>) => void 
};

export default function JobQuery(props: JobQueryProps) {
  const { variables = {}, navigateToJobPage } = props;
  const isListing = Object.keys(variables).length === 0;
  const query = isListing ? JOB_LIST : JOB_QUERY;
  const jobRetriever = isListing ? getJobListJobs : getJobQueryJobs;
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>GraphQL &#123; jobs &#125;...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>Error! Unable to GraphQL Jobs!</Text>
      </View>
    );
  }

  return (
    <FlatList<Instance<typeof Job>>
      data={jobRetriever(data).jobs}
      renderItem={
        ({ item }) => (
          <JobView job={item} onPress={() => navigateToJobPage(item)} showTags={true} />
        )
      }
      keyExtractor={ (item) => item.id }
      contentContainerStyle={{flexGrow: 1}}
      ListFooterComponent={AppFooter}
    />
  );
};

JobQuery.propTypes = {
  variables: PropTypes.object
};
