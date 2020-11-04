import React from 'react';
import { Text, View, StyleProp , TextStyle } from 'react-native';
import PropTypes from 'prop-types';
import { City, Remote } from 'models/Job';
import { Instance } from 'mobx-state-tree';
import { baseStyles, SharedStyles } from 'constants/Styles';

export type LocationTextProps = {
  cities: Instance<typeof City>[],
  remotes: Instance<typeof Remote>[],
  textStyle?: StyleProp<TextStyle>
};

export default function LocationText(props: LocationTextProps) {
  const { cities, remotes, textStyle } = props;
  // gather city and remote string
  const citiesString = cities.map((city) => city.name).join(', ');
  const remotesString = remotes.map((remote) => remote.name).join(', ');
  
  // get country emoji
  const countryEmoji = cities.length > 0 ? cities[0].country.countryEmoji : '';

  const usedTextStyle = textStyle ?? SharedStyles.textNormalMargin;

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
    <View style={baseStyles.flexRowWrap}>
      {citiesText}{spacingText}{remotesText}
    </View>
  );
}

LocationText.propTypes = {
  cities: PropTypes.array.isRequired,
  remotes: PropTypes.array.isRequired,
};
