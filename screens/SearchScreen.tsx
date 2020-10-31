import { StackScreenProps } from '@react-navigation/stack';
import JobQuery from 'components/Job/JobQuery';
import * as React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { RootStackParamList } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#333',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerText: {
    marginVertical: 5,
    fontSize: 15,
    color: '#e5e5e5',
  },
  link: {
    color: '#7BBAFF'
  }
});

export default function SearchScreen(props: StackScreenProps<RootStackParamList, 'Search'>) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
      <JobQuery
        navigateToJobPage={
          (job) => navigation.navigate('JobPosting', {
            companySlug: job.company.slug,
            jobSlug: job.slug
          })
        }
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Author: Tan Wui Yang</Text>
        <Text style={styles.footerText}>Made with React Native.</Text>
        <Text style={styles.footerText}>Demostrating GraphQL API.</Text>
        <Text style={styles.footerText}>
          GraphQL server:
          <Text style={[styles.footerText, styles.link]} onPress={() => Linking.openURL("https://graphql.jobs/")}>
            https://graphql.jobs/
          </Text>
        </Text>
      </View>
    </View>
  );
}