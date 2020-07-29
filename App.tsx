
import React, { FC } from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screen imports
import HomeScreen from './screens/HomeScreen';
import CatagoryScreen from './screens/CatagoryScreen';
import NewspaperScreen from './screens/NewspaperScreen';

import { INewspaper } from 'types';
import { INewspaperQueryOptions } from 'hooks/useNewspapers';

export type TRootParmList = {
  Home: undefined;
  Catagory: { title: string, options: INewspaperQueryOptions },
  Newspaper: { newspaper: INewspaper }
}

// declare const global: { HermesInternal: null | {} };
const { Navigator, Screen } = createStackNavigator<TRootParmList>();

const App: FC = () => {
  return (
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
        <Screen name="Newspaper" component={NewspaperScreen} options={({ route }) => ({
          headerTitle: props => (
            <View style={{ ...styles.headerContainer, ...styles.paperHeaderContainer }} >
              <Image style={styles.paperLogo} source={{ uri: route.params.newspaper.imageUrl }} />
              <Text {...props} numberOfLines={1} style={styles.paperHeaderText}>{route.params.newspaper.name}</Text>
            </View>)
        })} />
      </Navigator>
    </NavigationContainer>
  );
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

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
  paperHeaderContainer: {
    justifyContent: "flex-start"
  },
  paperHeaderText: {
    color: "#607d8b",
    fontWeight: "bold",
    textTransform: "uppercase",
    width: windowWidth * 0.5
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 15,
    resizeMode: 'contain',
  },
  paperLogo: {
    resizeMode: 'contain',
    width: 48,
    height: 20,
    marginRight: 15,
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