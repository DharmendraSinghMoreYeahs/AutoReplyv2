import React, {useEffect, useRef} from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Home from '../../Screens/Home';
import {Shop, Activity} from '../../index';
const BottomTab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const animatedRef = useRef(null);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: 'black',
        height: 70,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => onPress()}
            onLongPress={() => onLongPress()}
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Animated.View ref={animatedRef} Animated duration={1000}>
              <Icon
                name={options.icon}
                style={{
                  color: isFocused ? '#fe375d' : '#707070',
                  fontWeight: 'bold',
                }}
                size={20}
              />
            </Animated.View>
            <Text
              style={{
                color: isFocused ? 'white' : '#707070',
                fontWeight: '600',
                marginTop: 5,
                fontSize: 12,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => <MyTabBar {...tabsProps} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <BottomTab.Screen
        name="Summery"
        options={{icon: 'md-apps'}}
        component={Home}
      />
      <BottomTab.Screen name="Shop" options={{icon: 'cart'}} component={Shop} />
      <BottomTab.Screen
        name="Activity"
        options={{icon: 'walk'}}
        component={Activity}
      />
      <BottomTab.Screen
        name="Watchfaces"
        options={{icon: 'ios-watch'}}
        component={Home}
      />
      <BottomTab.Screen
        name="Settings"
        options={{icon: 'md-settings-sharp'}}
        component={Home}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
