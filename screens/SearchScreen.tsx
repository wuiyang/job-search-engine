import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import FormattedScreen from 'components/FormattedScreen';
import JobQuery from 'components/Job/JobQuery';
import Layout from 'constants/Layout';
import { RootStackParamList } from '../types';
import Colors from 'constants/Colors';
import { JobQueryBuilder } from 'queries/JobQueryBuilder';
import { IconButton, Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  subheader: {
    flexShrink: 1,
    flexDirection: 'row',
    maxWidth: Layout.infoMaxWidth,
    width: '100%',
    margin: 'auto',
    zIndex: 10,
    backgroundColor: Colors.light.background,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchbar: {
    flexGrow: 1
  }
});

export default function SearchScreen(props: StackScreenProps<RootStackParamList, 'Search'>) {
  const { navigation } = props;
  const [searchbarText, setSearchbarText] = React.useState('');
  const [filterOptions, setFilterOptions] = React.useState(JobQueryBuilder.create());

  filterOptions.setJobTitle(searchbarText);
  
  return (
    <FormattedScreen>
      <View style={[styles.subheader, styles.shadow]}>
        <Searchbar
          placeholder="Search job title"
          onChangeText={setSearchbarText}
          value={searchbarText}
          style={styles.searchbar}
        />
        <IconButton
          icon="filter-outline"
          onPress={() => navigation.navigate('Filter', { filterOptions, setFilterOptions })}
        />
      </View>
      <JobQuery
        navigateToJobPage={
          (job) => navigation.navigate('JobDescription', {
            companySlug: job.company.slug,
            jobSlug: job.slug,
            selectedTags: filterOptions.where.tags_some
          })
        }
        variables={filterOptions}
      />
    </FormattedScreen>
  );
}