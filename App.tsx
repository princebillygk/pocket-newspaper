
import React, { FC } from 'react';
//configs imports
import APP from './config/app';
//library Components imports
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screen imports
import SearchScreen from './screens/SearchScreen';

export type TRootParmList = {
  Search: undefined;
}

// declare const global: { HermesInternal: null | {} };
const { Navigator, Screen } = createStackNavigator<TRootParmList>();

const App: FC = () => {
  return (
        <NavigationContainer >
          <Navigator screenOptions={{
            headerStyle: styles.headerStyle,
            cardStyle: styles.screenStyle
          }}>
            <Screen name="Search" component={SearchScreen} options={{ title: APP.TITLE }} />
          </Navigator>
        </NavigationContainer>
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
  screenStyle: {
    backgroundColor: "#fff"
  }
});

export default App;