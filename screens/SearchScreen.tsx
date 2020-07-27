import React, { FC, useState, useEffect } from 'react';
import { FlatList, BackHandler } from 'react-native';
import SearchBox from '../components/SearchBox';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import useNewspapers from '../hooks/useNewspapers';
import NewspaperList from '../components/NewspaperList';
import { INewspaper } from '../types';
import ErrorMsg from '../components/ErrorMessage';




const SearchScreen: FC<StackScreenProps<TRootParmList, 'Search'>> =
    ({ navigation }) => {
        const [searchTerm, setSearchTerm] = useState<string>("");
        const [{ newspapersWithPagination, catagories, isLoading, isError, errorDetails }, searchNewspaper] = useNewspapers();

        let tempNewspapers: { [key: string]: INewspaper[] } = {
            bn: [],
            en: []
        };

        function handleBackButtonClick() {
            if (searchTerm == "") {
                return false;
            }
            setSearchTerm("");
            searchNewspaper(searchTerm);
            return true;
        }

        useEffect(() => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
            };
        }, []);

        if (newspapersWithPagination && catagories) {
            for (const paperIndex in newspapersWithPagination.data) {
                if (newspapersWithPagination.data[paperIndex].lang === 'bn') {
                    tempNewspapers['bn'].push(newspapersWithPagination.data[paperIndex]);
                } else {
                    tempNewspapers['en'].push(newspapersWithPagination.data[paperIndex]);
                }
                for (const catagoryIndex in catagories) {
                    for (const paperCatagoryIndex in newspapersWithPagination.data[paperIndex].catagories) {
                        if (newspapersWithPagination.data[paperIndex].catagories[paperCatagoryIndex].id === catagories[catagoryIndex].id) {
                            if (tempNewspapers[catagories[catagoryIndex].title]) {
                                tempNewspapers[catagories[catagoryIndex].title].push(newspapersWithPagination.data[paperIndex]);
                            } else {
                                tempNewspapers[catagories[catagoryIndex].title] = [newspapersWithPagination.data[paperIndex]]
                            }
                        }
                    }
                }
            }
        }

        // console.log(tempNewspapers);

        if (isError) {
            return <ErrorMsg />
        }

        const LanguageList: FC = () => (
            <>
                <NewspaperList
                    title={"Bengali"}
                    data={tempNewspapers.bn}
                />
                <NewspaperList
                    title={"English"}
                    data={tempNewspapers.en}
                />
            </>
        )

        return (
            <>
                <SearchBox
                    placeholder="Search"
                    isLoading={isLoading}
                    onChangeText={setSearchTerm}
                    onEndEditing={() => searchNewspaper(searchTerm)}
                    value={searchTerm}
                />



                <FlatList
                    data={catagories}
                    keyExtractor={catagory => catagory.title}
                    renderItem={({ item: catagory }) =>
                        <NewspaperList
                            title={catagory.title}
                            data={tempNewspapers[catagory.title]}
                        />
                    }
                    ListHeaderComponent={LanguageList}
                />
            </>
        );
    }


export default SearchScreen;