//Components/cHeader.js
import React from 'react';
/*
  react-native-elements:
  https://react-native-elements.github.io/react-native-elements/docs/getting_started.html
*/
import { Header, Icon } from 'react-native-elements';
import AvatarCustom from './avatar';

/*
  HEADER:
  https://react-native-elements.github.io/react-native-elements/docs/header.html#backgroundcolor
*/
class HeaderCustom extends React.Component
{

  constructor(props)
  {
    super(props)
  }

  openNavigator()
  {
    this.props.navigation.openDrawer();
  }

  render()
  {
    return(
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'BARBERLIFE', style: { color: '#fff', fontWeight: 'bold' } }}
        rightComponent={<AvatarCustom props={this.props}/>}//{{icon: 'home', color: '#fff' }}
        containerStyle={{
          backgroundColor: 'black',
          justifyContent: 'space-around',
        }}
      />
    )
  }
}

export default HeaderCustom
