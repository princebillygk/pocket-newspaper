import React, { FC, useState } from 'react';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import {View} from 'react-native';
import Styles from '../styles';


export interface IMyBannerAdProps {
    size?: keyof typeof BannerAdSize;
}

const MyBannerAd: FC<IMyBannerAdProps> = ({ size }) => {
    const [isAdLoaded, setIsAtLoaded] = useState<boolean>(false);

    return (
        <View
            {...!isAdLoaded && { style: Styles.dNone }}>
            < BannerAd
                unitId={/*"ca-app-pub-6299317181860539/9447867268"*/TestIds.BANNER}
                size={size ? size : BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    setIsAtLoaded(true)
                }}
                onAdFailedToLoad={(error: any) => {
                    console.error('Advert failed to load: ', error);
                }}
            />
        </View >
    )
}


export default MyBannerAd;