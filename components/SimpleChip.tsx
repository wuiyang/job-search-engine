import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export type SimpleChipProps = {
  chipStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>[],
  textStyle?: StyleProp<TextStyle> | StyleProp<TextStyle>[],
  children: React.ReactNode
};

const styles = StyleSheet.create({
  chipText: {
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 15,
    textAlign: 'center',
    borderColor: '#aaa',
  }
});

export default function SimpleChip(props: SimpleChipProps) {
  const { chipStyle, textStyle, children } = props;
  return (
    <View style={chipStyle}>
      <Text style={[styles.chipText, textStyle]}>{children}</Text>
    </View>
  );
}

SimpleChip.propTypes = {
  children: PropTypes.node.isRequired
};
