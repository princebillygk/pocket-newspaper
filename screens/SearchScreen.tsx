import React, { FC, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import SearchBox from '../components/SearchBox';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import useNewspapers from '../hooks/useNewspapers';
import NewspaperList from '../components/NewspaperList';
import ErrorMsg from '../components/ErrorMessage';




const SearchScreen: FC<StackScreenProps<TRootParmList, 'Search'>> =
    ({ navigation }) => {
        const [searchTerm, setSearchTerm] = useState<string>("");
        const { newspapers, getNewspaper, error, isLoading } = useNewspapers();
        console.log(newspapers);

        if (error) {
            return <ErrorMsg />
        }

        return (
            <>
                <SearchBox
                    placeholder="Search"
                    isLoading={isLoading}
                    onChangeText={setSearchTerm}
                    onEndEditing={() => getNewspaper({ term: searchTerm })}
                    value={searchTerm}
                />

                {/* <FlatList
                    data={catagories}
                    keyExtractor={catagory => catagory.title}
                    renderItem={({ item: catagory }) => */}
                <NewspaperList
                    title="Hello"
                    data={newspapers}
                />
                {/* }
                    ListHeaderComponent={LanguageList}
                /> */}
            </>
        );
    }


export default SearchScreen;