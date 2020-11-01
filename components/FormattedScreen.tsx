import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  }
});
export type FormattedScreenProps = {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[],
  children: React.ReactNode
};

export default function FormattedScreen(props: FormattedScreenProps) {
  const { style, children } = props;
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

FormattedScreen.propTypes = {
  children: PropTypes.node.isRequired
};