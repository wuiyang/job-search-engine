import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SimpleChip from 'components/SimpleChip';
import { Tag } from 'models/Job';
import { Instance } from 'mobx-state-tree';
import { IdQueryInput } from 'queries/JobQueryBuilder';
import { JobTagsStyles, SharedStyles } from 'constants/Styles';

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
    <View style={JobTagsStyles.tagChipContainer}>
    {
      shinyTags.map(tag => (
        <SimpleChip
          chipStyle={SharedStyles.tagChipSpacing}
          textStyle={[isFeatured ? JobTagsStyles.featuredText : null, JobTagsStyles.selectedChip]}
          key={tag.id}
        >
          {tag.name}
        </SimpleChip>
      ))
    }
    {
      normalTags.map(tag => (
        <SimpleChip
          chipStyle={SharedStyles.tagChipSpacing}
          textStyle={isFeatured ? JobTagsStyles.featuredText : null}
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
