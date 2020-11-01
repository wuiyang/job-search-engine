import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from 'react-apollo';
import Markdown from 'react-native-markdown-renderer';

import { RootStackParamList } from '../types';
import { getJob, JOB_DETAIL } from 'queries/JobQuery';
import JobView from 'components/Job/JobView';
import FormattedScreen from 'components/FormattedScreen';
import Colors from 'constants/Colors';
import { Instance } from 'mobx-state-tree';
import { Job } from 'models/Job';



const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topBackground: {
    backgroundColor: '#f2f2f2'
  },
  jobInfoHeader: {
    alignItems: 'center',
    width: 'auto',
  },
  description: {
    flex: 1,
    maxWidth: 800,
    paddingHorizontal: 20,
  }
});

export default function JobDescriptionScreen(props: StackScreenProps<RootStackParamList, 'JobDescription'>) {
  const { route: { params } } = props;
  const { data, loading, error } = useQuery(JOB_DETAIL, {
    variables: params
  });

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading Job Details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>Error! Unable to find job posting!</Text>
      </View>
    );
  }

  const job = getJob(data);

  return (
    <FormattedScreen>
      <View style={styles.jobContainer}>
        <JobView job={job} style={styles.topBackground} innerStyle={styles.jobInfoHeader} />
      </View>
      <ScrollView style={styles.description}>
        <Markdown>{job.description}</Markdown>
      </ScrollView>
      <View>
        {getApplyButton(job)}
      </View>
    </FormattedScreen>
  );
}

function getApplyButton(job: Instance<typeof Job>) {
  let onPress: (() => void) | undefined;
  let color: string = '#aaa';
  let text: string = 'Apply Link Not Available';
  if (job.applyUrl != null && job.applyUrl.length > 0) {
    onPress = () => Linking.openURL(job.applyUrl);
    color = Colors.header.background;
    text = 'Apply Job';
  }

  return (
    <Button
      onPress={onPress}
      mode="contained"
      color={color}
      labelStyle={{ fontSize: 20 }}
    >
      {text}
    </Button>
  );
}
