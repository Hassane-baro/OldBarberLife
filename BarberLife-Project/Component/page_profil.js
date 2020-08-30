import React from 'react'
// Sert pour mettre la ligne de délimitation
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card, Divider, Header, Input } from 'react-native-elements';

import FooterCustom from './footer';
import SearchBarCustom from './searchbar';

//https://docs.expo.io/versions/v37.0.0/sdk/imagepicker/
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const image = { uri: "https://images.hdqwalls.com/download/apple-pro-display-xdr-5k-jh-1920x1080.jpg" };


// Vue afficher pour la page de connexion
export default class Profil extends React.Component
{
  
    //Constructeur
    constructor(props)
    {
        super(props)
        this.inputUsername = ""
        this.inputNom = ""
        this.inputPrenom = ""
        this.inputDateNaiss = ""
        this.inputNumRue = ""
        this.inputNomRue = ""
        this.inputCP = ""
        this.inputVille = ""
        this.inputTel = ""
        this.inputMdp = ""
        this.inputVerifMdp = ""
        this.state = 
        {
            //OFF et red si pas connecté, ON et green sinon
            title:"OFF",
            avatarColor: "red",
            imagePicker: 'https://img.icons8.com/color/1600/avatar.png',
            data:[],
            IdUser: "",
            count: 0
        }
    }

    useEffect()
    {
        (async () => 
        {
            if (Constants.platform.ios) 
            {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') 
                {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    };

    pickImage = async () => 
    {
        let result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }
        );

        if (!result.cancelled) 
        {
            this.setState({imagePicker: result.uri});
        }
    };

    //fonctions du navigator (pour changer de page)
    goToInscription()
    {
      this.props.navigation.navigate("Inscription");
    }

    goToHome()
    {
      this.props.navigation.navigate("Accueil");
    }

    openNavigator()
    {
        this.props.navigation.openDrawer();
    }

    /**
     * RECUPERATION CHAMPS FORMULAIRE 
     */

    getInputUsername(text)
    {
        this.inputUsername = text      
    }
    getInputNom(text)
    {
        this.inputNom = text  
    }
    getInputPrenom(text)
    {
        this.inputPrenom = text  
    }
    getInputDateNaiss(text)
    {
        this.inputDateNaiss = text  
    }
    getInputNumRue(text)
    {
        this.inputNumRue = text  
    }
    getInputNomRue(text)
    {
        this.inputNomRue = text  
    }
    getInputCP(text)
    {
        this.inputCP = text  
    }
    getInputVille(text)
    {
        this.inputVille = text  
    }
    getInputTel (text)
    {
        this.inputTel = text
    }    
    getInputMdp(text)
    {
        this.inputMdp = text  
    }
    getInputVerifMdp(text){
        this.inputVerifMdp = text  
    }

    /**
     * FONCTION BDD
     */

    fetProfil = async() =>
    {
        const response = await fetch('http://192.168.0.32:4545/profil',{
            method:'POST',
            headers:
            {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                id: this.props.route.params.IdUser,
                mail: this.inputUsername,
                nom: this.inputNom,
                prenom: this.inputPrenom,
                dateNaiss: this.inputDateNaiss,
                numRue : this.inputNumRue,
                nomRue : this.inputNomRue,
                cp : this.inputCP,
                ville : this.inputVille,
                tel : this.inputTel,
                mdp : this.inputMdp,
                verifMdp : this.inputVerifMdp,
                typeProfil : this.state.typeUser,

            }),
        })
        const update = await response.json();
        switch(update.sucess)
        {
            case 1:
                alert("Votre compte viens d'être actualisé.")
                this.goToConnexion();
            break;
            case 2:
                alert("Aucun champ complété!");
            break;
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
                            overlayContainerStyle={{backgroundColor: 'blue'}}
                            source={{uri: this.state.imagePicker}}
                            showAccessory
                            //onPress={() => this.goToConnexion()}
                        />
                    }
                    containerStyle={{
                    backgroundColor: 'black',
                    justifyContent: 'space-around',
                    }}
            />
            <Divider style={{ backgroundColor: 'white' }} />
            <SearchBarCustom />

            <SafeAreaView style={styles.container}>
                
                <ScrollView >
            <Card
                title='PROFIL'
                image={require('../Images/BarberLife-logo-Orange.png')}
                containerStyle={{ borderRadius: '25px', opacity: 0.98, height: '95%' }}
            >

                <View style={styles.space, styles.horizontalCenter}>

                    <Avatar 
                        onPress={() => this.pickImage()}
                        overlayContainerStyle={{backgroundColor: 'blue'}}
                        rounded
                        source={{uri: this.state.imagePicker}}
                        size="xlarge"
                        showAccessory
                    />

                </View>

            <View>

            <Input
                label={"Mail (" + this.props.route.params.data.mail_user+")"}
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez votre adresse e-mail"
                leftIcon=
                {
                    <Icon
                        name='at'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID MAIL ADDRESS'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputUsername(text)}
            />

            <Input
                label={"Nom (" + this.props.route.params.data.nom_user +")"}
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez votre nom"
                leftIcon=
                {
                    <Icon
                        name='address-card'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID MAIL ADDRESS'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputNom(text)}
            />

            <Input
                label={"Prénom (" + this.props.route.params.data.prenom_user+")"}
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez votre prénom"
                leftIcon=
                {
                    <Icon
                        name='address-card'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID MAIL ADDRESS'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputPrenom(text)}
            />

            <Input
                label={"Date de naissance (" + this.state.mail_user +")"}
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez votre date de naissance"
                leftIcon=
                {
                    <Icon
                        name='birthday-cake'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID DATE OF BIRTH'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputDateNaiss(text)}
            />

            <Divider/>

            <Input
                label="Numéro de rue"
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez votre numéro de rue"
                leftIcon=
                {
                    <Icon
                        name='road'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID STREET NUMBER'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputNumRue(text)}
            />

            <Input
                label="Nom de la rue"
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez le nom de la rue"
                leftIcon=
                {
                    <Icon
                        name='road'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID STREET NAME'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputNomRue(text)}
            />

            <Input
                label="Code postal"
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez le code postal de la vile"
                leftIcon=
                {
                    <Icon
                        name='building'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID ZIPCODE'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputCP(text)}
            />

            <Input
                label="Ville"
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Saisissez le nom de la vile"
                leftIcon=
                {
                    <Icon
                        name='building'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER A VALID CITY'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputVille(text)}
            />

            <Divider/>

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

            <Input
                label='Répéter le mot de passe'
                labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                placeholder="Confirmez votre mot de passe"
                secureTextEntry={true}
                leftIcon=
                {
                    <Icon
                        name='unlock-alt'
                        size={24}
                        color='black'
                    />
                }
                errorMessage='ENTER THE SAME PASSWORD'
                errorStyle={{ color: 'red', fontWeight: 'bold' }}
                onChangeText={(text) => this.getInputVerifMdp(text)}
            />

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
                //onPress doit lancer une fonction pour modifier les champs qui ont été remplis
                onPress={() => this.goToHome()}
                title=" Modifier"
                type='solid'
            />
            </View>
    
          </Card>
          </ScrollView>

          </SafeAreaView>
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