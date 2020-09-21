import React, { FC, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import { TRootParmList } from '../App';
import { ProgressBarAndroid, Button, Linking, Alert } from 'react-native';
import ErrorMessage from '../components/ErrorMessage';



const NewspaperScreen: FC<StackScreenProps<TRootParmList, 'Newspaper'>> =
    ({ route, navigation }) => {
        const [{ isLoading, error }, setStatus] = useState<{ isLoading?: boolean, error?: string }>({});
        const { newspaper } = route.params;
        if (error) {
            return <ErrorMessage message="Couldn't connect to internet" />
        }
        return (
            <>
                <ProgressBarAndroid animating={isLoading} styleAttr="Horizontal" />
                <WebView
                    source={{
                        uri: newspaper.url
                    }}
                    style={{ marginTop: 20 }}
                    onLoadStart={() => setStatus({ isLoading: true })}
                    onLoad={() => setStatus({ isLoading: false })}
                    onError={() => setStatus({ isLoading: false, error: "Couldn't connect to internet" })}
                />
                <Button onPress={async () => { await Linking.openURL(newspaper.url) }} title="Open in Browser" />
            </>
        );
    }


export default NewspaperScreen;