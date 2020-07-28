import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { INewspaper } from '../types';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import useNewspaper, { INewspaperQueryOptions } from '../hooks/useNewspapers';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

//components imports
import NewspaperCard from './NewspaperCard';
import { useNavigation } from '@react-navigation/native';

export interface INewspaperListProps {
    title: string
    options?: INewspaperQueryOptions
}

const NewspaperList: FC<INewspaperListProps> = ({ title, options }) => {
    const { newspapers, isLoading, error } = useNewspaper(options);
    const navigation = useNavigation();
    if (newspapers === undefined || newspapers.length === 0) {
        return null;
    }
    return (
        <View style={styles.list}>
            <TouchableOpacity onPress={() => { navigation.navigate('Catagory', { title, options },) }}>
                <View style={styles.titleButton}><Text style={styles.title}>{title}</Text></View>
            </TouchableOpacity>
            <FlatList
                horizontal
                data={newspapers}
                showsHorizontalScrollIndicator={false}
                keyExtractor={paper => paper.id + paper.name}
                renderItem={({ item }) => <NewspaperCard {...item} />} />
        </View >
    );
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: windowWidth * 0.04,
        marginVertical: windowWidth * 0.03
    },
    title: {
        fontSize: windowWidth * 0.05,
        fontWeight: "bold"
    },
    titleButton: {
        marginBottom: windowWidth * 0.02,
    }
});

export default NewspaperList;