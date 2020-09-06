import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Boutique from "../screens/page_boutique";
import {BarbersStackNavigator} from "./stack-navigation";
import Home from "../screens/page_accueil";

const Tab = createBottomTabNavigator();

const BarberTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Barbers" component={BarbersStackNavigator} />
            <Tab.Screen name="Boutique" component={Boutique} />
        </Tab.Navigator>
    )
};

const ClientTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Barbers" component={BarbersStackNavigator} />
            <Tab.Screen name="Boutique" component={Boutique} />
        </Tab.Navigator>
    )
};

export { BarberTabNavigator, ClientTabNavigator } ;

