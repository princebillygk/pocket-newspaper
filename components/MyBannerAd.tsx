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
                unitId={"BannerAdca-app-pub-3928424957314681/2691234648"}
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