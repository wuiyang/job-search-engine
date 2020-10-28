import React from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
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
  loadingText?: string,
  errorText?: string,
};

function JobQuery(props: JobQueryProps) {
  const { loadingText, errorText, variables = {} } = props;
  const isListing = Object.keys(variables).length === 0;
  const query = isListing ? JOB_LIST : JOB_QUERY;
  const jobRetriever = isListing ? getJobListJobs : getJobQueryJobs;
  const { data, loading, error } = useQuery(query);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>{loadingText}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>{errorText}</Text>
      </View>
    );
  }

  return (
    <FlatList<Job>
      data={jobRetriever(data)}
      renderItem={
        ({ item }) => (
          <JobView job={item} />
        )
      }
      keyExtractor={ (item) => item.id }
    />
  );
};

JobQuery.propTypes = {
  variables: PropTypes.object,
  loadingText: PropTypes.string,
  errorText: PropTypes.string,
};

JobQuery.defaultProps = {
  variables: {},
  loadingText: 'Running GraphQL Query...',
  errorText: 'Error! Unable to GraphQL Jobs!',
};

export default JobQuery;