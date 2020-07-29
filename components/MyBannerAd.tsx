import React, { FC } from 'react';
//admob
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { StyleSheet, Dimensions, View, StyleProp, ViewStyle } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export interface IMyBannerAdProps {
    size?: keyof typeof BannerAdSize;
}

const MyBannerAd: FC<IMyBannerAdProps> = ({ size }) => {


    return (
        < BannerAd
            unitId={/*"ca-app-pub-6299317181860539/9447867268"*/TestIds.BANNER}
            size={size ? size : BannerAdSize.BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
                console.log('Advert loaded');
            }}
            onAdFailedToLoad={(error: any) => {
                console.error('Advert failed to load: ', error);
            }}
        />
    )
}


export default MyBannerAd;