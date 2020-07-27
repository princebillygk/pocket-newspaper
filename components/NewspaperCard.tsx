import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { INewspaper } from '../types';
import InAppBrowser from 'react-native-inappbrowser-reborn';



const NewspaperCard: FC<INewspaper> = (paper) => {
    async function openBrowser() {
        try {
            const url = 'https://www.google.com'
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'overFullScreen',
                    modalTransitionStyle: 'partialCurl',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
                Alert.alert(JSON.stringify(result))
            }
            else Linking.openURL(url)
        } catch (error) {
            Alert.alert(error.message)
            throw error;
        }
    }

    return (
        <TouchableOpacity onPress={openBrowser} >
            <View style={styles.newsCard}>
                <View style={styles.thumbnailContainer}>
                    <Image style={styles.thumbnail} source={{ uri: paper.imgurl }} />
                </View>
                <Text style={styles.title}>{paper.bn_name ? paper.bn_name : paper.name.toUpperCase()}</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    newsCard: {
        backgroundColor: "#eceff1",
        padding: 15,
        margin: 5,
        borderRadius: 5,
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontSize: 10,
        marginTop: 5,
        fontWeight: "bold",
        color: "#607d8b"
    },
    thumbnailContainer: {
        width: 100,
        height: 70
    },
    thumbnail: {
        resizeMode: 'contain',
        ...StyleSheet.absoluteFillObject
    }
});

export default NewspaperCard;