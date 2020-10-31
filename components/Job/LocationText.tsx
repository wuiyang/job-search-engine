import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import City from 'models/City';
import Remote from 'models/Remote';
import toCountryEmoji from 'helpers/CountryEmojiConverter';

const styles = StyleSheet.create({
  locationTextContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  normalText: {
    fontSize: 15,
    marginTop: 5
  },
});

type LocationTextProps = {
  cities: City[],
  remotes: Remote[],
  textStyle?: any
};

function LocationText(props: LocationTextProps) {
  const { cities, remotes, textStyle } = props;
  // gather city and remote string
  const citiesString = cities.map((city) => city.name).join(', ');
  const remotesString = remotes.map((remote) => remote.name).join(', ');
  
  // get country emoji
  const countryEmoji = cities.length > 0 ? toCountryEmoji(cities[0].country.isoCode) : '';

  const usedTextStyle = textStyle ?? styles.normalText;

  // Text element
  let citiesText = null, spacingText = null, remotesText = null;

  if (citiesString) {
    citiesText = <Text style={usedTextStyle}>{countryEmoji} {citiesString}</Text>;
  }

  if (remotesString) {
    remotesText = <Text style={[usedTextStyle, {fontStyle: 'italic'}]}>{remotesString}</Text>;
  }

  // spacingText provides the comma between cities text and remotes text
  if (citiesString && remotesString) {
    spacingText = <Text style={usedTextStyle}>, </Text>;
  }

  return (
    <View style={styles.locationTextContainer}>
      {citiesText}{spacingText}{remotesText}
    </View>
  );
}

LocationText.propTypes = {
  cities: PropTypes.instanceOf(City).isRequired,
  remotes: PropTypes.instanceOf(Remote).isRequired,
  textStyle: PropTypes.object
};

LocationText.defaultProps = {
  textStyle: null
}

export default LocationText;
