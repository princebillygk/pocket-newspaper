import React, { FC, useState, useEffect } from 'react';
import { FlatList, ProgressBarAndroid } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import NewspaperList from '../components/NewspaperList';
import ErrorMsg from '../components/ErrorMessage';
import useCatagories from '../hooks/useCatagories';




const HomeScreen: FC<StackScreenProps<TRootParmList, 'Home'>> =
    ({ navigation }) => {
        const [searchTerm, setSearchTerm] = useState<string>("");
        const { catagories, error, isLoading } = useCatagories();

        if (error) {
            return <ErrorMsg />
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
                />
            </>
        );
    }


export default HomeScreen;