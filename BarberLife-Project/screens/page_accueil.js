import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Divider, Header } from 'react-native-elements';

//Imports des classes personnalisées
import FooterCustom from '../Component/footer';

// Vue afficher pour la page de connexion
export default class Home extends React.Component
{

    constructor(props)
    {
        super(props)

        this.inputId = ""
        this.inputMdp = ""

        this.state =
        {
            lieu: "en cours de localisation...",
            title: "OFF",
            avatarColor: "red",
            IdUser: "",
            data: []
        }
    }

    /**
     * FONCTIONS NAVIGATION
     */

    /**
     * Cas particulier de navigations imbriquées
     * source: https://reactnavigation.org/docs/nesting-navigators
     */
    goToCommand()
    {
      if(this.state.IdUser!="")
      {
        this.props.navigation.navigate("Commande", {
          screen: 'Commande',
          params: {
            IdUser: this.state.IdUser,
            data: this.state.data
          }
        });
      }
      else
      {
        alert("Vous devez être connecté pour accéder à cette page")
      }
    }

    goToConnexion()
    {
        this.props.navigation.navigate("Connexion");
    }

    goToProfil()
    {
      if(this.state.IdUser!="")
      {
        this.props.navigation.navigate("Profil",
        {
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

    displayHome()
    {
      if((typeof this.props.route.params === 'undefined' || this.state.IdUser == "" || typeof this.state.IdUser === "undefined"))
      {
        return (
          <View>
            <Text>Bienvenue sur BarberLife !</Text>

            <Button
              onPress={() => this.goToConnexion()}
              title={` Connectez-vous`}
              icon={
                <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                />
              }
            />
          </View>
        )
      }
      else
      {
        return(
          <View>

            <Text>
              Vous êtes maintenant connecté !
              Prenez rendez-vous avec le coiffeur de votre choix en 1 clic!
            </Text>

            <Button
              onPress={() => this.goToCommand()}
              title={` Voir les coiffeurs à proximité`}
              icon=
              {
                <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                />
              }
            />

          </View>
        )
      }
    }

    render()
    {
      if(typeof this.props.route.params !== 'undefined' && this.state.IdUser=="")
        {
          this.setState({
            IdUser: this.props.route.params.IdUser,
            data: this.props.route.params.data,
            title: "ON",
            avatarColor: "green"
          })
        }

      return (
          <View>
          <Header
              leftComponent=
              {
                <Icon
                    name='bars'
                    type='font-awesome'
                    color='#f50'
                    size= {26}
                    onPress= {() => this.openNavigator()}
                />
              }

              centerComponent=
              {
                {
                  text: 'BARBERLIFE',
                  style: { color: '#fff', fontWeight: 'bold' }
                }
              }

              rightComponent=
              {
                  <Avatar
                      rounded
                      title={this.state.title}
                      overlayContainerStyle={{backgroundColor: this.state.avatarColor}}
                      showAccessory
                      onPress={() => this.goToProfil()}
                  />
              }

              containerStyle=
              {
                {
                  backgroundColor: 'black',
                  justifyContent: 'space-around',
                }
              }
          />

          <Divider style={{ backgroundColor: 'white' }} />


          <View style={styles.container}>

            <Card
                title="ACCUEIL"
                image=
                {
                  require('../assets/images/BarberLife-logo-Brown.png')
                }
                containerStyle=
                {
                  {
                    borderRadius: '25px',
                    opacity: 0.98,
                    height: '95%'
                  }
                }
            >

              {this.displayHome()}

            </Card>

          </View>

          <FooterCustom/>
        </View>
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
