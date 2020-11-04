import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';

import FormattedScreen from 'components/FormattedScreen';
import JobQuery from 'components/Job/JobQuery';
import { RootStackParamList } from '../types';
import { JobQueryBuilder } from 'queries/JobQueryBuilder';
import { IconButton, Searchbar } from 'react-native-paper';
import { useJobQueryStore } from 'models/JobStore';
import { Instance } from 'mobx-state-tree';
import { baseStyles, SearchScreenStyles } from 'constants/Styles';

export default function SearchScreen(props: StackScreenProps<RootStackParamList, 'Search'>) {
  const { navigation } = props;
  const [searchbarText, setSearchbarText] = React.useState('');
  const [filterOptions, setFilterOptions] = React.useState(JobQueryBuilder.create());

  filterOptions.setJobTitle(searchbarText);
  const query: Instance<typeof JobQueryBuilder> = useJobQueryStore() ?? JobQueryBuilder.create();
  query.copy(filterOptions);
  
  return (
    <FormattedScreen>
      <View style={[SearchScreenStyles.subheader, baseStyles.dropShadow]}>
        <Searchbar
          placeholder="Search job title"
          onChangeText={setSearchbarText}
          value={searchbarText}
          style={baseStyles.flexGrow}
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
          })
        }
        variables={filterOptions}
      />
    </FormattedScreen>
  );
}