import React from 'react';
import { Text, View, Pressable, GestureResponderEvent, ViewStyle, StyleProp } from 'react-native';
import { Instance } from 'mobx-state-tree';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Job } from 'models/Job';
import SimpleChip from 'components/SimpleChip';
import CompanyLogo from 'components/Job/CompanyLogo';
import LocationText from 'components/Job/LocationText';
import JobTags from './JobTags';
import { IdQueryInput } from 'queries/JobQueryBuilder';
import { baseStyles, JobViewStyles, SimpleChipStyles } from 'constants/Styles';

export type JobViewProps = {
  job: Instance<typeof Job>,
  onPress?: null | ((event: GestureResponderEvent) => void),
  showTags?: boolean,
  style?: StyleProp<ViewStyle>,
  innerStyle?: StyleProp<ViewStyle>,
  selectedTags?: Instance<typeof IdQueryInput> | null
};

export default function JobView(props: JobViewProps) {
  const {
    job: {
      title,
      company,
      cities,
      remotes,
      tags,
      postedAt
    },
    onPress,
    showTags = false,
    selectedTags,
    style,
    innerStyle
  } = props;

  const isFeatured = !!props.job.isFeatured;

  return (
    <Pressable style={[JobViewStyles.jobView, style, isFeatured ? JobViewStyles.featured : null]} onPress={onPress}>
      <FeatureTag isFeatured={isFeatured} style={innerStyle} />
      <View style={[JobViewStyles.jobContentWrapper, innerStyle]}>
        <CompanyLogo company={company} />
        <View style={JobViewStyles.jobInfo}>
          <View style={JobViewStyles.jobTextContainer}>
            <Text style={baseStyles.textHeader}>{title}</Text>
            <Text style={baseStyles.textLarge}>{company.name}</Text>
            <LocationText cities={cities} remotes={remotes} textStyle={baseStyles.textNormal} />
            <Text style={JobViewStyles.timeAgoText}>Posted {moment(postedAt).fromNow()}</Text>
          </View>
          {showTags && <JobTags selectedTags={selectedTags} tags={tags} limitAmount={3} isFeatured={isFeatured} />}
        </View>
      </View>
    </Pressable>
  );
};

JobView.propTypes = {
  onPress: PropTypes.func,
  showTags: PropTypes.bool,
};

type FeatureTagProps = {
  isFeatured: boolean,
  style?: StyleProp<ViewStyle>
}

function FeatureTag(props: FeatureTagProps) {
  const { isFeatured, style } = props;
  if (!isFeatured) {
    return null;
  }

  return (
    <SimpleChip
      chipStyle={[SimpleChipStyles.featuredChip, style]}
      textStyle={SimpleChipStyles.featuredText}
    >
      Featured
    </SimpleChip>
  );
}
