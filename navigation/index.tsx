import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import JobDescriptionScreen from 'screens/JobDescriptionScreen';
import SearchScreen from 'screens/SearchScreen';
import Colors from 'constants/Colors';
import FilterScreen from 'screens/FilterScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const screenOptions: StackNavigationOptions = {
    headerTitleAlign: 'center',
    headerStyle: { 
      backgroundColor: Colors.header.background
    },
    headerTintColor: Colors.header.text
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search Jobs' }} />
      <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Filter Options' }} />
      <Stack.Screen name="JobDescription" component={JobDescriptionScreen} options={{ title: 'Job Description' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
