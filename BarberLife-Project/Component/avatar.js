//Components/cAvatar.js
import React from 'react';
/*
  react-native-elements:
  https://react-native-elements.github.io/react-native-elements/docs/getting_started.html
*/
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

/*
  AVATAR:
  https://react-native-elements.github.io/react-native-elements/docs/avatar.html
*/
class cHeader extends React.Component
{

  constructor(props)
  {
      super(props)
      this.navigation = useNavigation();
  }

  goToBack()
  {
      this.navigation.goBack();
      
  }

  render()
  {
    // Standard Avatar with accessory
    return(
      <Avatar
        rounded
        title="MM"
        overlayContainerStyle={{backgroundColor: 'brown'}}
        showAccessory
        onPress={() => this.goBack()}
      />
    )
  }
}

export default cHeader