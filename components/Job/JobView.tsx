import React from 'react';
import { StyleSheet, Text, View, Pressable, GestureResponderEvent, ViewStyle, StyleProp } from 'react-native';
import { Instance } from 'mobx-state-tree';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Job } from 'models/Job';
import SimpleChip from 'components/SimpleChip';
import CompanyLogo from 'components/Job/CompanyLogo';
import LocationText from 'components/Job/LocationText';
import Colors from 'constants/Colors';
import JobTags from './JobTags';

const JOB_INFO_MAX_WIDTH = 1000;

const styles = StyleSheet.create({
  jobView: {
    width: '100%',
    minHeight: 120,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  featured: {
    minHeight: 160,
    backgroundColor: Colors.featured.background
  },
  jobContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    maxWidth: JOB_INFO_MAX_WIDTH,
    margin: 'auto',
  },
  jobInfo: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  jobTextContainer: {
    flex: 2,
    flexDirection: 'column',
    minWidth: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: 15,
    marginTop: 5
  },
  timeAgoText: {
    color: '#666',
    fontSize: 12,
  },
  featuredChip: {
    maxWidth: JOB_INFO_MAX_WIDTH,
    width: '100%',
    marginHorizontal: 'auto',
  },
  featuredChipText: {
    alignSelf: 'flex-start'
  },
  featuredText: {
    borderColor: Colors.featured.text,
    color: Colors.featured.text,
  },
});

export type JobViewProps = {
  job: Instance<typeof Job>,
  onPress?: null | ((event: GestureResponderEvent) => void),
  showTags?: boolean,
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
  innerStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
};

export default function JobView(props: JobViewProps) {
  const {
    job: {
      title,
      company: {
        name: companyName,
        logoUrl
      },
      cities,
      remotes,
      tags,
      postedAt
    },
    onPress,
    showTags = false,
    style,
    innerStyle
  } = props;

  const isFeatured = !!props.job.isFeatured;

  return (
    <Pressable style={[styles.jobView, style, isFeatured ? styles.featured : null]} onPress={onPress}>
      {getFeatureTag(isFeatured, innerStyle)}
      <View style={[styles.jobContentWrapper, innerStyle]}>
        <CompanyLogo companyName={companyName} logoUrl={logoUrl} />
        <View style={styles.jobInfo}>
          <View style={styles.jobTextContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.normalText}>{companyName}</Text>
            <LocationText cities={cities} remotes={remotes} textStyle={styles.normalText} />
            <Text style={styles.timeAgoText}>Posted {moment(postedAt).fromNow()}</Text>
          </View>
          {showTags && <JobTags tags={tags} limitAmount={3} isFeatured={isFeatured} />}
        </View>
      </View>
    </Pressable>
  );
};

JobView.propTypes = {
  onPress: PropTypes.func,
  showTags: PropTypes.bool,
};

function getFeatureTag(isFeatured: boolean, innerStyle?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[]) {
  if (!isFeatured) {
    return null;
  }
  return (
    <SimpleChip
      chipStyle={[styles.featuredChip, innerStyle]}
      textStyle={[styles.featuredChipText, styles.featuredText]}
    >
      Featured
    </SimpleChip>
  );
}
