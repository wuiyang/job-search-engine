import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#333',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerText: {
    marginVertical: 5,
    fontSize: 15,
    color: '#e5e5e5',
  },
  link: {
    color: '#7BBAFF'
  }
});

export default function AppFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Author: Tan Wui Yang</Text>
      <Text style={styles.footerText}>Made with React Native.</Text>
      <Text style={styles.footerText}>Demostrating GraphQL API.</Text>
      <Text style={styles.footerText}>
        GraphQL server:
        <Text style={[styles.footerText, styles.link]} onPress={() => Linking.openURL("https://graphql.jobs/")}>
          https://graphql.jobs/
        </Text>
      </Text>
    </View>
  );
}