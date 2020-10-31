import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { JOB_LIST, JOB_QUERY, getJobListJobs, getJobQueryJobs } from 'queries/JobQuery';
import Job from 'models/Job';
import JobView from './JobView';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type JobQueryProps = {
  variables?: Object,
  navigateToJobPage: (job: Job) => void 
};

function JobQuery(props: JobQueryProps) {
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
    <FlatList<Job>
      data={jobRetriever(data)}
      renderItem={
        ({ item }) => (
          <JobView job={item} onPress={() => navigateToJobPage(item)} showTags={true} />
        )
      }
      keyExtractor={ (item) => item.id }
    />
  );
};

JobQuery.propTypes = {
  variables: PropTypes.object
};

JobQuery.defaultProps = {
  variables: {}
};

export default JobQuery;