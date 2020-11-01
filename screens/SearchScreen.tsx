import { StackScreenProps } from '@react-navigation/stack';
import FormattedScreen from 'components/FormattedScreen';
import JobQuery from 'components/Job/JobQuery';
import SearchbarHeader from 'components/SearchbarSubheader';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../types';

const styles = StyleSheet.create({
});

export default function SearchScreen(props: StackScreenProps<RootStackParamList, 'Search'>) {
  const { navigation } = props;
  
  return (
    <FormattedScreen>
      <SearchbarHeader />
      <JobQuery
        navigateToJobPage={
          (job) => navigation.navigate('JobDescription', {
            companySlug: job.company.slug,
            jobSlug: job.slug
          })
        }
      />
    </FormattedScreen>
  );
}