import React, {useState} from 'react';
import { Button, Text, View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { DefaultTheme, DarkTheme, useRoute } from '@react-navigation/native';

import Connexion from "./Component/page_connexion";
import Home from "./Component/page_accueil";
import Inscription from "./Component/page_inscription";
import Profil from "./Component/page_profil";
import Commande from "./Component/page_commande";
import Coiffeur from "./Component/page_coiffeur"

export default function App({route}) 
{
  //Permet de donner les props à tous les components
  //https://fr.reactjs.org/docs/hooks-state.html
  const [IdUser, setIDUser] = useState("");
  const [data, setData] = useState([]);

  //const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const Tab = createBottomTabNavigator();

  function CommandTabs({navigation}, {IdUser}) 
  {
    console.log("TEST: "+ JSON.stringify(navigation)+" "+JSON.stringify(IdUser))
    return (
      <Tab.Navigator>
        <Tab.Screen name="Commande" component={Commande} />
        <Tab.Screen name="Coiffeur" component={Coiffeur} />
      </Tab.Navigator>
    );
  }

  function Deconnexion({navigation})
  {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button onPress={() => navigation.navigate('Accueil', { IdUSer: "", data: [] }) } title="Déconnexion" />
        <Button onPress={() => navigation.goBack()} title="Annuler" />
      </View>
    );  
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={Home} />
        <Drawer.Screen name="Commande" component={CommandTabs} />
        <Drawer.Screen name="Connexion" component={Connexion} />
        <Drawer.Screen name="Inscription" component={Inscription} />
        <Drawer.Screen name="Profil" component={Profil} />
        <Drawer.Screen name="Déconnexion" component={Deconnexion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};