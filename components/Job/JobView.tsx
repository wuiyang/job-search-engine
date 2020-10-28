import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import Job from 'models/Job';
import toCountryEmoji from 'helpers/CountryEmojiConverter';
import City from 'models/City';
import Remote from 'models/Remote';

const JOB_INFO_MAX_WIDTH = 600;
const IMAGE_SIZE = 80;

const styles = StyleSheet.create({
  jobView: {
    width: '100%',
    minHeight: 120,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  featured: {
    minHeight: 160,
    backgroundColor: '#f0f5ff'
  },
  jobInfo: {
    width: '100%',
    maxWidth: JOB_INFO_MAX_WIDTH,
    margin: 'auto',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobTextContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  locationTextContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    minWidth: IMAGE_SIZE,
    maxWidth: IMAGE_SIZE,
    minHeight: IMAGE_SIZE,
    maxHeight: IMAGE_SIZE,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  logoText: {
    fontSize: 40,
    color: '#555'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flexShrink: 1
  },
  normalText: {
    fontSize: 15,
    marginTop: 10,
    flexShrink: 1
  },
  featuredChip: {
    maxWidth: JOB_INFO_MAX_WIDTH,
    width: '100%',
    marginHorizontal: 'auto',
  },
  featuredText: {
    width: 80,
    borderWidth: 2,
    borderColor: '#05f',
    borderRadius: 5,
    color: '#05f',
    marginBottom: -12,
    padding: 4,
    fontSize: 15,
    textAlign: 'center'
  }
});

export type JobViewProps = {
  job: Job
};

function JobView(props: JobViewProps) {
  const {
    title,
    company: {
      name: companyName,
      logoUrl
    },
    cities,
    remotes,
    isFeatured
  } = props.job;

  return (
    <View style={[styles.jobView, isFeatured ? styles.featured : null]}>
      {getFeatureTag(isFeatured)}
      <View style={styles.jobInfo}>
        {getCompanyImage(companyName, logoUrl)}
        <View style={styles.jobTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.normalText}>{companyName}</Text>
          {getLocationText(cities, remotes)}
        </View>
      </View>
    </View>
  );
};

JobView.propTypes = {
  job: PropTypes.object.isRequired
};

function getFeatureTag(isFeatured: boolean) {
  if (!isFeatured) {
    return null;
  }
  return (
    <View style={styles.featuredChip}>
      <Text style={styles.featuredText}>Featured</Text>
    </View>
  );
}

function getLocationText(cities: City[], remotes: Remote[]) {
  // gather city and remote string
  const citiesString = cities.map((city) => city.name).join(', ');
  const remotesString = remotes.map((remote) => remote.name).join(', ');
  
  // get country emoji
  const countryEmoji = cities.length > 0 ? toCountryEmoji(cities[0].country.isoCode) : '';

  // Text element
  let citiesText = null, spacingText = null, remotesText = null;

  if (citiesString) {
    citiesText = <Text style={styles.normalText}>{countryEmoji} {citiesString}</Text>;
  }

  if (remotesString) {
    remotesText = <Text style={[styles.normalText, {fontStyle: 'italic'}]}>{remotesString}</Text>;
  }

  // spacingText provides the comma between cities text and remotes text
  if (citiesString && remotesString) {
    spacingText = <Text style={styles.normalText}>, </Text>;
  }

  return (
    <View style={styles.locationTextContainer}>
      {citiesText}{spacingText}{remotesText}
    </View>
  );
}

function getCompanyImage(companyName: string, logoUrl?: string) {
  if (logoUrl != null && logoUrl.length > 0) {
    return (<Image style={styles.image} source={{ uri: logoUrl }}></Image>);
  } else {
    return (
      <View style={styles.image}>
        <Text style={styles.logoText}>{companyName.charAt(0)}</Text>
      </View>
    );
  }
}

export default JobView;