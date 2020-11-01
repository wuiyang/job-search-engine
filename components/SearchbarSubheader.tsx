import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
});

export default function SearchbarHeader() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <View>
      <Searchbar
        placeholder="Search job title"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
}