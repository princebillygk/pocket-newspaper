
import React, { FC } from 'react';
//configs imports
import APP from './config/app';
//library Components imports
import { StyleSheet, StatusBar, SafeAreaView, View, Text, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screen imports
import HomeScreen from './screens/HomeScreen';
import CatagoryScreen from './screens/CatagoryScreen';

//admob
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { ICatagory } from 'types';
import { INewspaperQueryOptions } from 'hooks/useNewspapers';

export type TRootParmList = {
  Home: undefined;
  Catagory: { title: string, options: INewspaperQueryOptions }
}

// declare const global: { HermesInternal: null | {} };
const { Navigator, Screen } = createStackNavigator<TRootParmList>();

const App: FC = () => {
  return (
    <>
      <NavigationContainer >
        <Navigator screenOptions={{
          headerStyle: styles.headerStyle,
          cardStyle: styles.screenStyle,
        }}>
          <Screen name="Home" component={HomeScreen} options={{
            headerTitle: props => (
              <View style={styles.headerContainer} >
                <Image style={styles.headerLogo} source={require('./assets/img/logo.png')} />
                <Text {...props} style={styles.headerText}>Pocket Newspaper</Text>
              </View>)
          }} />
          <Screen name="Catagory" component={CatagoryScreen} options={({ route }) => ({ title: route.params.title })} />
        </Navigator>
      </NavigationContainer>
      <BannerAd
        unitId={/*"ca-app-pub-6299317181860539/9447867268"*/TestIds.BANNER}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={(error: any) => {
          console.error('Advert failed to load: ', error);
        }}
      />
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    elevation: 0
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 15
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20
  },
  screenStyle: {
    backgroundColor: "#fff"
  }
});

export default App;