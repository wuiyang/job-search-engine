import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Chip, Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../types';
import FormattedScreen from 'components/FormattedScreen';
import Colors from 'constants/Colors';
import { Tag } from 'models/Job';
import { useAppQueryFilterStore } from 'models/JobStore';
import { getSnapshot, Instance } from 'mobx-state-tree';
import { IdQueryInput, JobQueryBuilder } from 'queries/JobQueryBuilder';
import { baseStyles, SharedStyles, FilterScreenStyles } from 'constants/Styles';

export default function FilterScreen(props: StackScreenProps<RootStackParamList, 'Filter'>) {
  const { navigation, route: { params: { filterOptions, setFilterOptions } } } = props;
  const { tags = [] } = useAppQueryFilterStore() ?? {};
  const [searchbarText, setSearchbarText] = React.useState('');
  const [tagFilter, setTagFilter] = React.useState(filterOptions.where.tags_some ?? IdQueryInput.create({
    id_in: []
  }));

  const searchKeyword = searchbarText.toUpperCase();

  const tagPressed = (tag: Instance<typeof Tag>) => {
    const oldValue = getSnapshot(tagFilter);
    const newTagFilter = IdQueryInput.create(oldValue);
    newTagFilter.toggle(tag.id);
    setTagFilter(newTagFilter);
  };

  const updateFilter = () => {
    const filter = JobQueryBuilder.create();
    filter.setTagsQuery(tagFilter);
    setFilterOptions(filter);
    navigation.goBack();
  };

  return (
    <FormattedScreen>
      <ScrollView style={SharedStyles.maintainInfoWidth}>
        <Text style={SharedStyles.textHeaderMargin}>Filter by tags</Text>
        <Searchbar
          placeholder="Search tags"
          onChangeText={setSearchbarText}
          value={searchbarText}
          style={baseStyles.marginVerticalSmall}
        />
        <View style={FilterScreenStyles.filterContainer}>
          {
            tags.filter(tag => tag.name.toUpperCase().includes(searchKeyword)).map(tag => (
              <Chip
                mode="flat"
                key={tag.id}
                selected={tagFilter.has(tag.id)}
                onPress={() => tagPressed(tag)}
                style={SharedStyles.tagChipSpacing}
              >
                {tag.name}
              </Chip>
            ))
          }
        </View>
      </ScrollView>
      <Button
        onPress={updateFilter}
        mode="contained"
        color={Colors.header.background}
        labelStyle={SharedStyles.textLargeMargin}
      >
        Apply Filter
      </Button>
    </FormattedScreen>
  );
}
