import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { INewspaper } from '../types';
import { FlatList } from 'react-native-gesture-handler';

//components imports
import NewspaperCard from './NewspaperCard';

export interface INewspaperListProps {
    title: string
    data?: INewspaper[]
}

const NewspaperList: FC<INewspaperListProps> = ({ title, data }) => {
    if (data === undefined || data.length === 0) {
        return null;
    }
    return (
        <View style={styles.list}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal
                data={data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={paper => paper.id + paper.name}
                renderItem={({ item }) => <NewspaperCard {...item} />} />
        </View >
    );
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

export default NewspaperList;