import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
import Layout from 'constants/Layout';

const styles = StyleSheet.create({
  maintainWidth: {
    flex: 1,
    width: '100%',
    maxWidth: Layout.infoMaxWidth,
    paddingHorizontal: 20,
    paddingBottom: 20,
    margin: 'auto'
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  chipSpacing: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  normalText: {
    fontSize: 15,
    marginTop: 5
  },
  searchbar: {
    marginVertical: 5
  }
});

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
      <ScrollView style={styles.maintainWidth}>
        <Text style={styles.header}>Filter by tags</Text>
        <Searchbar
          placeholder="Search tags"
          onChangeText={setSearchbarText}
          value={searchbarText}
          style={styles.searchbar}
        />
        <View style={styles.filterContainer}>
          {
            tags.filter(tag => tag.name.toUpperCase().includes(searchKeyword)).map(tag => (
              <Chip
                mode="flat"
                key={tag.id}
                selected={tagFilter.has(tag.id)}
                onPress={() => tagPressed(tag)}
                style={styles.chipSpacing}
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
        labelStyle={{ fontSize: 20 }}
      >
        Apply Filter
      </Button>
    </FormattedScreen>
  );
}
