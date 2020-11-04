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
import { Job } from 'models/Job';
import { JobStore, useAppJobsStore, useJobQueryStore } from 'models/JobStore';
import { Instance } from 'mobx-state-tree';
import { jobQueryFinder } from 'queries/JobQueryBuilder';
import { MaterialIcons } from '@expo/vector-icons';
import Layout from 'constants/Layout';
import { baseStyles, JobDescriptionStyles, SharedStyles } from 'constants/Styles';


export default function JobDescriptionScreen(props: StackScreenProps<RootStackParamList, 'JobDescription'>) {
  const { navigation, route: { params: { companySlug, jobSlug } } } = props;
  const jobStore: Instance<typeof JobStore> = useAppJobsStore() ?? JobStore.create();
  const job: Instance<typeof Job> | undefined = jobStore.jobs.find(jobQueryFinder(companySlug, jobSlug));
  const selectedTags = useJobQueryStore()?.where.tags_some;
  
  if (job === undefined) {
    return (
      <Pressable style={baseStyles.flexCenter} onPress={() => navigation.goBack()}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>Error! Unable to find job!</Text>
        <Text>Press anywhere to navigate back to search</Text>
      </Pressable>
    );
  }

  return (
    <FormattedScreen>
      <View style={JobDescriptionStyles.jobContainer}>
        <JobView job={job} style={JobDescriptionStyles.topBackground} innerStyle={JobDescriptionStyles.jobInfoHeader} />
      </View>
      <ScrollView style={SharedStyles.maintainInfoWidth}>
        <CompanyDetail company={job.company} />
        <Text style={SharedStyles.textLargeMargin}>Commitment</Text>
        <Text style={SharedStyles.textNormalMargin}>{job.commitment.title}</Text>
        <Text style={SharedStyles.textLargeMargin}>Posted</Text>
        <Text style={SharedStyles.textNormalMargin}>{job.postedAt.toDateString()}</Text>
        <Text style={SharedStyles.textLargeMargin}>Job Tags</Text>
        <JobTags tags={job.tags} selectedTags={selectedTags} />
        <Text style={SharedStyles.textLargeMargin}>Description</Text>
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
