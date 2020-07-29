import React, { FC, useState, useEffect } from 'react';
import { FlatList, ProgressBarAndroid, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import NewspaperList from '../components/NewspaperList';
import ErrorMsg from '../components/ErrorMessage';
import useCatagories from '../hooks/useCatagories';
import BannerAd from '../components/MyBannerAd';
import Styles from '../styles';




const HomeScreen: FC<StackScreenProps<TRootParmList, 'Home'>> =
    ({ navigation }) => {
        const [searchTerm, setSearchTerm] = useState<string>("");
        const { catagories, error, isLoading } = useCatagories();

        if (error) {
            return <ErrorMsg message="Couldn't connect to server" />
        }

        const LanguageLists: FC = () => {
            if (isLoading)
                return null;
            return <>
                <NewspaperList
                    title="Bengali"
                    options={{ lang: "bn" }}
                />
                <NewspaperList
                    title="English"
                    options={{ lang: "en" }}
                />
                <View style={Styles.bannerAdContainer}><BannerAd size="LARGE_BANNER" /></View>
            </>
        }


        return (
            <>
                <ProgressBarAndroid animating={isLoading} styleAttr="Horizontal" />

                <FlatList
                    data={catagories}
                    keyExtractor={catagory => catagory.title}
                    renderItem={({ item: catagory }) =>
                        <NewspaperList
                            title={catagory.title}
                            options={{ catagories: [catagory.title] }}
                        />
                    }
                    ListHeaderComponent={LanguageLists}
                    ListFooterComponent={
                        <View style={Styles.bannerAdContainer}><BannerAd size="MEDIUM_RECTANGLE" /></View>
                    }
                />
            </>
        );
    }


export default HomeScreen;