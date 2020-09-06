import React from 'react';
// Sert pour mettre la ligne de délimitation
import Icon from 'react-native-vector-icons/FontAwesome';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Divider, Header, Rating, Text} from 'react-native-elements';

//Import classes personnalisées
import FooterCustom from '../Component/footer';

//constantes utiles
const WATER_IMAGE = require('../assets/images/star.png');

// Vue afficher pour la page de connexion
export default class Boutique extends React.Component {
    constructor(props) {
        super(props)
        this.state =
            {
                data: [],
                IdUser: ""
            }
    }

    render() {
        return (
            < View >
                <Text> La boutique arrive bientot !</Text>
            < /View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container:
            {
                flex: 1,
                height: '100%',
                //backgroundColor: 'gray'
            },
        text:
            {
                //backgroundColor: 'black',
                opacity: 1,
                color: "white",
                fontWeight: 'bold'
            },
        image:
            {
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center"
            }
    });
