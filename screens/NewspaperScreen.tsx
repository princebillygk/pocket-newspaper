import React, {FC, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {WebView} from 'react-native-webview';
import {TRootParmList} from '../App';
import {ProgressBarAndroid, View} from 'react-native';
import ErrorMessage from '../components/ErrorMessage';
import Styles from '../styles';
import BannerAd from '../components/MyBannerAd';

const NewspaperScreen: FC<StackScreenProps<TRootParmList, 'Newspaper'>> = ({
  route,
}) => {
  const [{isLoading, error}, setStatus] = useState<{
    isLoading?: boolean;
    error?: string;
  }>({});
  const {newspaper} = route.params;
  if (error) {
    return <ErrorMessage message="Couldn't connect to internet" />;
  }
  return (
    <>
      <ProgressBarAndroid animating={isLoading} styleAttr="Horizontal" />
      <WebView
        source={{
          uri: newspaper.url,
        }}
        style={{marginTop: 20}}
        onLoadStart={() => setStatus({isLoading: true})}
        onLoad={() => setStatus({isLoading: false})}
        onError={() =>
          setStatus({isLoading: false, error: "Couldn't connect to internet"})
        }
      />
      <View style={Styles.bannerAdContainer}>
        <BannerAd size="BANNER" />
      </View>
    </>
  );
};

export default NewspaperScreen;
