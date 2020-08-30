import React from 'react'

// Import des librairies utiles
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, Header } from 'react-native-elements';

//Imports des classes personnalisées
import FooterCustom from './footer';
import SearchBarCustom from './searchbar';
import CoiffeurItems from './coiffeurItems'

/**
 * Import pour la localisation 
 * source: https://docs.expo.io/versions/v37.0.0/sdk/location/
 */
import * as Location from 'expo-location';

//costantes utiles
const image = { uri: "https://images.hdqwalls.com/download/apple-pro-display-xdr-5k-jh-1920x1080.jpg" };

// Vue afficher pour la page de commande
export default class Commande extends React.Component
{
  
    //Constructeur
    constructor(props)
    {
        super(props)
        this.inputId = ""
        this.inputMdp = ""
        this.state = 
        {
            coiffeurs: "",
            title:"OFF",
            avatarColor: "red",
            imagePicker: 'https://img.icons8.com/color/1600/avatar.png',
            data:[],
            IdUser: ""
        }
    }

    /**
     * FONCTION LOCALISATION
     * source: https://docs.expo.io/versions/v37.0.0/sdk/location/
     */

    useEffect()
    {
      (async () => 
      {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') 
        {
          setErrorMsg('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setLocation(location);
        this.lieu=location;
        this.setState({lieu: JSON.stringify(this.lieu)})
      })();
    }

    //fonctions du navigator (pour changer de page)
    gotToCoiffeur(id_user)
    {
        this.props.navigation.navigate("Coiffeur", {id_user});
    }

    goToInscription()
    {
      this.props.navigation.navigate("Inscription");
    }

    goToHome()
    {
      this.props.navigation.navigate("Accueil");
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

    //fonctions BDD
    getInputId(text)
    {
        this.inputId = text      
    }
    getInputMdp(text)
    {
        this.inputMdp = text  
    }

    getConnexion()
    {
        this.fetchConnexion(); 
        this.goToHome();
    }

    fetchAllBarber = async()=>
    {
        const response = await fetch('http://192.168.0.32:4545/searchBarber',
        {
            method:'POST',
            headers:
            {
                'Content-Type':'application/json',
            }
        })
        const barbers = await response.json();
        this.setState({coiffeurs: barbers})
    }

    displayCoiffeur()
    {
        if(this.state.coiffeurs != null)
        {
            return(
                <FlatList
                    data={this.state.coiffeurs}
                    keyExtractor= {(item) => item.id_user.toString()}
                    renderItem= {({item}) => (
                    <CoiffeurItems
                        user = {item}
                        navigation = {this.props.navigation}
                    />
                    )}
                />
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
        if(this.state.IdUser=="" && typeof this.props.route.params === 'undefined')
        {
            alert("Vous devez être connecté(e) pour accéder à cette page!")
            this.goToHome();
        }
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
                        title="ON"
                        overlayContainerStyle={{backgroundColor: "green"}}
                        showAccessory
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
                    title='COMMANDE'
                    image={require('../Images/BarberLife-logo-Orange.png')}
                    containerStyle={{ borderRadius: '25px', opacity: 0.98, height: '95%' }}
                >

                <View>
                {
                    //probleme: doit afficher la liste après clic sur le bouton mais bug si on utilise le state 
                   /* list.map((l, i) => (
                    <ListItem
                        key={l.id_user}
                        leftAvatar={{ source: { uri: this.state.imagePicker } }}
                        title={l.nom_user + l.prenom_user}
                        //subtitle={l.subtitle}
                        bottomDivider
                        onPress={() => this.gotToCoiffeur(l.id_user)}
                    />
                    ))*/

                }
                {this.displayCoiffeur()}
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
                        onPress={() => this.fetchAllBarber()}
                        title=" Actualiser la liste des coiffeurs à proximité"
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
        
    },
    horizontalCenter:
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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