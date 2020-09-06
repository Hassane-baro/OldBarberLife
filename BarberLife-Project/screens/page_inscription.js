import React from 'react'

//Imports librairies
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, ButtonGroup, Card, CheckBox, Divider, Header, Input } from 'react-native-elements';

// Imports classes personnalisées
import FooterCustom from '../Component/footer';


// Vue afficher pour la page d'inscription
class Inscription extends React.Component
{

    //Constructeur
    constructor(props){
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
            title: "OFF",
            avatarColor: "red",
            client: false,
            coiffeur: false,
            //typeUser vaut -1 par défaut, 0 si coiffeur, 1 si client
            typeUser: -1,
            data:[],
            IdUser:""
        }
    }

    //foncitons Navigator
    goToConnexion()
    {
        this.props.navigation.navigate("Connexion");
    }

    goToHome()
    {
        this.props.navigation.navigate("Home");
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

    fetchInscription =  async() =>
    {
        const response = await fetch('http://192.168.1.32:4646/inscription',{
            method:'POST',
            headers:
            {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
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
        const inscrip = await response.json();
        switch(inscrip.sucess)
        {
            case 1:
                alert("Votre compte viens d'être créé, veuillez vous connecter pour continuer.")
                this.goToConnexion();
            break;
            case 2:
                alert("Les mots de passe entrés sont différent!");
            break;
            case 3:
                alert("Veuillez remplir tous les champs!");
            break;


        }
    }

    getInscription()
    {
        this.fetchInscription();
    }

    /**
     * RECUPERATION CHECBOX
     */

    setClient()
    {
        //si l'autre checkbox n'est pas coché
        if(this.state.coiffeur == false)
        {
            //si le checbox client est activé, on le met à false pour le décoché puis on met -1 à typeUser
            if(this.state.client == true)
            {
                this.setState({client: false});
                this.setState({typeUser: -1});
            }
            //sinon on le coche et on met typeUser à 1
            else
            {
                this.setState({client: true});
                this.setState({typeUser: 1});
            }
        }
        //sinon on décoche l'autre checkbox et on met la valeur typeUSer à 1 pour le client
        else
        {
            this.setState({coiffeur: false});
            this.setState({client: true});
            this.setState({typeUser: 1});
        }
    }

    setCoiffeur()
    {
        //si l'autre checkbox n'est pas coché
        if(this.state.client == false)
        {
            //si le checbox coiffeur est activé, on le met à false pour le décoché puis on met -1 à typeUser
            if(this.state.coiffeur == true)
            {
                this.setState({coiffeur: false});
                this.setState({typeUser: -1});
            }
            //sinon on le coche et on met typeUser à 0
            else
            {
                this.setState({coiffeur: true});
                this.setState({typeUser: 0});
            }
        }
        //sinon on décoche l'autre checkbox et on met la valeur typeUSer à 0 pour le coiffeur
        else
        {
            this.setState({client: false});
            this.setState({coiffeur: true});
            this.setState({typeUser: 0});
        }
    }

    /*
        ButtonGroup:
        https://react-native-elements.github.io/react-native-elements/docs/button_group.html
    */
    component1 = () =>
    <CheckBox
        center
        title='Client'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={this.state.client}
        onPress={() => this.setClient()}
    />
    component2 = () =>
    <CheckBox
        center
        title='Coiffeur'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={this.state.coiffeur}
        onPress={() => this.setCoiffeur()}
    />

    checkbox = [{ element: this.component1 }, { element: this.component2 }]

    render() {
        return (
            <View>
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
                            onPress={() => this.goToProfil()}
                        />
                    }
                    containerStyle={{
                    backgroundColor: 'black',
                    justifyContent: 'space-around',
                    }}
            />
            <Divider style={{ backgroundColor: 'white' }} ></Divider>

            <SafeAreaView style={styles.container}>

                <ScrollView >

                    <Card
                        title='INSCRIPTION'
                        image={require('../assets/images/BarberLife-logo-Grey.png')}
                        containerStyle={{ borderRadius: '25px', opacity: 0.98, height: '95%' }}
                    >
                        <View style={styles.space}>

                            <Text
                            style={styles.center}
                            >
                                Vous possédez déjà un compte ?
                            </Text>
                            <Text
                                accessibilityRole='link'
                                style={[styles.center, styles.link]}
                                onPress={() => this.goToConnexion()}
                            >
                                Connectez-vous
                            </Text>

                        </View>

                        <View>

                        <ButtonGroup
                            //onPress={this.updateIndex}
                            //selectedIndex={selectedIndex}
                            buttons={this.checkbox}
                            containerStyle={{height: 100}}
                        />

                        <Input
                            label='Mail'
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
                            label='Nom'
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
                            label='Prénom'
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
                            label='Date de naissance'
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
                         <Input
                            label='Tel'
                            labelStyle={{ fontWeight: 'bold', fontStyle: 'italic' }}
                            placeholder="Saisissez votre numéro de téléphone"
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
                            onChangeText={(text) => this.getInputTel(text)}
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
                            //loading={this.state.loading}
                            onPress={() => this.getInscription()}
                            title=" Inscription"
                            type='solid'
                        />
                        </View>

                    </Card>

                </ScrollView>

            </SafeAreaView>

            <FooterCustom/>
                                </View>
        );
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

export default Inscription
