import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BarberHome from "../screens/page_accueil";
import BarberProfile from "../screens/page_profil";
import Login from "../screens/page_connexion";
import Signup from "../screens/page_inscription";

import {BarberTabNavigator, ClientTabNavigator} from "./tab-navigation";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#043925",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const HomeStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={LoginStackNavigation} />
            <Stack.Screen name="BarberTabNavigator" component={BarberTabNavigator} />
            <Stack.Screen name="ClientTabNavigator" component={ClientTabNavigator} />
        </Stack.Navigator>
    )
}

const LoginStackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Singup" component={Signup} />
        </Stack.Navigator>
    )
}

const BarbersStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home" component={BarberHome} />
            <Stack.Screen name="Profile" component={BarberProfile} />
        </Stack.Navigator>
    );
};

const ClientStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home" component={BarberHome} />
            <Stack.Screen name="Profile" component={BarberProfile} />
        </Stack.Navigator>
    );
};


export { HomeStackNavigation, BarbersStackNavigator, ClientStackNavigator };
