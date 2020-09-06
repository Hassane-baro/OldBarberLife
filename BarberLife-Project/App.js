import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {HomeStackNavigation} from "./navigations/stack-navigation";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
            <NavigationContainer>
                <HomeStackNavigation/>
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
