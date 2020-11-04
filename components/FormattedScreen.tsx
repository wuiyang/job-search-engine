import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';
import Colors from 'constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
  }
});

export type FormattedScreenProps = {
  style?: StyleProp<ViewStyle>,
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