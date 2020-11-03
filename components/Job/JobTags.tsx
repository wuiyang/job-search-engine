import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import SimpleChip from 'components/SimpleChip';
import { Tag } from 'models/Job';
import Colors from 'constants/Colors';
import { Instance } from 'mobx-state-tree';
import { IdQueryInput } from 'queries/JobQueryBuilder';

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
  selectedChip: {
    backgroundColor: Colors.featured.text,
    borderColor: Colors.featured.text,
    color: '#fff',
  },
  featuredText: {
    borderColor: Colors.featured.text,
    color: Colors.featured.text,
  },
});

export type JobTagsProps = {
  selectedTags?: Instance<typeof IdQueryInput> | null,
  tags: Instance<typeof Tag>[],
  isFeatured?: boolean,
  limitAmount?: number
}

export default function JobTags(props: JobTagsProps) {
  const { selectedTags, tags, isFeatured = false, limitAmount = 0 } = props;
  let shinyTags: Instance<typeof Tag>[] = [], normalTags: Instance<typeof Tag>[] = [];

  tags.forEach(tag => {
    if (selectedTags?.has(tag.id)) {
      shinyTags.push(tag);
    } else {
      normalTags.push(tag);
    }
  });

  if (limitAmount > 0) {
    shinyTags = shinyTags.slice(0, limitAmount);
    normalTags = normalTags.slice(0, limitAmount - shinyTags.length);
  }

  return (
    <View style={styles.tagChipContainer}>
    {
      shinyTags.map(tag => (
        <SimpleChip
          chipStyle={styles.tagChip}
          textStyle={[isFeatured ? styles.featuredText : null, styles.selectedChip]}
          key={tag.id}
        >
          {tag.name}
        </SimpleChip>
      ))
    }
    {
      normalTags.map(tag => (
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

JobTags.propTypes = {
  tags: PropTypes.array.isRequired,
  isFeatured: PropTypes.bool,
  limitAmount: PropTypes.number
}
