import { StackScreenProps } from '@react-navigation/stack';
import { baseStyles, SharedStyles } from 'constants/Styles';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../types';

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  return (
    <View style={SharedStyles.maintainInfoWidth}>
      <Text style={SharedStyles.textLargeMargin}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Search')} style={baseStyles.paddingNormal}>
        <Text style={SharedStyles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

