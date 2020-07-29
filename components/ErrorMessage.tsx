import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
//icon 
const { width } = Dimensions.get('window');
const ErrorMessage: FC<{ message: string }> = ({ message }) => (
    <View style={styles.errorContainer}>
        <Image source={require('../assets/icons/cloud-disconnect.png')} style={styles.disconnectIcon} />
        <Text style={styles.errorText}>
            {message}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    errorText: {
        fontSize: 18
    },
    disconnectIcon: {
        width: width * 0.2,
        height: width * 0.2,
        resizeMode: "contain"
    },
    errorContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ErrorMessage;