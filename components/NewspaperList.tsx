import React, { FC } from 'react';
import { View, Text, StyleSheet, Dimensions, ProgressBarAndroid, FlatListProps } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import useNewspaper, { INewspaperQueryOptions } from '../hooks/useNewspapers';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

//components imports
import NewspaperCard from './NewspaperCard';
import { useNavigation } from '@react-navigation/native';
import { INewspaper } from 'types';

export interface INewspaperListProps extends Partial<FlatListProps<INewspaper>> {
    title?: string
    options?: INewspaperQueryOptions
    full?: boolean
}

const NewspaperList: FC<INewspaperListProps> = ({ title, options, full, ...flatListProps }) => {
    const { newspapers, isLoading, error } = useNewspaper(options);
    const navigation = useNavigation();

    if (isLoading) {
        if (full)
            return <ProgressBarAndroid animating={isLoading} styleAttr="Horizontal" color={"#2196F3"} />
        else {
            return <ProgressBarAndroid animating={isLoading} styleAttr="Small" color={"#eceff1"} />
        }
    } else if (newspapers?.length === 0 || !newspapers) {
        return null;
    }

    return (
        <>
            {title && <TouchableOpacity onPress={() => { navigation.navigate('Catagory', { title, options },) }}>
                <View style={styles.titleButton}><Text style={styles.title}>{title}</Text></View>
            </TouchableOpacity>}
            <FlatList style={styles.list}
                {...!full && { horizontal: true, showsHorizontalScrollIndicator: false }}
                data={newspapers}
                showsHorizontalScrollIndicator={false}
                keyExtractor={paper => paper.id + paper.name}
                renderItem={({ item }) => <NewspaperCard {...item} full={full}
                />}
                {...flatListProps}
            />
        </>
    );
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: windowWidth * 0.04,
    },
    title: {
        fontSize: windowWidth * 0.05,
        marginHorizontal: windowWidth * 0.04,
        marginTop: windowHeight*0.02,
        fontWeight: "bold"
    },
    titleButton: {
        marginBottom: windowWidth * 0.02,
    }
});

export default NewspaperList;