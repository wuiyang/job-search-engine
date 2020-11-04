import React from 'react';
import { Text, View, ActivityIndicator, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { QueryResult } from 'react-apollo';
import { MaterialIcons } from '@expo/vector-icons';
import { baseStyles } from 'constants/Styles';

export type QueryLoadingWrapperProps = {
  loadingText?: string,
  errorText?: string,
  render: (data: any) => JSX.Element,
  useQueryFunction: () => QueryResult
};

export default function QueryLoadingWrapper(props: QueryLoadingWrapperProps) {
  const {
    loadingText = 'Loading...',
    errorText = 'Error! Unable to load data!',
    render,
    useQueryFunction
  } = props;
  const { data, loading, error, refetch } = useQueryFunction();

  if (loading) {
    return (
      <View style={baseStyles.flexCenter}>
        <ActivityIndicator size="large" />
        <Text>{loadingText}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <Pressable style={baseStyles.flexCenter} onPress={() => refetch()}>
        <MaterialIcons name="error" size={50} color="black" />
        <Text>{errorText}</Text>
        <Text>Press anywhere to refresh</Text>
      </Pressable>
    );
  }

  return render(data);
};

QueryLoadingWrapper.propTypes = {
  loadingText: PropTypes.string,
  errorText: PropTypes.string,
  render: PropTypes.func.isRequired,
  useQueryFunction: PropTypes.func.isRequired
};
