import React, { useState } from 'react'

// Imports utiles de divers librairies
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,} from 'react-native-elements';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Divider, Header } from 'react-native-elements';

// Imports des objets personnalisés
import FooterCustom from './footer';
import SearchBarCustom from './searchbar';

// constantes utiles 
const image = { uri: "https://images.hdqwalls.com/download/apple-pro-display-xdr-5k-jh-1920x1080.jpg" };

// Vue afficher pour la page de connexion
export default class Connexion extends React.Component
{
  
    //Constructeur
    constructor(props)
    {
        super(props)
        this.inputId = ""
        this.inputMdp = ""
        this.state = 
        {
          title:"OFF",
          avatarColor: "red",
          data: [],
          IdUser: ""
        }
    }

    //fonctions du navigator (pour changer de page)
    goToInscription()
    {
      this.props.navigation.navigate("Inscription");
    }

    goToHome()
    {
      this.props.navigation.navigate("Accueil", {
        IdUser: this.state.IdUser,
        data: this.state.data
      });
    }

    goToProfil()
    {
      if(this.state.IdUser!="")
      {
        this.props.navigation.navigate("Profil", {
          test: "test",
          IdUser: this.state.IdUser,
          data: this.state.data
        });
      }
      else
      {
        alert("Vous devez être connecté pour accéder à cette page")
      }
    }

    openNavigator()
    {
        this.props.navigation.openDrawer();
    }

    /**
     * RECUPERATION CHAMPS FORMULAIRE 
     */
    getInputId(text)
    {
        this.inputId = text      
    }
    getInputMdp(text)
    {
        this.inputMdp = text  
    }

    /**
     * FONCTION BDD
     */
    
    fetchConnexion =   async()=>
    {
        //192.169.0.xx => xx correspond au numéro machine de l'IP sur laquelle se lance EXPO
        const response = await fetch('http://192.168.0.32:4545/connexion',
          {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                firstParam: this.inputId,
                secondParam: this.inputMdp,
            }),
          })

        const users = await response.json();

        switch(users.sucess)
        {
            case 1:
              this.setState({IdUser: users.IdUser, data: users.data,title: "ON", avatarColor: "green"});
              this.goToHome();
              break;
            case 2:
              alert("Mauvais identifiant ou mots de passe");
              break;
            case 3:
              alert("Veuillez remplir tous les champs");
              break;
        }
    } 
    
    getConnexion()
    {
        this.fetchConnexion(); 
    }

    render()
    {
        return(
            <ImageBackground source={image} style={styles.image}>
            <Header
              //utilisation du header a la place de headercustom de component/header.js car on ne peut pas ouvrir le menu sinon (a patcher)
              leftComponent={
              <Icon
                  name='bars'
                  type='font-awesome'
                  color='#f50'
                  size= {26}
                  onPress= {() => this.openNavigator()}
              />
              }
              centerComponent={{ text: 'BARBERLIFE', style: { color: '#fff', fontWeight: 'bold' } }}
              //utilisation du avatar a la place de avatarcustom de component/avatar.js car on ne configurer le onpress sinon (a patcher)
              rightComponent={
                  <Avatar
                      rounded
                      title={this.state.title}
                      overlayContainerStyle={{backgroundColor: this.state.avatarColor}}
                      //showAccessory
                      onPress={() => this.goToProfil()}
                  />
              }
              containerStyle={{
              backgroundColor: 'black',
              justifyContent: 'space-around',
              }}
            />
            <Divider style={{ backgroundColor: 'white' }} />
            <SearchBarCustom />

        <View style={styles.container}>
            <Card
            title='CONNEXION'
            image={require('../Images/BarberLife-logo-Orange.png')}
            containerStyle={{ borderRadius: '25px', opacity: 0.98, height: '95%' }}
          >
            <View>
            <Input
              label='Login/ Mail'
              labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
              placeholder='Saisissez votre login/ mail'
              leftIcon=
              {
                <Icon
                  name='user-circle-o'
                  size={24}
                  color='black'
                />
              }
              errorMessage='ENTER A VALID LOGIN'
              errorStyle={{ color: 'red', fontWeight: 'bold' }}
              onChangeText={(text) => this.getInputId(text)}
            />
    
            <Input
              label='Mot de passe'
              labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
              placeholder="Saisissez votre mot de passe"
              secureTextEntry={true}
              leftIcon=
              {
                <Icon
                  name='unlock-alt'
                  size={24}
                  color='black'
                />
              }
              errorMessage='ENTER A VALID PASSWORD'
              errorStyle={{ color: 'red', fontWeight: 'bold' }}
              onChangeText={(text) => this.getInputMdp(text)}
            />
            </View>
    
            <View style={styles.space}>
            <Text
              style={styles.center}
              > Vous ne possédez pas encore de compte ? </Text>
            <Text
              accessibilityRole='link'
              style={[styles.center, styles.link]}
              onPress={() => this.goToInscription()}
              > Inscrivez-vous </Text>
            </View>
    
            <View>
            <Button
              buttonStyle={{bottom: 0}}
              icon=
              {
                <Icon
                  name="beer"
                  size={15}
                  color="white"
                />
              }
              loading={this.state.loading}
              onPress={() => this.getConnexion()}
              title=" Connexion"
              type='solid'
            />
            </View>
    
          </Card>
          </View>
          <FooterCustom/>
      </ImageBackground>
        )
    }
}


const styles = StyleSheet.create(
    {
      center:
      {
        textAlign: 'center'
      },
      link:
      {
        color: 'blue',
        fontWeight: 'bold'
      },
      space:
      {
        marginTop: 10,
        marginBottom: 10
      },
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