import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import SimpleChip from 'components/SimpleChip';
import Tag from 'models/Tag';
import Colors from 'constants/Colors';

const styles = StyleSheet.create({
  tagChipContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 150,
    marginVertical: 5,
  },
  tagChip: {
    marginRight: 10,
    marginVertical: 5
  },
  featuredText: {
    borderColor: Colors.featured.text,
    color: Colors.featured.text,
  },
});

type JobTagsProps = {
  tags: Tag[],
  isFeatured?: boolean,
  limitAmount?: number
}

function JobTags(props: JobTagsProps) {
  const { tags, isFeatured, limitAmount = 0 } = props;
  let displayTags = tags;
  if (limitAmount > 0) {
    displayTags = displayTags.slice(0, limitAmount);
  }

  return (
    <View style={styles.tagChipContainer}>
    {
      displayTags.map(tag => (
        <SimpleChip
          chipStyle={styles.tagChip}
          textStyle={isFeatured ? styles.featuredText : null}
          key={tag.id}
        >
          {tag.name}
        </SimpleChip>
      ))
    }
  </View>
  )
}

export default JobTags;