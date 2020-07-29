import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert, Dimensions } from 'react-native';
import { INewspaper } from '../types';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface INewspaperCardProps extends INewspaper {
    full?: boolean
}

const NewspaperCard: FC<INewspaperCardProps> = ({ full, ...paper }) => {
    async function openBrowser(url: string) {
        try {
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
                // Alert.alert(JSON.stringify(result))
            }
            else Linking.openURL(url)
        } catch (error) {
            Alert.alert("Something went wrong")
        }
    }


    return (
        <TouchableOpacity onPress={() => openBrowser(paper.url)} >
            <View style={full ? styles.newsCardfull : styles.newsCard}>
                <View style={full ? styles.thumbnailContainerFull : styles.thumbnailContainer}>
                    <Image style={styles.thumbnail} source={{ uri: paper.imageUrl }} />
                </View>
                <Text numberOfLines={1} style={full ? styles.titleFull : styles.title}>
                    {paper.bnName ? paper.bnName : paper.name.toUpperCase()}
                </Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    newsCard: {
        backgroundColor: "#eceff1",
        padding: 15,
        marginRight: windowWidth * 0.03,
        borderRadius: 5,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 5,
    },
    newsCardfull: {
        backgroundColor: "#eceff1",
        marginVertical: windowWidth * 0.01,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: windowWidth * 0.04,
        paddingVertical: windowWidth * 0.01,
        // elevation: 1
    },
    title: {
        fontSize: windowWidth * 0.028,
        marginTop: 5,
        fontWeight: "bold",
        color: "#607d8b"
    },
    titleFull: {
        fontSize: windowWidth * 0.035,
        width: windowWidth * 0.55,
        fontWeight: "bold",
        color: "#607d8b",
    },
    thumbnailContainer: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.1
    },
    thumbnailContainerFull: {
        width: windowHeight * 0.1,
        height: windowHeight * 0.08,
    },
    thumbnail: {
        resizeMode: 'contain',
        ...StyleSheet.absoluteFillObject
    }
});

export default NewspaperCard;