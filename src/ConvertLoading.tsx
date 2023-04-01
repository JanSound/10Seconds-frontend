import React, { useEffect } from 'react';
import { Text } from 'react-native';

const ConvertLoading = (props: any) => {
  const { navigation } = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Select');
    }, 1000);
  });
  return (
    <>
      <Text>a</Text>
    </>
  );
};

export default ConvertLoading;
