import React, { FC } from 'react';
import { View, TextInput, TextInputProps, StyleSheet, ActivityIndicator } from 'react-native';

//icon imports

export interface ISearchBoxProps extends Required<Pick<TextInputProps, 'placeholder' | 'onChangeText' | 'onEndEditing' | 'value'>> {
    isLoading: boolean
}

const SearchBox: FC<ISearchBoxProps> = ({ isLoading, ...options }) => {
    return (
        <View style={styles.searchBoxContainer}>
            {/* <Image source={{uri: './assets/icons/search-icon.png'}}/> */}
            <TextInput
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                style={styles.text}
                {...options}
            />
            <ActivityIndicator animating={isLoading} style={{ margin: 10 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        padding: 10,
        flex: 1
    },
    searchBoxContainer: {
        backgroundColor: "rgb(235, 245, 245)",
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: "row"
    },
    icon: {
        alignSelf: "center",
        fontSize: 25,
        marginHorizontal: 10
    }
});

export default SearchBox;