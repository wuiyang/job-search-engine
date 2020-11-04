import React from 'react';
import { View, Text, Linking } from 'react-native';
import { AppFooterStyles } from 'constants/Styles';

export default function AppFooter() {
  return (
    <View style={AppFooterStyles.footer}>
      <Text style={AppFooterStyles.footerText}>Author: Tan Wui Yang</Text>
      <Text style={AppFooterStyles.footerText}>Made with React Native.</Text>
      <Text style={AppFooterStyles.footerText}>Demostrating GraphQL API.</Text>
      <Text style={AppFooterStyles.footerText}>
        GraphQL server:
        <Text style={AppFooterStyles.footerLink} onPress={() => Linking.openURL("https://graphql.jobs/")}>
          https://graphql.jobs/
        </Text>
      </Text>
      <Text style={AppFooterStyles.footerLink} onPress={() => Linking.openURL("https://clearbit.com/")}>
        Logos provided by Clearbit.
      </Text>
    </View>
  );
}