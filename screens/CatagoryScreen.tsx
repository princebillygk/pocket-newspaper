import React, { FC, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import NewspaperList from '../components/NewspaperList';
import ErrorMsg from '../components/ErrorMessage';
import useCatagories from '../hooks/useCatagories';
import BannerAd from '../components/MyBannerAd';
import Styles from '../styles';
import { View } from 'react-native';




const CatagoryScreen: FC<StackScreenProps<TRootParmList, 'Catagory'>> =
    ({ route, navigation }) => {
        const { title, options } = route.params;
        return (
            <>
                <NewspaperList
                    options={{ ...options, limit: 200 }}
                    full
                    ListHeaderComponent={
                        <View style={Styles.bannerAdContainer}><BannerAd size="BANNER" /></View>
                    }
                    ListFooterComponent={
                        <View style={Styles.bannerAdContainer}><BannerAd size="MEDIUM_RECTANGLE" /></View>
                    }
                />
            </>
        );
    }


export default CatagoryScreen;