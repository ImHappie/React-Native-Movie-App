import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Image } from 'react-native';

import SearchScreen from "./src/screen/Search";
import FavoriteScreen from "./src/screen/Favorite";

// export default App = createAppContainer(
//   createSwitchNavigator(
//     {
//       SearchScreen: SearchScreen,
//       FavoriteScreen: FavoriteScreen
//     },
//     {
//       initialRouteName: 'SearchScreen'
//     }
//   )
// );

const MainApp = createBottomTabNavigator(
  {
    Search: SearchScreen,
    Favorite: FavoriteScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Search') {
          return (
            <Image
              source={ require('./src/assets/search.png') }
              style={{ width: 20, height: 20, }} />
          );
        } else {
          return (
            <Image
              source={ require('./src/assets/favorite.png') }
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);

export default App = createAppContainer(MainApp);
