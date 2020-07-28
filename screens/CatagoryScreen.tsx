import React, { FC, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TRootParmList } from '../App';
import VerticalNewspaperList from '../components/VerticalNewspaperList';
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
            <VerticalNewspaperList
                title={title}
                options={{ ...options, limit: 200 }}
            />
        );
    }


export default CatagoryScreen;