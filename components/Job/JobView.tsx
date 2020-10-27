import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, View as ThemedView } from 'components/Themed';
import PropTypes from 'prop-types';

import ToCountryEmoji from 'helpers/CountryEmojiConverter';

const styles = StyleSheet.create({
  jobView: {
    width: '100%',
    height: 120,
  },
  featured: {
    height: 160,
    paddingVertical: 15,
    backgroundColor: '#f0f5ff'
  },
  jobInfo: {
    width: 600,
    margin: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    maxWidth: 60,
    maxHeight: 60,
    height: '100%',
    marginHorizontal: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  normalText: {
    fontSize: 15,
    marginTop: 10
  },
  featuredChip: {
    width: 600,
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

function JobView({ title, company, country, countryIsoCode, featured }) {
  const countryEmoji = ToCountryEmoji(countryIsoCode);
  const featuredTag = featured ? (
                        <View style={styles.featuredChip}>
                          <Text style={styles.featuredText}>Featured</Text>
                        </View>
                      ) : null;

  return (
    <ThemedView style={[styles.jobView, featured ? styles.featured : null]}>
      {featuredTag}
      <View style={styles.jobInfo}>
        <Image style={styles.image} source={{ uri: 'https://logo.clearbit.com/segment.com?size=200' }}></Image>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.normalText}>{company}</Text>
          <Text style={styles.normalText}>{countryEmoji} {country}</Text>
        </View>
      </View>
    </ThemedView>
  );
};

JobView.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  countryIsoCode: PropTypes.string,
  featured: PropTypes.bool,
};

JobView.defaultProps = {
  featured: false,
  countryIsoCode: ''
};

export default JobView;