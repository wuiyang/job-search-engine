import * as React from 'react';
import { StyleSheet, View, Text, Linking, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import Markdown from 'react-native-markdown-display';

import { RootStackParamList } from '../types';
import JobView from 'components/Job/JobView';
import FormattedScreen from 'components/FormattedScreen';
import Colors from 'constants/Colors';
import JobTags from 'components/Job/JobTags';
import CompanyDetail from 'components/CompanyDetail';
import { Job, JobStore, useAppJobsStore } from 'models/Job';
import { Instance } from 'mobx-state-tree';
import { jobQueryFinder } from 'queries/JobQueryBuilder';
import { MaterialIcons } from '@expo/vector-icons';
import Layout from 'constants/Layout';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobContainer: {
    flexDirection: 'column',
    overflow: 'scroll',
    alignItems: 'center',
  },
  topBackground: {
    backgroundColor: '#f2f2f2',
  },
  jobInfoHeader: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  description: {
    flex: 1,
    width: '100%',
    maxWidth: Layout.infoMaxWidth,
    paddingHorizontal: 20,
    paddingBottom: 20,
    margin: 'auto'
  },
  descriptionHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  normalText: {
    fontSize: 15,
    marginTop: 5
  },
});

export default function JobDescriptionScreen(props: StackScreenProps<RootStackParamList, 'JobDescription'>) {
  const { navigation, route: { params: { companySlug, jobSlug, selectedTags } } } = props;
  const jobStore: Instance<typeof JobStore> = useAppJobsStore() ?? JobStore.create();
  const job: Instance<typeof Job> | undefined = jobStore.jobs.find(jobQueryFinder(companySlug, jobSlug));
  
  if (job === undefined) {
    return (
      <Pressable style={styles.centerContainer} onPress={() => navigation.goBack()}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>Error! Unable to find job!</Text>
        <Text>Press anywhere to navigate back to search</Text>
      </Pressable>
    );
  }

  return (
    <FormattedScreen>
      <View style={styles.jobContainer}>
        <JobView job={job} style={styles.topBackground} innerStyle={styles.jobInfoHeader} />
      </View>
      <ScrollView style={styles.description}>
        <CompanyDetail company={job.company} />
        <Text style={styles.descriptionHeader}>Commitment</Text>
        <Text style={styles.normalText}>{job.commitment.title}</Text>
        <Text style={styles.descriptionHeader}>Posted</Text>
        <Text style={styles.normalText}>{job.postedAt.toDateString()}</Text>
        <Text style={styles.descriptionHeader}>Job Tags</Text>
        <JobTags tags={job.tags} selectedTags={selectedTags} />
        <Text style={styles.descriptionHeader}>Description</Text>
        <Markdown>{job.description}</Markdown>
      </ScrollView>
      <ApplyButton applyUrl={job.applyUrl} />
    </FormattedScreen>
  );
}

type ApplyButtonProps = {
  applyUrl: string
}

function ApplyButton(props: ApplyButtonProps) {
  const { applyUrl } = props;

  // default value for no url
  let onPress: (() => void) | undefined;
  let color: string = '#aaa';
  let text: string = 'Apply Link Not Available';

  // value for apply url
  if (applyUrl != null && applyUrl.length > 0) {
    onPress = () => Linking.openURL(applyUrl);
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
