import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import PropTypes from 'prop-types';
import { SimpleChipStyles } from 'constants/Styles';

export type SimpleChipProps = {
  chipStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  children: React.ReactNode
};

export default function SimpleChip(props: SimpleChipProps) {
  const { chipStyle, textStyle, children } = props;
  return (
    <View style={chipStyle}>
      <Text style={[SimpleChipStyles.chipText, textStyle]}>{children}</Text>
    </View>
  );
}

SimpleChip.propTypes = {
  children: PropTypes.node.isRequired
};
