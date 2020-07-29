import React, { FC, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import NewspaperList from '../components/NewspaperList';
import ErrorMsg from '../components/ErrorMessage';
import useCatagories from '../hooks/useCatagories';




const CatagoryScreen: FC<StackScreenProps<TRootParmList, 'Catagory'>> =
    ({ route, navigation }) => {
        const { title, options } = route.params;
        const [searchTerm, setSearchTerm] = useState<string>("");
        const { catagories, error, isLoading } = useCatagories();

        if (error) {
            return <ErrorMsg />
        }



        return (
            <NewspaperList
                options={{ ...options, limit: 200 }}
                full
            />
        );
    }


export default CatagoryScreen;