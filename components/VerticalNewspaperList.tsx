import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { INewspaper } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import useNewspaper, { INewspaperQueryOptions } from '../hooks/useNewspapers';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

//components imports
import NewspaperCard from './NewspaperCard';

export interface INewspaperListProps {
    title: string
    options?: INewspaperQueryOptions
}

const VerticalNewspaperList: FC<INewspaperListProps> = ({ title, options }) => {
    const { newspapers, isLoading, error } = useNewspaper(options);
    if (newspapers === undefined || newspapers.length === 0) {
        return null;
    }
    return (
        <>
            <FlatList
                data={newspapers}
                keyExtractor={paper => paper.id + paper.name}
                renderItem={({ item }) => <NewspaperCard full {...item} />} />
        </>
    );
}


export default VerticalNewspaperList;